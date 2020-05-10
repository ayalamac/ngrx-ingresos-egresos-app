import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';


// ! Cada estado va en este estado global
export interface AppState {
   ui: ui.State;
   auth: auth.State;

}

// ! Cada reducer
export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   auth: auth.authReducer,
};

