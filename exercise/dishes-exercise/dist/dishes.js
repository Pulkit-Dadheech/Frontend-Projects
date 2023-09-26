"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchIngredients = exports.fetchDishes = void 0;
const getHeader = () => {
    return new Headers({
        'Content-Type': 'application/json',
    });
};
const fetchDishes = async () => {
    let dishData = [];
    try {
        const response = await fetch(`https://dishes-api-production.up.railway.app/api/dishes`, {
            method: 'GET',
            headers: getHeader()
        });
        dishData = await response.json();
    }
    catch (err) {
        console.log('Error while retreiving dishes');
    }
    return dishData;
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
