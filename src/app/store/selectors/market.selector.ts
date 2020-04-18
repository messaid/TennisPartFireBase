import { IAppState } from './../state/app.state';
import { createSelector } from '@ngrx/store';
import { IMarketState } from '../state/market.state';

export const selectSession = (state: IAppState) => state.market;

export const selectProducts = createSelector(
  selectSession,
  (state: IMarketState) => state.currentProducts
);
