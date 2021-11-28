import { action, observable, computed, autorun, toJS, getDependencyTree, trace, runInAction } from 'mobx';
import { values, forEach } from 'lodash/fp';
import productsStore, { Product } from './products.store';
import { IObservableArray, ObservableValue } from 'mobx/dist/internal';

export class CartItem {
    @observable productId?: number;
    @observable quantity?: number;
    @observable preview?: string;
    @observable name?: string;
    @observable data?: object;
    @observable properties?: Array<{
        name: string;
        value: string;
    }>;
    // Link to the map editor
    @observable link?: string;
    @observable price?: number;

    constructor(data: Partial<CartItem>) {
        Object.assign(this, data);
    }

    @action updateQuantity(quantity: number) {
        this.quantity = Math.max(1, quantity);

    }

    @computed get totalPrice() {
        if (this.quantity && this.price) {
            return this.price * this.quantity;
        } else {
            return 0;
        }
    }
}

export class Cart {
    @observable items: IObservableArray<CartItem> = observable.array([]);

    constructor() {
        if (localStorage.cart) {
            const savedItems = JSON.parse(localStorage.cart);
            if (savedItems && Array.isArray(savedItems)) {
                savedItems.forEach((item: any) => {
                    this.items.push(new CartItem(item))
                });
            }   
            
        }

        // Persist cart to local storage
        const reaction = autorun(() => {
            localStorage.cart = JSON.stringify(toJS(this.items));
            trace();
            console.log(getDependencyTree(reaction));
        });
        // }, { delay: 2000, name: 'Persist' });
    }

    @action addItem(data: Partial<CartItem>) {
        runInAction(() => {
            this.items.push(new CartItem(data))
        })

    }

    @action updateItem(id: number, quantity: number) {
        this.items[id].updateQuantity(quantity);
    }

    @action removeItem(id: number) {
        console.log("remove", id)
        this.items.remove(this.items[id])
    }

    @computed get itemsArray() {
        return this.items;
    }

    @computed get totalPrice() {
        return this.itemsArray.reduce(
            (prev, item) => prev + item.totalPrice,
            0
        );
    }

    @computed get count() {
        return this.items.length;
    }
}

export default new Cart();