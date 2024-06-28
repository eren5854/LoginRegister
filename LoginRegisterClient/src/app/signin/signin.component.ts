import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  isShowPassword: boolean = false;
  isPasswordFocus :boolean = false;

  signIn(form: NgForm){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};:'\\|,.<>\/?])(?=.*[0-9])/;
    const str = form.controls["password"].value;
    const isValid = regex.test(str);

    if(form.valid && isValid){
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
