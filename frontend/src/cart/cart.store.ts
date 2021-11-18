import { action, observable, computed, autorun, toJS, getDependencyTree, trace } from 'mobx';
import { values, forEach } from 'lodash/fp';
import productsStore, { Product } from './products.store';

export class CartItem {
    @observable productId?: number;
    @observable quantity?: number;

    constructor(data: any) {
        Object.assign(this, data);
    }

    @action updateQuantity(quantity: number) {
        this.quantity = Math.max(1, quantity);
    }

    @computed get product(): Product | null {
        if (this.productId) {
            return productsStore.getProductById(this.productId);
        } else {
            return null
        }
    }

    @computed get totalPrice() {
        if (this.quantity && this.product) {
            return this.product.price * this.quantity;
        } else {
            return 0;
        }
    }

    
}

export class Cart {
    @observable items = new Map<number, any>();

    constructor() {
        if (localStorage.cart) {
            const savedItems = JSON.parse(localStorage.cart);

            forEach((item) => {
                this.items.set(item.productId, new CartItem(item))
            }, savedItems);
        }

        // Persist cart to local storage
        const reaction = autorun(() => {
            localStorage.cart = JSON.stringify(toJS(this.items));
            trace();
            console.log(getDependencyTree(reaction));
        });
        // }, { delay: 2000, name: 'Persist' });
    }

    @action addItem(productId: number, quantity: number) {
        if (this.items.get(productId)) {
            this.items.get(productId).updateQuantity(this.items.get(productId).quantity + 1);
        } else {
            this.items.set(productId, new CartItem({ productId, quantity }));
        }
    }

    @action updateItem(productId: number, quantity: number) {
        this.items.get(productId).updateQuantity(quantity);
    }

    @action removeItem(productId: number) {
        this.items.delete(productId);
    }

    @computed get itemsArray() {
        return values(Object.fromEntries(this.items));
    }

    @computed get totalPrice() {
        return this.itemsArray.reduce(
            (prev, item) => prev + item.totalPrice,
            0
        );
    }

    @computed get count() {
        return this.itemsArray.length;
    }
}

export default new Cart();