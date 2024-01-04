import {ProductStore} from "./ProductStore";
import {CartStore} from "./cartStore";
import {UsersStore} from "./usersStore";
import {CategoryStore} from "./CategoryStore";

export class RootStore  {
    product: ProductStore
    cart: CartStore
    users: UsersStore
    category: CategoryStore

    constructor() {
        this.product=new ProductStore();
        this.cart=new CartStore();
        this.users=new UsersStore();
        this.category=new CategoryStore();
    }
}