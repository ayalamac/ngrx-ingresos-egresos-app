import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { Usuario } from '../classes/usuario.class';

import { Store } from '@ngrx/store';
import { AppState } from './../app.reducer';
import * as authActions from '../auth/auth.actions';

import { FirebaseAuhStateResponse } from './../models/firebase-authState-response.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  user: Usuario;

  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private store: Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe( (userSesionInfo: firebase.User) => {
      // console.log(user?.email, user?.uid);
      // ! Si encuentra usuario autenticado, busca su información en la base de datos
      // ! y la guarda en el State
      if (userSesionInfo?.uid) {
        this.userSubscription = this.firestore.doc<Usuario>(`${userSesionInfo.uid}/usuario`)
                                  .valueChanges().subscribe( firestoreUser => {
                                    this.user = {...firestoreUser};
                                    this.store.dispatch( authActions.setUser( { user: this.user } ) );
                                    // console.log('firestoreUser: ', this.user);
                                    // console.log(this.store.select('auth').subscribe(userState => console.log('user del State: ', userState.user )));
                                  });
      } else {
        this.store.dispatch( authActions.unsetUser() );
        this.userSubscription.unsubscribe();
      }


    });
  }

  crearUsuario( nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).
    then( ({ user }) => {
      const usuarioDb = new Usuario(user.uid, nombre, email );
      return this.firestore.doc(`${ user.uid }/usuario`).set( { ...usuarioDb } );
      // .then( () => { /* Acciones post grabación en la DB */ });
    });
  }

  autenticarUsuario( email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  cerrarSesionDeUsuario() {
    console.log('Cerrando sesión...');
    return this.auth.signOut();
  }

  // Para el guard
  estaAutenticado() {
    return this.auth.authState.pipe(
      map( user => user !== null)
    );
  }
}
