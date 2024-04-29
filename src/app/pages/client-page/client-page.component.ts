import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListClientComponent } from '../../components/client/list-client/list-client.component';
import { CreateClientComponent } from '../../components/client/create-client/create-client.component';
import { ClientService } from '../../services/client/client.service';
import { UpdateClientComponent } from '../../components/client/update-client/update-client.component';
import { ClientDetailsComponent } from '../../components/client/client-details/client-details.component';

@Component({
  selector: 'app-client-page',
  standalone: true,
  imports: [CommonModule, ListClientComponent, CreateClientComponent, UpdateClientComponent, ClientDetailsComponent],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.css'
})
export class ClientPageComponent {

  component:string = 'mostrar';

  constructor(private clientService:ClientService){
    
  }

  ngOnInit():void{
    this.clientService.getDashboardSubject().subscribe(value => {
      this.component = value; // Actualiza el valor en el componente cuando cambia en el servicio
    });
  }

  updateDashboard(value: string) {
    this.clientService.updateDashboard(value);
  }

}
