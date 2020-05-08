import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// * Components
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// * Auth Guard
import { AuthGuard } from './services/auth.guard';

// * Child routes
import { dashboardRoutes } from './dashboard/dashboard.routes';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    canActivate: [ AuthGuard ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot( routes )],
  exports: [ RouterModule]
})
export class AppRoutingModule {}
