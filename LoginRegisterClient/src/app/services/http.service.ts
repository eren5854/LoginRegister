import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private swal: SwalService
    ){}

get(api: string, callBack: (res:any)=> void) {
    this.http.get(`https://localhost:7177/api/${api}`, {
      headers: {
        "Authorization": "Bearer " + this.auth.token
      }
    }).subscribe({
      next: (res: any) => {
        callBack(res);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  getById(api: string, body:any,callBack: (res:any)=> void) {
    this.http.post(`https://localhost:7177/api/${api}`,body, {
      headers: {
        "Authorization": "Bearer " + this.auth.token
      }
    }).subscribe({
      next: (res: any) => {
        callBack(res);
      },
      error: (err: HttpErrorResponse) => {
        if (!err.error.isSuccess) {
          console.log(err.error.errorMessages)
        }
        else{
          // this.swal.callToast(err.error, 'error');
          console.log(err.error.errorMessages);
        }
      }
    });
  }

  post(api: string, body:any,callBack: (res:any)=> void) {
    this.http.post(`https://localhost:7177/api/${api}`,body, {
      headers: {
        "Authorization": "Bearer " + this.auth.token
      }
    }).subscribe({
      next: (res: any) => {
        callBack(res);
        this.swal.callToast(res.data, 'success');
      },
      error: (err: HttpErrorResponse) => {
        if (!err.error.isSuccess) {
          this.swal.callToast2(err.error.errorMessages);
        }
        else{
          this.swal.callToast2(err.error.errorMessages);
          console.log(err);
        }
      }
    });
  }

  delete(api: string, callBack: (res:any)=> void) {
    this.http.get(`https://localhost:7231/api/${api}`, {
      headers: {
        "Authorization": "Bearer " + this.auth.token
      }
    }).subscribe({
      next: (res: any) => {
        callBack(res);
      },
      error: (err: HttpErrorResponse) => {
        this.swal.callToast(err.error.Message, "error");
        console.log(err);
      }
    });
  }
}
