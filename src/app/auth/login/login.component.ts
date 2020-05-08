import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginIn = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required ]
    });
  }

  autenticarUsuario() {
    this.loginIn = true;
    const { correo, password } = this.loginForm.value;
    this.authService.autenticarUsuario(correo, password)
    .then(usuario => {
      console.log(usuario);
      this.loginIn = false;
      this.router.navigate(['/']);
    })
    .catch(err => {
      // ! console.error(err);
      this.loginIn = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario o contraseña incorrectos.',
        footer: err.message
      });
    });
  }

  cerrarSesionDeUsuario() {
    return this.authService.cerrarSesionDeUsuario();
  }

}
