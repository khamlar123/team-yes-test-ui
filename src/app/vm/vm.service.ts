import { Injectable } from '@angular/core';
import { ITodo } from '../interface/i-todo';

@Injectable({
  providedIn: 'root'
})
export class VmService {

  changeMode:boolean = false;
  isOpenModal = false;

  masterTodo: ITodo[] =[
    {
      id: 1,
      title: 'tests1',
      desc: 'khamlar123',
      status: 0,
      createAt: new Date(),
      updateAt: new Date(),
    },
    {
      id: 2,
      title: 'tests2',
      desc: '445555',
      status: 0,
      createAt: new Date(),
      updateAt: new Date(),
    },
    {
      id: 3,
      title: 'tests3',
      desc: '445555',
      status: 0,
      createAt: new Date(),
      updateAt: new Date(),
    },
  ]
  todoList:ITodo[] =[
    // {
    //   id: 1,
    //   title: 'tests1',
    //   desc: 'khamlar123',
    //   status: 0,
    //   createAt: new Date(),
    //   updateAt: new Date(),
    // },
    // {
    //   id: 2,
    //   title: 'tests2',
    //   desc: '445555',
    //   status: 1,
    //   createAt: new Date(),
    //   updateAt: new Date(),
    // },
    // {
    //   id: 3,
    //   title: 'tests3',
    //   desc: '445555',
    //   status: 2,
    //   createAt: new Date(),
    //   updateAt: new Date(),
    // },
    // {
    //   id: 4,
    //   title: 'tests3',
    //   desc: '445555',
    //   status: 3,
    //   createAt: new Date(),
    //   updateAt: new Date(),
    // },
  ]

  constructor() { }
}
