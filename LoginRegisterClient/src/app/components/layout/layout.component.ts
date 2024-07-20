import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,FormsModule, CommonModule, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
  @ViewChild('sideMenu') sideMenu: ElementRef| undefined;
  userModel: UserModel = new UserModel();

  userId: string = "";
  isDarkTheme = true;
  isSideBarOpen = false;


  constructor(
    private renderer: Renderer2,
    private http: HttpService,
    public auth: AuthService
  ) {
    this.getCurrentUser();

  }

  ngOnInit(){
    this.renderer.addClass(document.body, 'dark-theme-variables');
  }
  
  getCurrentUser(){
    this.userId = this.auth.user.id;
    this.http.getById("Users/GetUserById", {id: this.userId},  (res) => {
      this.userModel = res.data;
      // console.log(this.userModel);
    })
  }


  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      this.renderer.addClass(document.body, 'dark-theme-variables');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme-variables');
    }
  }

  toggleSideBar(): void {
    this.isSideBarOpen = !this.isSideBarOpen;
    const sideMenuElement = this.sideMenu?.nativeElement as HTMLElement;

    if (this.isSideBarOpen) {
      sideMenuElement.style.display = 'block';
    } else {
      sideMenuElement.style.display = 'none';
    }
  }

  logout(){
    // localStorage.setItem("token", this.token);
    localStorage.clear();
    // this.router.navigateByUrl("/");
  }
}
