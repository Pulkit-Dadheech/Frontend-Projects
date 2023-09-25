"use strict";
// 1. Find Dishes that are Creatable
// Given a list of available dishes and a list of available ingredients,
// you need to find and display the names of dishes that can be created using the available ingredients.
// A dish is creatable if all its required ingredients are available in sufficient quantities.
//
// import {fetchDishes,fetchIngredients} from "./dishes";
// import 'es6-promise/auto';
Object.defineProperty(exports, "__esModule", { value: true });
const dishes_1 = require("./dishes");
async function retrieveDishesData() {
    try {
        let dishData = await (0, dishes_1.fetchDishes)();
        let ingredientData = await (0, dishes_1.fetchIngredients)();
        let creatableDish = [];
        // console.log(dishData);
        for (let i = 0; i < dishData.length; i++) {
            if (canCreateDish(dishData[i].ingredients, ingredientData) === true) {
                creatableDish.push(dishData[i].name);
            }
        }
        // creatableDish.sort((dish1,dish2) => {
        //
        //     if (!dishA || !dishB || !dishC) {
        //         return 0;
        //     }
        console.log("Creatable Dishes:");
        console.log(creatableDish);
        //
        // }
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
}
function canCreateDish(dishIngredients, ingredientData) {
    for (const [ingredient, quantity] of Object.entries(dishIngredients)) {
        if (!(ingredient in ingredientData) || ingredientData[ingredient] < quantity) {
            return false; // Dish is not creatable
        }
    }
    return true; // Dish is creatable
}
retrieveDishesData();
