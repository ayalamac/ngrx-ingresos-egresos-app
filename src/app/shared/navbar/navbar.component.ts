import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Usuario } from './../../classes/usuario.class';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  usuario: Usuario;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.usuario = this.authService.user;
  }

}
