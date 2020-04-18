import { IMarketState, initialMarketState } from './market.state';
import { initialUserState, IUserState } from './user.state';

export interface IAppState {
  user: IUserState;
  market: IMarketState;
}

export const initialAppState: IAppState = {
    user: initialUserState,
    market: initialMarketState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
