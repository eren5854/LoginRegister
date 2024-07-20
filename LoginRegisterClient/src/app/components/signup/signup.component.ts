import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RegisterModel } from '../../models/register.model';
import { SwalService } from '../../services/swal.service';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SigninComponent {
  isShowPassword: boolean = false;
  isPasswordFocus :boolean = false;

  registerModel: RegisterModel = new RegisterModel();
  constructor(
    private http: HttpClient,
    private swal: SwalService,
    private router: Router
  ) {}

  setImage(event: any){
    console.log(event);
    this.registerModel.profilePicture = event.target.files[0];
  }

  signIn(form: NgForm){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};:'\\|,.<>\/?~-])(?=.*[0-9])/;
    const str = form.controls["password"].value;
    const isValid = regex.test(str);
    const formData = new FormData();
    if (form.valid && isValid) {
      formData.append("firstName", this.registerModel.firstName);
      formData.append("lastName", this.registerModel.lastName);
      formData.append("userName", this.registerModel.userName);
      formData.append("dateOfBirth", this.registerModel.dateOfBirth);
      formData.append("profilePicture", this.registerModel.profilePicture);
      formData.append("phoneNumber", this.registerModel.phoneNumber);
      formData.append("email", this.registerModel.email);
      formData.append("password", this.registerModel.password);
      console.log(formData)
      this.http.post("https://localhost:7177/api/Auth/Register", formData)
      .subscribe({
        next: (res:any) => {
          console.log(res);
          this.swal.callToast(res.data, "success");
          this.router.navigateByUrl("/login");
        },
        error: (err: HttpErrorResponse) => {
          if (!err.error.isSuccess) {
            this.swal.callToast2(err.error.errorMessages);
          }
          else{
            this.swal.callToast2(err.error.errorMessages);
            console.log(err);
          }
        }
      });
    }
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
