import { createReducer, on } from '@ngrx/store';
import { startsLoading, stopsLoading } from './ui.actions';

export interface State {
  isLoading: boolean;
}

export const initialState: State = {
  isLoading: false
};

const _uiReducer = createReducer(initialState,

  on(startsLoading, state => ( { ...state, isLoading: true } )),
  on(stopsLoading, state => ( { ...state, isLoading: false } )),

);

export function uiReducer(state, action) {
  return _uiReducer(state, action);
}
