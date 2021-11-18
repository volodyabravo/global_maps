import { observable } from 'mobx';

enum MapTypes {
  STAR = 1,
  STREET = 2
}

export interface Product {
  id: number;
  productId?: number;
  name: string;
  preview: string;
  data: any;
  price: number;
  properties: Array<{
    name: string;
    value: string;
  }>
}

export class ProductsStore {
  @observable items: Array<Product> = []

  getProductById(id: number) {
    return this.items[id];
  }
}

export default new ProductsStore();