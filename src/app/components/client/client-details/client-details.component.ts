import { Component, OnInit } from '@angular/core';
import { ClientResponse } from '../../../interfaces/response/ClientResponse';
import { ClientService } from '../../../services/client/client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CreateMembershipComponent } from '../../membership/create-membership/create-membership.component';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [CommonModule, CreateMembershipComponent],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent implements OnInit{

  error:string = '';
  client:ClientResponse | undefined;
  idClient: number | undefined;
  membership:boolean = false;

  constructor(private clientService:ClientService){
    
  }

  ngOnInit():void{
    this.clientService.getClientIdSubject().subscribe({
      next: (value) => {
        this.idClient=value;
      }
    })
    this.chargeClient();
  }

  chargeClient(){
    if(this.idClient!==undefined){
      this.clientService.findById(this.idClient).subscribe({
        next:(value) => {
          this.client = value.object;
        },
        error: (error: HttpErrorResponse) => {
          this.error = error.error.message;
        }
      })
    }
  }

  toggleMembership() {
    this.membership = !this.membership;
  }
}
