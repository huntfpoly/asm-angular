import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogin: Boolean = true;
  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {
    let authToken = localStorage.getItem('accessToken');
    if (authToken != undefined && authToken.length > 0) {
      // this.isLogin = true;
    }
    console.log(this.AuthService.isLoggedIn);
  }

  logout(): void {
    // this.isLogin = false;
    this.AuthService.logout();
  }
}
