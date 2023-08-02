import { Injectable } from '@angular/core';
import { ITodo } from '../interface/i-todo';

@Injectable({
  providedIn: 'root'
})
export class VmService {

  changeMode:boolean = false;
  isOpenModal = false;

  masterTodo: ITodo[] =[];
  todoList:ITodo[] =[];

  constructor() { }
}
