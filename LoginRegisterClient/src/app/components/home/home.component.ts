import { Component, OnInit, ViewChild, ElementRef, Renderer2, signal } from '@angular/core';
import { FlexiGridModule } from 'flexi-grid';
import { ProductModel } from '../../models/product.model';
import { ProductData } from '../../data/product-data';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[FlexiGridModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('sideMenu') sideMenu: ElementRef| undefined;

  product = signal<ProductModel[]>(ProductData);
  // indexWidth = signal<string>("70px");
  isDarkTheme = false;
  isSideBarOpen = false;
  token: string = "";

  currentDate: string = "";

  constructor(
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDate();
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

  getDate(){
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero based
    const dd = String(today.getDate()).padStart(2, '0');
    
    this.currentDate = `${yyyy}-${mm}-${dd}`;
  }
}
