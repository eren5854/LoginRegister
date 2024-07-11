import { Injectable } from '@angular/core';

import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  callToast(message: string, icon: SweetAlertIcon = "success"){
    const Toast = Swal.mixin({
        toast: true,
        // title: 'Giriş Başarılı',
        position: 'bottom-end',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
    });
    Toast.fire(message, '', icon)
  }

  callToast2(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Giriş başarısız',
      text: 'Email veya şifre hatalı!!',
      timer: 3000,
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false
    });
  }
  callToastRegisterSuccess(message: string, icon: SweetAlertIcon = "success"){
    const Toast = Swal.mixin({
        toast: true,
        title: 'Kayıt Başarılı',
        position: 'bottom-end',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
    });
    Toast.fire(message, '', icon)
  }

  callToastRegisterFailed(message: string, icon: SweetAlertIcon = "warning"){
    const Toast = Swal.mixin({
        toast: true,
        title: 'Hata',
        position: 'bottom-end',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
    });
    Toast.fire(message, '', icon)
  }
}
export type SweetAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question'