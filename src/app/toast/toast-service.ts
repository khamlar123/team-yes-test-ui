import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class ToastService {

  protected toast = {
    showToaster: false,
    quotePos: 0,
    msg: 'please wait...',
  };

  protected dsToast = new BehaviorSubject(this.toast);
  toast$ = this.dsToast.asObservable();

  doToast() {
    this.toast.quotePos = Math.floor(Math.random() * 14);
    this.toast.showToaster = true;
    this.dsToast.next(this.toast);
  }

  closeToast() {
    this.toast.msg = 'please wait...';
    this.toast.showToaster = false;
    this.dsToast.next(this.toast);
  }

  setMsg(msg: any) {
    this.toast.msg = msg;
    this.dsToast.next(this.toast);
  }

}
