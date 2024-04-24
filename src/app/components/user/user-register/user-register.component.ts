import { RegisterService } from '../../../services/auth/register.service';
import { RegisterRequest, parseRegisterFormToRequest } from '../../../interfaces/request/RegisterRequest';
import { HttpClientJsonpModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from '../../../interfaces/response/AuthResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [CommonModule, HttpClientJsonpModule, ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css',
})
export class UserRegisterComponent {
  formError: String = '';

  registerForm: FormGroup = this.fb.group({
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
    ],
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
    numberStreet: ['', [Validators.required]],
    postalCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    phoneNumber: [
      '',
      [Validators.required, Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private registerService: RegisterService
  ) {}

  register(){
    const registerRequest:RegisterRequest | null = parseRegisterFormToRequest(this.registerForm);

    if(registerRequest!==null){
      this.registerService.register(registerRequest).subscribe({
        next:(auth:AuthResponse) => {
          alert(auth);
          //redirecciona al servicio login
        },
        error:(errorData: HttpErrorResponse) => {
          console.error(errorData);
          if (errorData.error && errorData.error.message) {
            this.formError = errorData.error.message;
          }
        }
      })
    }
  }


  validate(field:string, error:string){
    return this.registerForm.controls[field].getError(error) &&
      this.registerForm.controls[field].touched;
  }

}
