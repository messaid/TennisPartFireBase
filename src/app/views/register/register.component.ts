import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }
  public signUpForm = new FormGroup({
    email: new FormControl('',  Validators.required),
    password: new FormControl('',  Validators.required),
    name: new FormControl('',  Validators.required),
    phonenumber: new FormControl('',  Validators.required),
  });

  signup(formData: FormData){
    this.authService.register(formData['email'],
    formData['password'],
    formData['name'],
    formData['phonenumber']);
  }
  ngOnInit() {
  }

}
