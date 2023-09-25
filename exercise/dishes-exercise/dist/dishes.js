"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchIngredients = exports.fetchDishes = void 0;
// import 'es6-promise/auto';
const getHeader = () => {
    return new Headers({
        'Content-Type': 'application/json', // Specify the content type as JSON
    });
};
const fetchDishes = async () => {
    try {
        const response = await fetch(`https://dishes-api-production.up.railway.app/api/dishes`, {
            method: 'GET',
            headers: getHeader()
        });
        const dishData = await response.json();
        return dishData;
    }
    catch (err) {
        console.log('Error while retreiving dishes');
    }
};
exports.fetchDishes = fetchDishes;
// const newData=fetchDishes();
// console.log(newData);
const fetchIngredients = async () => {
    try {
        const response = await fetch(`https://dishes-api-production.up.railway.app/api/ingredients`, {
            method: 'GET',
            headers: getHeader()
        });
        const ingredientData = await response.json();
        return ingredientData;
    }
    catch (err) {
        console.log('Error while retreiving ingredients');
    }
};
exports.fetchIngredients = fetchIngredients;
// async function dishesFetch():Promise<void> {
//     try {
//         const {
//             dishesId,
//             dishesName,
//             dishesIngredients :Object,
//             dishesTime :number
//         } = await fetchDishes();
//         let totalAvailableIngredients = await fetchIngredients();
//         console.log(allDishes);
//         console.log(totalAvailableIngredients);
//     } catch (error) {
//         console.error('An error occurred:', error);
//     }
// }
