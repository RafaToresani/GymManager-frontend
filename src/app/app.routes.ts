import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const routes: Routes = [
    {
        path:"home", component:HomePageComponent
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
