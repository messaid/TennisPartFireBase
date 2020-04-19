import { initialMarketState, IMarketState } from './../state/market.state';
import { createReducer, on, Action } from '@ngrx/store';
import * as MarketActions from '../actions/market.action';

const reducer = createReducer(
    initialMarketState,
  on(MarketActions.resetProducts, state => {
    return { ...state, currentProducts: initialMarketState.currentProducts};
  }),
  on(MarketActions.setProducts, (state, { products }) => {
    return { ...state, currentProducts : products };
  }),
);

export function marketReducer(state: IMarketState, action: Action) {
  return reducer(state, action);
}
