import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  storeEmail: string = "eren@gmail.com";
  isShowPassword: boolean = false;


  signIn(form: NgForm){
  //   if(this.email === "" ){
  //     alert("Email must be valid");
  //     return;
  //   }
  //   if(this.password === "" ){
  //     alert("Password must be valid");
  //     return;
  //   }
  //   console.log(this.email);
  //   console.log(this.password);
  
    if(form.valid){
      if(form.value[0] === 'eren@gmail.com' && form.value[1] === '12345678'){
        alert("Giriş Yapıldı");
      }
      else{
        alert("Email yada şifre hatalı!!")
      }
      console.log(form);
      console.log(form.value);
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

  // checkValidation(el:HTMLInputElement){
  //   if(!el.validity.valid){
  //     el.classList.add("is-invalid");
  //     el.classList.remove("is-valid");
  //   }
  //   else{
  //     el.classList.remove("is-invalid");
  //     el.classList.add("is-valid");
  //   }
  // }
}
