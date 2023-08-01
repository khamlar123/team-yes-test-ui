import { Component, inject } from '@angular/core';
import { VmService } from './vm/vm.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
     { title: 'home', url: '/folder/home', icon: 'home' },
     { title: 'Change theme', url: '/folder/theme', icon: 'contrast' },
     { title: 'Open popup', url: '/folder/popup', icon: 'square' },
  ];

  constructor(public vm: VmService) {}

  changeModFunc(page: string):void{
    (page === 'Change theme')?  this.vm.changeMode = !this.vm.changeMode: '';

  }

  oepnModalFunc(page: string):void{
    (page === 'Open popup')? this.vm.isOpenModal = !this.vm.isOpenModal: this.vm.isOpenModal = false;
  }
}


