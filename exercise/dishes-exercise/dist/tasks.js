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
        const dishDatas = await (0, dishes_1.fetchDishes)();
        const ingredientData = await (0, dishes_1.fetchIngredients)();
        let createDishes = [];
        let createDishesIngredients = [];
        createDishes = dishDatas.filter((dishData) => canCreateDish(dishData.ingredients, ingredientData))
            .map((dishData) => dishData.name);
        createDishesIngredients = dishDatas.filter((dishData) => canCreateDish(dishData.ingredients, ingredientData))
            .map((dishData) => ({ name: dishData.name, ingredients: dishData.ingredients, time: dishData.time }));
        console.log("Creatable Dishes are:");
        console.log(createDishes);
        const ingredientsLists = createDishesIngredients.map((createDishesIngredient) => createDishesIngredient.ingredients);
        //Task2
        findTopDishes(ingredientsLists, createDishesIngredients);
        //Task3
        // const totalIngredientsRequired :ingredients=
        totalAmountOfIngredientsRequired(ingredientsLists);
        // console.log(totalIngredientsRequired);
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
function findTopDishes(ingredientsLists, createDishesIngredients) {
    // const scores :number[]=ingredientsLists.map((ingredientsList:ingredients)=>{
    //     return Object.values(ingredientsList).reduce((acc:number,val):number=>{
    //         return acc+val;
    //     },0);
    // }):
    const dishIngredientsWithScores = createDishesIngredients.map((createDishesIngredient, index) => {
        const score = Object.values(ingredientsLists[index]).reduce((acc, val) => acc + val, 0);
        return Object.assign(Object.assign({}, createDishesIngredient), { score });
    });
    dishIngredientsWithScores.sort((a, b) => a.score - b.score || a.time - b.time);
    const topThreeDishes = dishIngredientsWithScores.slice(0, 3);
    console.log(topThreeDishes);
}
function totalAmountOfIngredientsRequired(ingredientsLists) {
    const totalRequiredAmounts = ingredientsLists.reduce((acc, value) => {
        Object.keys(value).forEach((ele) => {
            acc[ele] = (acc[ele] || 0) + value[ele];
        });
        return acc;
    }, {});
    const result = Object.entries(totalRequiredAmounts).map(([name, value]) => ({ name, value }));
    console.log(result);
    return totalRequiredAmounts;
}
retrieveDishesData();
