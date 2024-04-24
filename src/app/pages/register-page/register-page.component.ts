import { Component } from '@angular/core';
import { UserRegisterComponent } from '../../components/user/user-register/user-register.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [UserRegisterComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

}
