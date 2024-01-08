import {ProductStore} from "./ProductStore";
import {CartStore} from "./cartStore";
import {UsersStore} from "./usersStore";
import {CategoryStore} from "./CategoryStore";
import {FormStore} from "./FormStore";
import {IFormProps} from "../components/customProduct/CustomProductForm/CustomProductsForm";

export class RootStore  {
    product: ProductStore
    cart: CartStore
    users: UsersStore
    category: CategoryStore
    formStore: FormStore<IFormProps>;

    constructor() {
        this.product=new ProductStore();
        this.cart=new CartStore();
        this.users=new UsersStore();
        this.category=new CategoryStore();
        this.formStore = new FormStore<IFormProps>({
            title: {value: "",isRequired: true},
            category: {value: "", isRequired: true},
            price: {value: 0, isRequired: true},
            discountPercentage: {value: 0, isRequired: true},
            total: {value: 1, isRequired: true},
            description: {value: ""},
        });


    }
}