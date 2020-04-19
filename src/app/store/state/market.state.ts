import { Product } from './../../models/product';
export interface IMarketState {
    currentProducts: Array<Product>;
  }

export const initialMarketState: IMarketState = {
    currentProducts: new Array<Product>(),
};
