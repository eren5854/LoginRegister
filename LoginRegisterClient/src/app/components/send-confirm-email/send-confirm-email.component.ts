import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-send-confirm-email',
  standalone: true,
  imports: [],
  templateUrl: './send-confirm-email.component.html',
  styleUrl: './send-confirm-email.component.css'
})
export class SendConfirmEmailComponent {

  constructor(
    private http: HttpService,
    private swal: SwalService
  ){}
  
  sendConfirmEmail(){
    this.http.post("Auth/SendConfirmEmail", {email: this.email}, (res) => {
      this.swal.callToast(res.message);
      this.sendConfirmEmailModalCloseBtn?.nativeElement.click();
      this.email = "";
      console.log(res);
    })
  }
}
