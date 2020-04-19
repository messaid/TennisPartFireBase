import { Product } from './../../models/product';
import { createAction, props } from '@ngrx/store';

export const setProducts = createAction(
    '[Market] Set Current Products',
    props<{products: Array<Product>}>());

export const resetProducts = createAction('[Market] Delete Current products');

