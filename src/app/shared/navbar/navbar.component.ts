import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  userLoginOn:boolean=false;
  
  constructor(private loginService:LoginService, private route:Router){
    
  }
  
  ngOnInit(): void {
    this.loginService.userLoginOn.subscribe({
      next: (value) => {
        this.userLoginOn = value;
      }
    })
    
  }

  logout() {
    this.loginService.logout();
    this.route.navigateByUrl('login');
  }

  navigate(url: string) {
    this.route.navigateByUrl(url);
  }
}
