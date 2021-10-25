import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILoginData } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}
  login(loginData: ILoginData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, loginData);
  }
  signup(signupData: ILoginData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/signup`, signupData);
  }
  logout(): void {
    localStorage.removeItem('accessToken');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
