import {  ClientResponse } from './../../../interfaces/response/ClientResponse';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client/client.service';
import { ErrorResponse } from '../../../interfaces/response/ErrorResponse';
import { CommonModule } from '@angular/common';
import { SearchClientComponent } from '../search-client/search-client.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [CommonModule, SearchClientComponent],
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.css'
})
export class ListClientComponent implements OnInit{

  error:string = '';

  clients:ClientResponse[] = [];
  pageNumber:number = 0;
  pageSize:number = 10;
  totalPages:number = 0;

  constructor(private clientService:ClientService){

  }

  ngOnInit(): void {
    this.findAll();
    this.clientService.clienteByDni.subscribe(() => {
      this.updateBySearch();
    });
  }

  findAll(){
    this.clientService.findAllPage(this.pageNumber, this.pageSize).subscribe({
      next: (value) => {
        if (value.object && value.object.content) {
          this.clients = value.object.content;
          this.totalPages = value.object.totalPages;
          console.log(value);
        }
      },
      error: (error:HttpErrorResponse) => {
        console.log(error);
        this.error = error.error.message;
      }
    })
  }

  details(id:number){
    this.clientService.updateClientId(id);
    this.clientService.updateDashboard('detalles');
  }

  update(id: number) {
    this.clientService.updateClientId(id);
    this.clientService.updateDashboard('editar');
  }

  navigate(value:string){
    if (value === 'more' && this.totalPages > this.pageNumber+1) {
      this.pageNumber++;
      this.findAll();
    }
  
    if (value === 'less' && this.pageNumber > 0) { 
      this.pageNumber--;
      this.findAll();
    }
  }


  delete(id: number) {
    this.clientService.deleteById(id).subscribe({
      next: () => {
        alert("Cliente con id: " + id + " eliminado.")
        this.findAll();
      },
      error: (error:ErrorResponse) => {
        alert(error.message);
      }
    })
  }

  updateBySearch(){
    this.clientService.getClientByDni().subscribe({
      next:(value) => {
        if(value !== null){
          this.clients = [];
          this.clients.push(value);
        }
      }
    })
  }
}
