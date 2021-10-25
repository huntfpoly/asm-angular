import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: string = '';
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['hieunucek6@gmail.com', Validators.required],
      password: ['123456', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    console.log('is login', this.authService.isLoggedIn);
  }

  submitForm() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((data) => {
      if (data.accessToken) {
        this.authService.isLoggedIn = true;
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem(
          'user',
          JSON.stringify({ email: data.email, _id: data._id })
        );
        this.authService.isLoggedIn = true;
        this.router.navigate(['/project']);
      } else {
        // this.error =
        console.log(data);
        alert(data.error);
      }
    });
  }
}
