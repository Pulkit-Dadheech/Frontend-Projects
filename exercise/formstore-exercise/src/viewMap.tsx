import {ContactForm} from "./components/ContactForm";
import {RegisterForm} from "./components/RegisterForm";
import {NotFoundPage} from "./components/NotFoundPage";


export const viewMap = {
    register: <RegisterForm/>,
    contact: <ContactForm/>,
    notFound: <NotFoundPage/>
};