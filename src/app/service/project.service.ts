import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  getByUserId(userId: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiLocalUrl}/project?userId=${userId}`
    );
  }
  add(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiLocalUrl}/project`, data);
  }
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiLocalUrl}/project/${id}`);
  }
  removeProject(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiLocalUrl}/project/${id}`);
  }
  // updateCategory(item: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/${item.id}`, item);
  // }
}
