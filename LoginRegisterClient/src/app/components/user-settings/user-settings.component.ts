import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { ChangePasswordModel } from '../../models/change-password.model';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef;

  userModel: UserModel = new UserModel();
  changePasswordModel: ChangePasswordModel = new ChangePasswordModel();

  isShowPassword: boolean = false;
  isPasswordFocus :boolean = false;

  currentDate: string = "";

  userId: string = "";
  userName: string = "";

  constructor(
    private http: HttpService,
    public auth: AuthService,
    private swal: SwalService,
    private router: Router
  ){
    
  }

  ngOnInit(){
    this.getDate();
    this.getUser();
  }

  // setImage(event: any){
  //   console.log(event);
  //   this.userModel.profilePicture = event.target.files[0];
  // }

  setImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.userModel.profilePicture = file.name;
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  getUser(){
    this.userId = this.auth.user.id;
    this.http.getById("Users/GetUserById", {id: this.userId},  (res) => {
      this.userModel = res.data;
      console.log(this.userModel);
      // this.swal.callToast(res.data);
      this.userName = this.userModel.userName;
    })
  }

  updateUserInfo(form: NgForm){
    const formData = new FormData();
    if (form.valid) {
      formData.append("id", this.auth.user.id);
      formData.append("firstName", this.userModel.firstName);
      formData.append("lastName", this.userModel.lastName);
      formData.append("userName", this.userName);
      formData.append("dateOfBirth", this.userModel.dateOfBirth);
      formData.append("phoneNumber", this.userModel.phoneNumber);
      formData.append("profilePicture", this.fileInput.nativeElement.files[0]);
      console.log(formData);
      this.http.post("Users/UpdateUser", formData, (res:any) => {
        console.log(res);
        this.swal.callToast(res.data, "success");
        
        const delay = interval(3000);
        delay.subscribe(() => {
          location.reload();
        });
      });
    }
  }

  updateUserName(form:NgForm){
    this.userName = this.auth.user.userName;
    if (form.valid) {
      this.http.post("Users/UpdateUser", {userName: this.userName}, (res) => {
        console.log(res);
      });
    }
  }

  changePassword(form:NgForm){
    this.changePasswordModel.id = this.auth.user.id;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};:'\\|,.<>\/?~-])(?=.*[0-9])/;
    const str = form.controls["password"].value;
    const isValid = regex.test(str);
    if (form.valid && isValid) {
      this.http.post("Auth/ChangePassword", this.changePasswordModel, (res) => {
        console.log(res);
        this.getUser();
        this.changePasswordModel.currentPassword = "";
        this.changePasswordModel.newPassword = "";
        localStorage.clear();
        const delay = interval(3000);
        delay.subscribe(() => {
          location.reload();
        })
      });
    }
  }

  getDate(){
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero based
    const dd = String(today.getDate()).padStart(2, '0');
    
    this.currentDate = `${yyyy}-${mm}-${dd}`;
  }

  showOrHidePassword(password: HTMLInputElement){
    if(this.isShowPassword){
      this.isShowPassword = false;
      password.type = "password";
    }
    else{
      this.isShowPassword = true;
      password.type = "text";
    }
  }
  
  checkRegexPatternForPassword(el: HTMLInputElement){
    const text = el.value;

    const upperCaseRegex = /[A-Z]/;
    const upperCaseResult = upperCaseRegex.test(text);
    const upperLetterEl = document.getElementById("upperLetter");
    upperLetterEl?.classList.add(upperCaseResult ? 'pw-succes' : 'pw-error');
    upperLetterEl?.classList.remove(!upperCaseResult ? 'pw-succes' : 'pw-error');

    const lowerCaseRegex = /[a-z]/;
    const lowerCaseResult = lowerCaseRegex.test(text);
    const lowerLetterEl = document.getElementById("lowerLetter");
    lowerLetterEl?.classList.add(lowerCaseResult ? 'pw-succes' : 'pw-error');
    lowerLetterEl?.classList.remove(!lowerCaseResult ? 'pw-succes' : 'pw-error');

    const specialCaseRegex = /[!@#$%^&*()_+\[\]{};:'\\|,.<>\/?]/;
    const specialCaseResult = specialCaseRegex.test(text);
    const specialLetterEl = document.getElementById("specialLetter");
    specialLetterEl?.classList.add(specialCaseResult ? 'pw-succes' : 'pw-error');
    specialLetterEl?.classList.remove(!specialCaseResult ? 'pw-succes' : 'pw-error');

    const numCaseRegex = /[0-9]/;
    const numCaseResult = numCaseRegex.test(text);
    const numLetterEl = document.getElementById("numLetter");
    numLetterEl?.classList.add(numCaseResult ? 'pw-succes' : 'pw-error');
    numLetterEl?.classList.remove(!numCaseResult ? 'pw-succes' : 'pw-error');

    const minCharacterEl = document.getElementById("minCharacter");
    if(text.length < 8){
      minCharacterEl?.classList.add("pw-error");
      minCharacterEl?.classList.remove("pw-succes");
    }
    else{
      minCharacterEl?.classList.add("pw-succes");
      minCharacterEl?.classList.remove("pw-error");
    }
  }
}
