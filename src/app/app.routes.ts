import { Routes } from '@angular/router';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

    {path:'', component:HomeComponent,  canActivate:[authGuard] },
    {path:'task/add', component:TaskFormComponent },
    {path:'task/:id', component:TaskFormComponent },
    {path:'profile', component:ProfileComponent },
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
];
