import { createAction, props } from '@ngrx/store';
import { Usuario } from './../classes/usuario.class';

export const setUser = createAction(
  '[Auth] setUser',
  props<{ user: Usuario }>()
);

export const unsetUser = createAction('[Auth] unsetUser');


