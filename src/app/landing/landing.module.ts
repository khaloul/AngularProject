import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './home/home.component';
import { AuthModule } from '../auth/auth.module';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';

const routes: Routes = [
  // Other routes...
  { path: 'login', component: LoginComponent },
  { path:'register',component:RegisterComponent},
];
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    AuthModule
  ]
})
export class LandingModule { }
