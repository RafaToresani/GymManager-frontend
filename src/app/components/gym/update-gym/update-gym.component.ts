import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GymService } from '../../../services/gym/gym.service';
import { SuccessGymResponse } from '../../../interfaces/response/GymResponse';
import { GymRequest, parseGymFormToRequest } from '../../../interfaces/request/GymRequest';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-gym',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-gym.component.html',
  styleUrl: './update-gym.component.css'
})
export class UpdateGymComponent {
  
  gymId:number | undefined;

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

  ngOnInit():void{
    this.gymService.getGymIdSubject().subscribe({
      next: (value) => {
        this.gymId=value;
      }
    })

    if(this.gymId!==undefined){
      this.gymService.findById(this.gymId).subscribe({
        next: (response: SuccessGymResponse) => {
          const gym= response.object;
          this.gymForm.patchValue({
            title: gym.title,
            email: gym.email,
            city: gym.city,
            street: gym.street,
            number: gym.number,
            postalCode: gym.postalCode,
            phoneNumber: gym.phoneNumber
          });
        }
      });
    }
  }


  validate(field:string, error:string){
    return this.gymForm.controls[field].getError(error) &&
      this.gymForm.controls[field].touched;
  }



  update(){
    const gymRequest:GymRequest | null = parseGymFormToRequest(this.gymForm);
    if(gymRequest!==null && this.gymId !== undefined){
      this.gymService.update(gymRequest, this.gymId).subscribe({
        error:(errorData: HttpErrorResponse) => {
          this.error = errorData.error.message;
      }
      })
      this.gymService.updateDashboard('mostrar');
    }
  }

}

