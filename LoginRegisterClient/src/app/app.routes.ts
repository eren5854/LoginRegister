import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';

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
      }
    ]
  },
  {
    path: "signin",
    component: SigninComponent
  }
];
