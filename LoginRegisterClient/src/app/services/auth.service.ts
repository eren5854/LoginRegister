import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: UserModel = new UserModel();
  token: string = "";

  constructor(private router: Router) { }

  isAuthenticated(){
    const responseString: string | null = localStorage.getItem("token");
    if (responseString != null) {
      try{
        this.token = responseString;
        // const decode = jwtDecode(responseString);
        const decode: JwtPayload | any = jwtDecode(this.token);

        const now: number = new Date().getTime()/1000;
        const exp: number | undefined = decode.exp;

        if (exp == undefined) {
          this.router.navigateByUrl("/login");
          return false;
        }

        if (exp < now) {
          this.router.navigateByUrl("/login");
          return false;
        }

        this.user.id = decode["Id"];
        // this.user.firstName = decode["FirstName"];
        // this.user.lastName = decode["LastName"];
        this.user.userName = decode["UserName"];
        this.user.email = decode["Email"];
        this.user.userRole = decode["UserRole"];
        // this.user.phoneNumber = decode["PhoneNumber"];
        // this.user.profilePicture = decode["ProfilePicture"];

        return true;
      }catch(error){
        console.warn(error);
        this.router.navigateByUrl("/login");
        return false;
      }
      
    }
    else{
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
