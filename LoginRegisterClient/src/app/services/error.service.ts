import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private swal: SwalService
  ) { }

  errorHandler(err: HttpErrorResponse){
    console.log(err);
    switch(err.status){
      case 500:
        for(let message of err.error.errorMessages[0]){
          this.swal.callToast(message, "info");
        }
        break;
        default:
          break;
    }
  }
}
