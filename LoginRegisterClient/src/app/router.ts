import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SigninComponent } from "./signin/signin.component";

export const routes: Routes = 
[
    {
      path: "",
      component: LoginComponent
    },
    {
      path: "login",
      component: LoginComponent
    },
    {
      path: "signin",
      component: SigninComponent
    }
  ]