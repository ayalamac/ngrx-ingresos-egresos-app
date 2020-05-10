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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  loading: boolean;
  uiRegisterSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nombre:   ['', Validators.required ],
      correo:   ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required ],
    });

    this.uiRegisterSubscription = this.store.select('ui')
                                    .subscribe( uiState => this.loading = uiState.isLoading);
  }

  ngOnDestroy() {
    console.log('Cancels uiRegisterSubscription');
    this.uiRegisterSubscription.unsubscribe();
  }

  // **********************************************************************************

  crearUsuario() {

    this.store.dispatch( ui.startsLoading() );

    const { nombre, correo, password } = this.registerForm.value;
    this.authService.crearUsuario(nombre, correo, password)
      .then(credenciales => {
        console.log(credenciales);

        this.store.dispatch( ui.stopsLoading() );
        this.router.navigate(['/']);
      })
      .catch( err => {

        console.error(err);
        this.store.dispatch( ui.stopsLoading() );

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al crear usuario.',
          footer: err.message
        });
      });
  }

}
