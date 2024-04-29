import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GymService } from '../../../services/gym/gym.service';
import { GymRequest, parseGymFormToRequest } from '../../../interfaces/request/GymRequest';
import { SuccessGymResponse } from '../../../interfaces/response/GymResponse';
import { ErrorResponse } from '../../../interfaces/response/ErrorResponse';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-gym',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-gym.component.html',
  styleUrl: './create-gym.component.css'
})
export class CreateGymComponent {

  error:string='';

  gymForm:FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    email:['', [Validators.required, Validators.email]],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
    number: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]]
  })

  constructor(private gymService:GymService, private fb:FormBuilder){

  }

  validate(field:string, error:string){
    return this.gymForm.controls[field].getError(error) &&
      this.gymForm.controls[field].touched;
  }

  create(){
    const gymRequest:GymRequest | null = parseGymFormToRequest(this.gymForm);
    if(gymRequest!==null){
      this.gymService.create(gymRequest).subscribe({
        next:(value:SuccessGymResponse) => {
          alert("Gimnasio creado correctamente. " + value.object);
          this.gymService.updateDashboard('mostrar');
        },
        error:(errorData: HttpErrorResponse) => {
            this.error = errorData.error.message;
        }
      })
    }
  }

  
}
