import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public authError$: Observable<string>;

  constructor(private authService: AuthService, private router: Router) { }
  public loginForm = new FormGroup({
    email: new FormControl('',  [Validators.required, Validators.email]),
    password: new FormControl('',  [Validators.required, Validators.minLength(4)]),
  });

  getErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter an email';
    }

    return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  login(formData: FormData) {
    this.authService.login(formData['email'], formData['password']);
  }

  ngOnInit() {
   // this.authService.errorMatcher$.subscribe(data => {this.authError = data; });
    this.authError$ = this.authService.errorMatcher$.pipe();
  }

}
