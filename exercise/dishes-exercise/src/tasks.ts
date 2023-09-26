import {ingredients,Dish,fetchDishes, fetchIngredients} from "./dishes";

interface creatableDishesIngredients {
    "name": string,
    "ingredients": ingredients,
    "score"?: number,
    "time"?: number
}

async function retrieveDishesData(): Promise<void> {
    try {
        const dishDatas: Dish[] = await fetchDishes();
        const ingredientData: ingredients = await fetchIngredients();
        let createDishes: string[] = [];
        let createDishesIngredients: creatableDishesIngredients[] = [];

        createDishes = dishDatas.filter((dishData) => canCreateDish(dishData.ingredients, ingredientData))
            .map((dishData: Dish) => dishData.name);

        createDishesIngredients = dishDatas.filter((dishData: creatableDishesIngredients) => canCreateDish(dishData.ingredients, ingredientData))
            .map((dishData: creatableDishesIngredients) => ({
                name: dishData.name,
                ingredients: dishData.ingredients,
                time: dishData.time
            }));

        console.log("Creatable Dishes are:");
        console.log(createDishes);

        const ingredientsLists: ingredients[] = createDishesIngredients.map((createDishesIngredient: creatableDishesIngredients) => createDishesIngredient.ingredients);

        //Task2
        findTopDishes(ingredientsLists, createDishesIngredients);
        //Task3
        // const totalIngredientsRequired :ingredients=
        totalAmountOfIngredientsRequired(ingredientsLists);
        // console.log(totalIngredientsRequired);
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

function findTopDishes(ingredientsLists: ingredients[], createDishesIngredients: creatableDishesIngredients[]) {

    const dishIngredientsWithScores: creatableDishesIngredients[] = createDishesIngredients.map((createDishesIngredient: creatableDishesIngredients, index: number) => {
        const score = Object.values(ingredientsLists[index]).reduce((acc, val) => acc + val, 0);
        return {...createDishesIngredient, score};
    });

    dishIngredientsWithScores.sort((a: any, b: any) => a.score - b.score || a.time - b.time);
    const topThreeDishes: creatableDishesIngredients[] = dishIngredientsWithScores.slice(0, 3);
    console.log(topThreeDishes);

}

function totalAmountOfIngredientsRequired(ingredientsLists: ingredients[]) {
    const totalRequiredAmounts: ingredients = ingredientsLists.reduce((acc, value): ingredients => {
        Object.keys(value).forEach((ele) => {
            acc[ele] = (acc[ele] || 0) + value[ele];
        });
        return acc;
    }, {});

    const result = Object.entries(totalRequiredAmounts).map(([name, value]) => ({name, value}));

    console.log(result);
    // return totalRequiredAmounts;
}

retrieveDishesData()