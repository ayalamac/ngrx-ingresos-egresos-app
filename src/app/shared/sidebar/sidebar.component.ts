import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private authService: AuthService,
              private router: Router) { }

  cerrarSesion() {
    this.authService.cerrarSesionDeUsuario()
    .then( sesion => this.router.navigateByUrl('/login'))
    .catch( err => console.log(err));
  }
}
