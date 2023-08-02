import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VmService } from '../vm/vm.service';
import { ITodo } from '../interface/i-todo';
import { AlertController } from '@ionic/angular';
import { SubSink } from 'subsink';
import { ApiService } from '../api/api.service';
import { ToastService } from '../toast/toast-service';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit, OnDestroy {
  private sub = new SubSink();
  public page!: string;
  private activatedRoute = inject(ActivatedRoute);
  sortingOpen = false;
  openSubMenueId: number=0;
  isOpenSub = false;
  sortIngStatus: number = 4; //number 4 not show cancel

  addTodoModel:ITodo  ={
    id: 0,
    title: '',
    desc: '',
    status: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  constructor(
    public vm: VmService,
    private alertController: AlertController,
    private api: ApiService,
  ) {}

  ngOnDestroy(): void {
   this.sub.unsubscribe();
  }

  ngOnInit() {
    this.page = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.loadTodoFunc();
  }

  loadTodoFunc():void{
      this.sub.sink = this.api.getTodo().subscribe(res => {
        if(res){
            this.vm.todoList = this.soting(res, 'id');
        }
      }, err => console.log(err),
      () => { }
      );
  }

  getTodoList(): ITodo[]{
    if(this.sortIngStatus === 4){
      return this.vm.todoList
    }
    return this.vm.todoList.filter(f => f.status === this.sortIngStatus);
  }

  sortingFunc(id: number):void{
    this.sortIngStatus = id;
    this.sortingOpen = false;
  }

  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  getStatus(item: ITodo):string{
    return (item === undefined)? 'pending' : (item.status === 0)? 'pending': (item.status === 1)? 'approved': (item.status === 2)? 'complete': 'cancel' ;
  }

  openSubMenu(id: number):void{
    this.isOpenSub = !this.isOpenSub;
    this.openSubMenueId = id;
  }

  deleteFunc():void{
    this.api.deleteTodo(this.openSubMenueId).subscribe(res => {
      if(res > 0){
        this.deleteInUi(this.openSubMenueId);
        this.openSubMenueId = 0;
      }
    },err => console.log(err),
    () => {}
    )
  }

  deleteInUi(id: number):void{
    this.vm.todoList = this.vm.todoList.filter(f => f.id !== id);
    this.vm.masterTodo = this.vm.masterTodo.filter(f => f.id !== id);
  }

  async checkEvent() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are you sure you want to delete item ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Ok',
          handler: (data) => {
           this.deleteFunc();
          },
        },
      ],
    });

    await alert.present();
  }

  setEditTodo(item: ITodo):void{
    this.addTodoModel = item;
    this.vm.isOpenModal = true;
  }

  submitFunc():void{
    if(this.addTodoModel.id > 0 ){



      this.sub.sink = this.api.updateTodo(this.addTodoModel).subscribe(res => {
        if(res > 0){
          this.updateUiAfterSubmit();
          this.openSubMenueId = 0;
        }
      }, err => console.log(err),
      () => {
    
      }
      );
      return ;
    }else{

      if(this.addTodoModel.title === '' || this.addTodoModel.desc === ''){
        this.errorAlert('Plese check your data title or description is empty');
        return ;
    }

      let addModel = {
        id: 0,
        title: this.addTodoModel.title,
        desc: this.addTodoModel.desc,
        status: this.addTodoModel.status,
      }

      this.sub.sink = this.api.addTodo(addModel).subscribe(res => {
     
        if(res > 0){
          this.addTodoModel.id = res;
          this.vm.todoList.push(this.addTodoModel);
          this.resetAddModel();
          this.vm.isOpenModal = false;
        }
      },err => console.log(err),
      () => {
   
      }
      )
    }

  }

  updateUiAfterSubmit():void{
    this.vm.todoList = this.vm.todoList.filter(f => f.id !== this.addTodoModel.id);
    this.vm.todoList.push(this.addTodoModel);
    this.vm.todoList = this.soting(this.vm.todoList,'id'); 
    this.resetAddModel();
    this.vm.isOpenModal = false;
  }

  soting(array: any, field: string): any[] {
    if (!Array.isArray(array)) {
      return [];
    }
    array.sort((a: any, b: any) => {
      if (a[field] > b[field]) {
        return 1;
      } else {
        return -1;
      }
    });
    return array;
  }

  resetAddModel():void{
   let reset:ITodo  ={
      id: 0,
      title: '',
      desc: '',
      status: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.addTodoModel = reset;
  }

  async errorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }


}
