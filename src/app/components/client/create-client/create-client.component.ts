import { ClientRequest, parseClientFormToRequest } from './../../../interfaces/request/ClientRequest';
import { Component } from '@angular/core';
import { ClientService } from '../../../services/client/client.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuccessClientResponse } from '../../../interfaces/response/ClientResponse';
import { ErrorResponse } from '../../../interfaces/response/ErrorResponse';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css'
})
export class CreateClientComponent {

  error:string='';

  clientForm:FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    dni: ['', [Validators.required]],
    email:['', [Validators.required, Validators.email]],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
    number: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]]
  })

  constructor(private clientService:ClientService, private fb:FormBuilder){

  }

  validate(field:string, error:string){
    return this.clientForm.controls[field].getError(error) &&
      this.clientForm.controls[field].touched;
  }

  create(){
    const clientRequest:ClientRequest | null = parseClientFormToRequest(this.clientForm);
    if(clientRequest!==null){
      this.clientService.create(clientRequest).subscribe({
        next:(value:SuccessClientResponse) => {
          alert("Cliente creado correctamente. " + value.object);
          this.clientService.updateDashboard('mostrar');
        },
        error: (error:HttpErrorResponse) => {
          this.error = error.error.message;
        }
      })
    }
  }
}
