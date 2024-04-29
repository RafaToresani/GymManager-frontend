import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListGymComponent } from '../../components/gym/list-gym/list-gym.component';
import { CreateGymComponent } from '../../components/gym/create-gym/create-gym.component';
import { UpdateGymComponent } from '../../components/gym/update-gym/update-gym.component';
import { GymService } from '../../services/gym/gym.service';


@Component({
  selector: 'app-gym-page',
  standalone: true,
  imports: [CommonModule, ListGymComponent, CreateGymComponent, UpdateGymComponent],
  templateUrl: './gym-page.component.html',
  styleUrl: './gym-page.component.css'
})
export class GymPageComponent {
  component: string='mostrar';


  constructor(private gymService:GymService){}


  ngOnInit():void{
    this.gymService.getDashboardSubject().subscribe(value => {
      this.component = value; // Actualiza el valor en el componente cuando cambia en el servicio
    });
  }

  updateDashboard(value: string) {
    this.gymService.updateDashboard(value); // Llama al método en el servicio para actualizar el valor
  }
}
