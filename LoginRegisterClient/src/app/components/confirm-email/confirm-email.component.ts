import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { HttpClient } from '@angular/common/http';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [],
  template: `<div style="height: 90vh; display:flex; align-items:center; justify-content:center; flex-direction:column">
  <h1>{{response}}</h1>      
  <a href="/login">Giriş sayfasına dönmek için tıklayın</a>
</div>`
})
export class ConfirmEmailComponent {
  email: string = "";
  response: string = "Mail adresi onaylanıyor...";

  constructor(
    private activated: ActivatedRoute,
    private http: HttpClient,
    private swal: SwalService
  ){
    this.activated.params.subscribe(res => {
      this.email = res["email"];
      this.confirm();
    })
  }

  confirm(){
    this.http.post("https://localhost:7177/api/Auth/ConfirmEmail", {
      email: this.email}).subscribe({
        next: (res:any) => {
          console.log(res);
          this.response = res;
          this.swal.callToast(res.data);
          location.reload();
        }
    });
  }
}
