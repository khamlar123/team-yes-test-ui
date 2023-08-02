import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VmService } from '../vm/vm.service';
import { ITodo } from '../interface/i-todo';
import { AlertController } from '@ionic/angular';
import { SubSink } from 'subsink';
import { ApiService } from '../api/api.service';
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
    createAt: new Date(),
    updateAt: new Date(),
  }

  constructor(
    public vm: VmService,
    private alertController: AlertController,
    private api: ApiService
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
            this.vm.todoList = res;
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

  deleteInUi(id: number):void{
    this.vm.todoList = this.vm.todoList.filter(f => f.id !== id);
    this.vm.masterTodo = this.vm.masterTodo.filter(f => f.id !== id);
  }

  openSubMenu(id: number):void{
    this.isOpenSub = !this.isOpenSub;
    this.openSubMenueId = id;
  }

  deleteFunc():void{
    //api
    this.deleteInUi(this.openSubMenueId);
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
      console.log(this.addTodoModel);
      this.updateUiAfterSubmit()
      return ;
    }else{
      this.vm.todoList.push(this.addTodoModel);
      this.resetAddModel();
      this.vm.isOpenModal = false;
    }

  }

  updateUiAfterSubmit():void{
    this.vm.todoList = this.vm.todoList.filter(f => f.id !== this.addTodoModel.id);
    this.vm.todoList.push(this.addTodoModel);
    this.resetAddModel();
    this.vm.isOpenModal = false;
  }

  resetAddModel():void{
   let reset:ITodo  ={
      id: 0,
      title: '',
      desc: '',
      status: 0,
      createAt: new Date(),
      updateAt: new Date(),
    }

    this.addTodoModel = reset;
  }


}
