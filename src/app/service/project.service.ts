import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProject } from '../interface';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  getByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/project?userId=${userId}`);
  }
  add(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/project`, data);
  }
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/project/${id}`);
  }
  removeProject(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/project/${id}`);
  }
  updateProject(id: string, data: IProject): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/project/${id}`, data);
  }
}
