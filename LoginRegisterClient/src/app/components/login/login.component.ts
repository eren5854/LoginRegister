import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { SwalService } from '../../services/swal.service';
import { HttpService } from '../../services/http.service';
// import { FormValidateDirective } from 'form-validate-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginModel: LoginModel = new LoginModel();
  email: string = "";

  @ViewChild("sendConfirmEmailModalCloseBtn") sendConfirmEmailModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private http: HttpService,
    private router: Router,
    private swal: SwalService
  ) {}

  login(form:NgForm){
    if (form.valid) {
      this.http.post("Auth/Login", this.loginModel, (res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
          this.swal.callToast(res.message);
          this.router.navigateByUrl("/");
          console.log(res.data);
      });
    }
  }
  sendConfirmEmail(){
    this.http.post("Auth/SendConfirmEmail", {email: this.email}, (res) => {
      this.swal.callToast(res.message);
      this.sendConfirmEmailModalCloseBtn?.nativeElement.click();
      this.email = "";
      console.log(res);
    })
  }
}
