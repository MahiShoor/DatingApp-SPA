import { error } from 'util';
import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs'; // this is because there is no type 
// defination declare for this module
@Injectable({
  providedIn: 'root'
})
export  class AlerifyService {

  constructor() { }
confirm(massage: string, okCallBack: () => any) {
alertify.confirm(massage, (e: any) => {
  if (e) {
    okCallBack();
  } else {

  }
});
}
success(message: string) {
  alertify.success(message);
}

error(message: string) {
  alertify.error(message);
}
warning(message: string) {
  alertify.warning(message);
}
message(message: string) {
  alertify.message(message);
}
}
