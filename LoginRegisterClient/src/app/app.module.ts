import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { RouterModule } from '@angular/router';
import { routes } from './router';
import { ValidateDirective } from './directives/validate.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    ValidateDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
