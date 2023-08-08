import { sharedReducer } from '../shared/shared.reducer';
import { SHARED_STATE_NAME } from '../shared/shared.selector';
import { SharedState } from '../shared/shared.state';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  router: RouterReducerState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: sharedReducer,
  router: routerReducer,
};
