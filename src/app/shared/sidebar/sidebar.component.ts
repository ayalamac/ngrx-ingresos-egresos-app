import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.authService.user;
  }

  cerrarSesion() {
    this.authService.cerrarSesionDeUsuario()
    .then( sesion => this.router.navigateByUrl('/login'))
    .catch( err => console.log(err));
  }
}
