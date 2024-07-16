import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

import { SwalService } from '../../services/swal.service';
import { FormsModule, NgForm } from '@angular/forms';
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
  forgotPasswordEmail: string = "";

  // @ViewChild("sendConfirmEmailModalCloseBtn") sendConfirmEmailModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private swal: SwalService
  ) {}

  // login(form:NgForm){
  //   if (form.valid) {
  //     this.http.post("Auth/Login", this.loginModel, (res) => {
  //       console.log(res);
  //       localStorage.setItem("token", res.data.token);
  //       // this.swal.callToast(res.message);
  //       this.router.navigateByUrl("/");
  //       console.log(res.data);
  //     });
  //   }
  // }

  login(form:NgForm){
    if (form.valid) {
      this.http.post("https://localhost:7177/api/Auth/Login", this.loginModel)
        .subscribe({
          next: (res:any) => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            this.swal.callToast(res.message)
            this.router.navigateByUrl("/");
          },
          error:(err: HttpErrorResponse) => {
            console.log(err)
            this.swal.callToast(err.error.errorMessages[0], 'warning');
            if (!err.error.isSuccess) {
              if (err.error.errorMessages[0] === "E-mail address is not confirmed") {
                this.swal.callToastWithButton(
                  "Your email address is not confirmed. Send email confirmation link?",
                  "Send",
                  () => this.sendConfirmEmail()
                );
                this.email = this.loginModel.EmailOrUserName;
              }
            }
            else{
              this.swal.callToast(err.error, 'error');
              console.log(err);
            }
          }
      })
    }
  }
  
  sendConfirmEmail(){
    this.http.post('https://localhost:7177/api/Auth/SendConfirmEmail', {email: this.email})
    .subscribe({
      next: (res:any) => {
        this.swal.callToast(res.data);
      // this.sendConfirmEmailModalCloseBtn?.nativeElement.click();
      this.email = "";
      console.log(res);
      }
    });
  }

  openSendforgotPasswordEmailModal(){
    const modalDiv = document.getElementById("sendForgotPasswordEmailModal");
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  closeSendforgotPasswordEmailModal(){
    const modalDiv = document.getElementById("sendForgotPasswordEmailModal");
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }

  sendForgotPasswordEmail(form: NgForm) {
    if (form.valid) {
      this.http.post('https://localhost:7177/api/Auth/SendForgotPasswordEmail', { email: this.forgotPasswordEmail })
        .subscribe({
          next: (res: any) => {
            this.swal.callToast(res.data);
            this.forgotPasswordEmail = "";
            console.log(res);
            this.closeSendforgotPasswordEmailModal();
          }
        });
    }
  }
}
