import { CommonModule } from '@angular/common';
import {
  GymResponse,
  SuccessGymPageResponse,
} from '../../../interfaces/response/GymResponse';
import { GymService } from './../../../services/gym/gym.service';
import { Component, OnInit} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-gym',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-gym.component.html',
  styleUrl: './list-gym.component.css',
})
export class ListGymComponent implements OnInit {
  gymsList: GymResponse[] = [];
  error: string = '';
  pageNumber:number = 0;
  pageSize:number = 10;
  totalPages:number = 0;


  constructor(private gymService: GymService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.gymService.findAll(this.pageNumber, this.pageSize).subscribe({
      next: (response: SuccessGymPageResponse) => {
        if (response.object && response.object.content){
          this.gymsList = response.object.content;
          this.totalPages = response.object.totalPages;
          console.log(this.gymsList);
        }
      },
      error: (errorData: HttpErrorResponse) => {
        this.error = errorData.error.message;
      },
    });
  }

  update(id: number) {
    this.gymService.updateDashboard('editar');
    this.gymService.updateGymId(id);
  }

  toggleStatus(id: number) {
    this.gymService.toggleStatus(id).subscribe({
      next: () => {
        this.findAll();
      },
    });
  }

  delete(id: number) {
    if (
      confirm(`¿Estás seguro de que deseas eliminar el gimnasio con id: ${id}?`)
    ) {
      this.gymService.delete(id).subscribe({
        next: () => {
          this.findAll();
        },
      });
    }
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
}
