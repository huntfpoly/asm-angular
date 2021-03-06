import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITask } from '../interface';
// import
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}
  getByCateId(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/task?categoryId=${id}`);
  }
  addTask(data: ITask): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/task`, data);
  }
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/task/${id}`);
  }
  updateTask(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/task/${id}`, data);
  }
  removeTask(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/task/${id}`);
  }
}
