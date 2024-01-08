import React, {useEffect} from 'react';
import './ProductForm.css';
import {useRouterStore} from "mobx-state-router";
import {useRootStore} from "../../../Context/RootContext";
import {observer} from "mobx-react-lite";
import {SessionStorageGetter, SessionStorageSetter} from "../../SessionStorageHandler/SessionStorageHandler";
import {MessageField, NameField, NumberField, RadioField} from "../../HOC/FieldInputElements";
import {IFormDataValue} from "../../../store/FormStore";

export interface IFormProps {
    title: IFormDataValue;
    category: IFormDataValue;
    price: IFormDataValue;
    discountPercentage: IFormDataValue;
    total: IFormDataValue;
    description: IFormDataValue;
    [x: string]: IFormDataValue;
}

export type TCustomProductFormProps = IFormProps & {
    id: number;
    images: Array<any>;
    rating: number;
    customProduct: boolean;
    quantity: number;
}


export const CustomProductForm = observer(() => {
    const routerStore = useRouterStore();
    const {formStore} = useRootStore();

    useEffect(() => {
        const customProductData = SessionStorageGetter('customProducts');
        const customProductIdBeforeRefresh = SessionStorageGetter('customProductId');

        if (customProductData) {
            formStore.customFormStore.setData(customProductData)
        }

        if (customProductIdBeforeRefresh) {
            formStore.updateCustomId(+customProductIdBeforeRefresh + 1)
        }
    }, []);


    const Validation = (name: string) => {
        if(formStore.formData[name].isRequired === true){
            if (name === "title" && formStore.formData[name].value.length === 0) {
                formStore.addErrorField(name, "Please Enter A Valid Name");
            }
            else if (name === "discountPercentage" && formStore.getValue(name)>100 || formStore.getValue(name)< 0) {
                formStore.addErrorField(name, "Discount Percentage must be lie between 0 to 100");
            }
            else if (name === "quantity" || name === "price" && formStore.getValue(name)<=0) {
                formStore.addErrorField(name, `${name.toUpperCase()} must be greater than 0`);
            }
            else if(formStore.formData[name].isRequired === true && formStore.formData[name].value.length === 0){
                formStore.addErrorField(name,"Please fill this field Correctly");
            }
            else if (formStore.formData[name].isRequired ) {
                formStore.addErrorField(name, "");
            }
        }
    }

    function handleSubmit() {

        const formData = formStore.formData;
        let newData = {} as Record<keyof TCustomProductFormProps, any> | null;
        let errorDetected = false;

        Object.keys(formData).forEach((key) => {
            if (newData) newData[key] = formData[key].value;
            if (formData[key].isRequired === true && formData[key].value === "") {
                newData = null;
                return;
            }
        });

        Object.keys(formData).forEach((key) => {
            if (!!formData[key].error) {
                errorDetected = true;
                return;
            }
        });

        if (!errorDetected && newData !== null && Object.keys(newData).length > 1) {
            const customProductIdBeforeRefresh = SessionStorageGetter('customId')

            if (customProductIdBeforeRefresh) {
                formStore.updateCustomId(+customProductIdBeforeRefresh + 1);
            } else {
                formStore.updateCustomId(formStore.customId + 1);
            }

            newData["id"] = formStore.customId;
            newData["images"] = [];
            newData["rating"] = 4.5;
            newData["customProduct"] = true;
            newData["quantity"] = 0;
            console.log(newData);
            if (formStore.customFormStore.data) {
                formStore.customFormStore.setData([...formStore.customFormStore.data, newData]);
                formStore.updateSuccessMessage("Form Submitted Successfully");
                setTimeout(() => formStore.updateSuccessMessage(""), 4000)
                SessionStorageSetter('customProducts', formStore.customFormStore.data)
                formStore.resetFormData();
            } else {
                formStore.customFormStore.setData([newData]);
                SessionStorageSetter('customProducts', formStore.customFormStore.data);
            }

        } else {
            Object.keys(formData).forEach((key) => Validation(key));
            formStore.updateErrorMessage("Fill all the required fields before submitting")
        }
    }

    return (
        <div className="form-container">
            <div className={"form-header"}>
                <h2 className="form-header-text">Add a Custom Product</h2>
                <button onClick={() => routerStore.goTo('customProduct')}>View Custom Products</button>
            </div>

            <form className="product-form" onSubmit={handleSubmit}>
                <NameField
                    name={"title"}
                    label={"Enter Your Product Name"}
                />
                <RadioField
                    name={"category"}
                    label={"Select Your Product Category"}
                    boxValues={["SmartPhone", "Laptop", "Watch"]}
                />

                <NumberField
                    name={"price"}
                    label={"Enter Price of Your Product"}
                />
                <NumberField
                    name={"discountPercentage"}
                    label={"Enter Discount Percentage"}
                />
                <NumberField
                    name={"total"}
                    label={"Enter Total Quantity"}
                />
                <MessageField name={"description"} label={"Description"}/>
                {formStore.errorMessage !== "" &&
                    <p className={"text-danger"}>{formStore.errorMessage}</p>}

                <button
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();

                    }}
                >
                    Submit
                </button>
                {formStore.successMessage && <div className="success-message">{formStore.successMessage}</div>}
            </form>
        </div>
    );
})
