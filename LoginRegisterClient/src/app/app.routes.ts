import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signup/signup.component';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "confirm-email/:email",
    component: ConfirmEmailComponent
  },
  {
    path: "",
    component: LayoutComponent,
    canActivateChild: [() => inject(AuthService).isAuthenticated()],
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "user-settings",
        component: UserSettingsComponent
      }
    ]
  },
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "forgot-password/:email",
    component: ForgotPasswordComponent
  }
];
