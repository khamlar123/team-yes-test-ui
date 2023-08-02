import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private getTodoUrl = environment.endPoin + 'api/get-todo';
  private getTodoByidUrl = environment.endPoin + 'api/get-todo-byid';
  private addTodoUrl = environment.endPoin + 'api/add-todo';
  private updateTodoUrl = environment.endPoin + 'api/update-todo';
  private deleteTodoUrl = environment.endPoin + 'api/delete-todo';


  constructor(private http: HttpClient) { }

  getTodo(): Observable<any> {
    return this.http.get<any>(this.getTodoUrl,{} ).pipe(take(1));
  }

  getTodoByid(id: number): Observable<any> {
    const params = new HttpParams()
    .set('id', id.toString())
    return this.http.get<any>(this.getTodoByidUrl, { params }).pipe(take(1));
  }

  addTodo(model: {title: string, desc: string, status: number}): Observable<any> {
    return this.http.post<any>(this.addTodoUrl, model).pipe(take(1));
  }

  updateTodo(model: {id: number, title: string, desc: string, status: number}): Observable<any> {
    return this.http.put<any>(this.updateTodoUrl, model).pipe(take(1));
  }

  deleteTodo(id: number): Observable<any> {
    const params = new HttpParams()
    .set('id', id.toString())
    return this.http.delete<any>(this.deleteTodoUrl, { params }).pipe(take(1));
  }

}
