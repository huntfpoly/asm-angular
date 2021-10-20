import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  ngOnInit(): void {}

  submitForm() {
    console.log(this.signupForm.value);
    this.authService.signup(this.signupForm.value).subscribe((data) => {
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem(
          'user',
          JSON.stringify({ email: data.email, _id: data._id })
        );
        this.router.navigate(['/project']);
      } else {
        alert('Đăng kys không thành công');
      }
    });
  }
}
