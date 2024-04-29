import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../../services/client/client.service';
import { SuccessClientResponse } from '../../../interfaces/response/ClientResponse';

@Component({
  selector: 'app-search-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-client.component.html',
  styleUrl: './search-client.component.css'
})
export class SearchClientComponent {

  error:string = '';

  searchForm:FormGroup = this.fb.group({
    valueType:['dni'],
    search:['']
  })

  constructor(private clientService:ClientService, private fb:FormBuilder){
    
  }


  search(){
    if(this.searchForm.controls['valueType'].value === 'dni' && this.searchForm.controls['search'].valid){
      this.clientService.findByDni(this.searchForm.controls['search'].value).subscribe({
        next: (value:SuccessClientResponse) => {
          this.clientService.updateClientByDni(value.object);
        },
        error: (error:HttpErrorResponse) => {
          this.error = error.error.message;
        }
      })
    }
  }
}
