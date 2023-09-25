// 1. Find Dishes that are Creatable
// Given a list of available dishes and a list of available ingredients,
// you need to find and display the names of dishes that can be created using the available ingredients.
// A dish is creatable if all its required ingredients are available in sufficient quantities.
//
// import {fetchDishes,fetchIngredients} from "./dishes";
// import 'es6-promise/auto';


import {fetchDishes, fetchIngredients} from "./dishes";

type ingredients = Record<string, number>;
type Dish={
    "id": number,
    "name": string,
    "ingredients": ingredients,
    "time": number
}

async function retrieveDishesData(): Promise<void> {
    try {
        let dishData: Dish[]= await fetchDishes();
        let ingredientData: ingredients = await fetchIngredients();
        let creatableDish: Array<any> = [];

        for (let i = 0; i < dishData.length; i++) {
            if (canCreateDish(dishData[i].ingredients, ingredientData) === true) {
                creatableDish.push(dishData[i].name);
            }
        }
        console.log("Creatable Dishes:");
        console.log(creatableDish);
        // creatableDish.sort((dish1,dish2) => {
        //
        //     if (!dishA || !dishB || !dishC) {
        //         return 0;
        //     }
        //
        // }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function canCreateDish(dishIngredients: ingredients, ingredientData: ingredients): boolean {
    for (const [ingredient, quantity] of Object.entries(dishIngredients)) {
        if (!(ingredient in ingredientData) || ingredientData[ingredient] < quantity) {
            return false; // Dish is not creatable
        }
    }
    return true; // Dish is creatable
}


retrieveDishesData();