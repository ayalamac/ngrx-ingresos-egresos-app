import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { Usuario } from '../classes/usuario.class';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              public firestore: AngularFirestore) { }

  initAuthListener() {
    this.auth.authState.subscribe( (user: firebase.User) => {
      console.log(user?.email, user?.uid);
      console.log( user );
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

  estaAutenticado() {
    return this.auth.authState.pipe(
      map( user => user !== null)
    );
  }
}
