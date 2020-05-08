import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private authService: AuthService,
               private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.estaAutenticado()
    .pipe(
      // TODO Estudiar otras maneras de hacer esto.
      tap( estaAutenticado => {
        if (!estaAutenticado) { this.router.navigate(['/login']); }
      })
    );
  }

}
