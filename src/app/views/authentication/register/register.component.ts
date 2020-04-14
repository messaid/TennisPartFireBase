import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ErrorMessages } from 'src/app/constants/error-messages';
import { ThrowStmt } from '@angular/compiler';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public authError$: Observable<string>;
  public lastValiNumber = "";
  constructor(private authService: AuthService) { }

  public registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmpassword: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
    name: new FormControl('', Validators.required),
    phonenumber: new FormControl('', {validators: [Validators.required], updateOn: 'change'}),
  });

  passwordEqual() {
    this.registerForm.get('confirmpassword').valueChanges.subscribe(
      val => {
        if(this.registerForm.get('confirmpassword').value !== this.registerForm.get('password').value){
          this.registerForm.get('confirmpassword').setErrors({ missmatch: true });
        }
      }
    );
  }

  getErrorMessagePhone(){
    if (this.registerForm.controls['phonenumber'].hasError('required')) {
      return ErrorMessages.PHONE_NUMBER_REQUIRED();
    }
  }

  getErrorMessagePassword(){
    if (this.registerForm.controls['confirmpassword'].hasError('missmatch')) {
      return ErrorMessages.PASSWORD_INVALID();
    }
  }

  getErrorMessage() {
    if (this.registerForm.controls['email'].hasError('required')) {
      return ErrorMessages.EMAIL_REQUIRED();
    }
    return this.registerForm.controls['email'].hasError('email') ? ErrorMessages.EMAIL_INVALID : '';
  }

  onChangesValuesPhone(): void {
    this.registerForm.get('phonenumber').valueChanges.subscribe(
      val => {
        if (isNaN(val) || val < 0 || val.includes('.')) {
          this.registerForm.controls['phonenumber'].setValue(this.lastValiNumber);
        } else{
          this.lastValiNumber = val;
        }
      }
    );
  }



  register(formData: FormData) {
    this.authService.register(formData['email'],
      formData['password'],
      formData['name'],
      formData['phonenumber']);
  }
  ngOnInit() {
    this.authError$ = this.authService.errorMatcher$.pipe();
    this.onChangesValuesPhone();
    this.passwordEqual();
  }

}
