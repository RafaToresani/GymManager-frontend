import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { authGuard } from './guards/auth.guard';
import { GymPageComponent } from './pages/gym-page/gym-page.component';
import { ClientPageComponent } from './pages/client-page/client-page.component';

export const routes: Routes = [
    {
        path:"home", component:HomePageComponent
    },
    {
        path:"gyms", component:GymPageComponent, canActivate:[authGuard]
    },
    {
        path:"clients", component:ClientPageComponent, canActivate:[authGuard]
    },
    {
        path:"register", component:RegisterPageComponent
    },
    {
        path:"login", component:LoginPageComponent
    },
    {
        path:"**", redirectTo:"home"
    }
];
