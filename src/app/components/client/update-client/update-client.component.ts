import { Component } from '@angular/core';
import { ClientService } from '../../../services/client/client.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientRequest, parseClientFormToRequest } from '../../../interfaces/request/ClientRequest';
import { SuccessClientResponse } from '../../../interfaces/response/ClientResponse';
import { ErrorResponse } from '../../../interfaces/response/ErrorResponse';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-client.component.html',
  styleUrl: './update-client.component.css'
})
export class UpdateClientComponent {
  clientId:number | undefined;

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

  ngOnInit():void{
    this.clientService.getClientIdSubject().subscribe({
      next: (value) => {
        this.clientId=value;
      }
    })

    if(this.clientId!==undefined){
      this.clientService.findById(this.clientId).subscribe({
        next: (response: SuccessClientResponse) => {
          const client= response.object;
          this.clientForm.patchValue({
            firstName: client.firstName,
            lastName: client.lastName,
            dni: client.dni,
            email: client.email,
            city: client.city,
            street: client.street,
            number: client.number,
            postalCode: client.postalCode,
            phoneNumber: client.phoneNumber
          });
        }
      });
    }
  }

  update(){
    const clientRequest:ClientRequest | null = parseClientFormToRequest(this.clientForm);
    if(clientRequest!==null && this.clientId){
      this.clientService.updateClient(clientRequest, this.clientId).subscribe({
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
