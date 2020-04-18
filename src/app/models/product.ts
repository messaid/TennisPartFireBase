import { ProductEnum } from './../enums/product-enum';
export class Product {
    uid: string;
    displayName: string;
    category: ProductEnum;
    title: string;
    description: string;
    price: string;
    pictures?: Array<string>;

    constructor() {
        this.pictures = new Array<string>();
    }
}
