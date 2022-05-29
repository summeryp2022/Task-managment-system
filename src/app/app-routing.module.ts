import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogComponent } from './dialog/dialog-component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuoteDetailsComponent } from './quote-details/quote-details.component';
import { AuthGaurdGuard } from './services/auth-gaurd.guard';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent, canActivate:[AuthGaurdGuard]},
  {path:'quote-details', component:QuoteDetailsComponent},
  {path:'dialog', component:DialogComponent},
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'**', redirectTo:'/login', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
