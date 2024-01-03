import {ProductHeader} from "./ProductHeader";
import {ProductComponent} from "./ProductComponent";
import {ProductStore} from "../../store/ProductStore";
import "../pagination/pagination.css";
import {observer} from "mobx-react-lite";

const products = new ProductStore();
const HomePage=observer(()=>{

    return (
        <>
            <ProductHeader products={products}/>
            <ProductComponent products={products}/>
        </>
    )
})
export default HomePage;