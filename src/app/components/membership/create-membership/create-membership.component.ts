import { catchError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MembershipService } from '../../../services/membership/membership.service';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../services/client/client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MembershipRequest } from '../../../interfaces/request/MembershipRequest';

@Component({
  selector: 'app-create-membership',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-membership.component.html',
  styleUrl: './create-membership.component.css'
})
export class CreateMembershipComponent implements OnInit{

  clientId:number | undefined;
  error:string= '';
  success:string = '';

  form:FormGroup = this.fb.group({
    endingDate:['']
  })

  constructor(private fb:FormBuilder, private clientService:ClientService, private membershipService:MembershipService){

  }
  
  ngOnInit(): void {
    this.clientService.getClientIdSubject().subscribe({
      next: (value) => {
        this.clientId = value;
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.error.message;
      }
    })
  }

  create(){
    if(this.clientId!==undefined && this.form.controls['endingDate'].valid){
      const request:MembershipRequest = {
        userId:this.clientId,
        endingDate:this.form.controls['endingDate'].value
      }
      this.membershipService.create(request).subscribe({
        next: (value) => {
          this.success=value.message;
        },
        error: (error: HttpErrorResponse) => {
          this.error = error.error.message;
        }
      })
    }
  }
}
