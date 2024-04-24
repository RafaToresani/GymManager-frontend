import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginRequest } from '../../../interfaces/request/LoginRequest';
import { AuthResponse } from '../../../interfaces/response/AuthResponse';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  loginError:string="";
  loginForm:FormGroup=this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
  })

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private loginService:LoginService
  ){

  }

  login(){
    const credentials:LoginRequest = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }

    this.loginService.login(credentials).subscribe({
      error: (errorData:HttpErrorResponse) => {
        console.error(errorData);
        if(errorData.error && errorData.error.message){
          this.loginError=errorData.error.message;
        }
      },
      complete: () => {
        console.info("Login completo");
        this.route.navigateByUrl('/home');
        this.loginForm.reset();
      }
    })
  }

  validate(field:string, error:string){
    return this.loginForm.controls[field].getError(error) &&
      this.loginForm.controls[field].touched;
  }
}
