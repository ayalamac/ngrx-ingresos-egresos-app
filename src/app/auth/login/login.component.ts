import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import * as ui from './../../shared/ui.actions';

import { AuthService } from './../../services/auth.service';
import Swal from 'sweetalert2';

  // **********************************************************************************

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading: boolean;
  uiLoginSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      correo: ['andresmayala@gmail.com', [Validators.required, Validators.email] ],
      password: ['123456789', Validators.required ]
    });

    this.uiLoginSubscription = this.store.select('ui').subscribe( uiState => {
                            console.log('creates uiLoginSubscription');
                            this.loading = uiState.isLoading;
                          });
  }

  ngOnDestroy() {
    console.log('cancels uiLoginSubscription');
    this.uiLoginSubscription.unsubscribe();
  }

  // **********************************************************************************

  autenticarUsuario() {

    this.store.dispatch( ui.startsLoading() );

    const { correo, password } = this.loginForm.value;

    this.authService.autenticarUsuario(correo, password)
      .then(usuario => {
        console.log(usuario);
        this.store.dispatch( ui.stopsLoading() );
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch( ui.stopsLoading() );

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
