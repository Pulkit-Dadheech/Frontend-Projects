const getHeader = () => {
    return new Headers({
        'Content-Type': 'application/json',
    });
}
export type ingredients = Record<string, number>;
export type Dish={
    "id": number,
    "name": string,
    "ingredients": ingredients,
    "time": number
}
export const fetchDishes = async () :Promise<Dish[]>=> {

    let dishData:Dish[]=[];
    try {
        const response = await fetch(`https://dishes-api-production.up.railway.app/api/dishes`, {
            method: 'GET',
            headers: getHeader()
        })

        dishData = await response.json();
    } catch (err) {
        console.log('Error while retreiving dishes');

    }
    return dishData;
}
// const newData=fetchDishes();
// console.log(newData);

export const fetchIngredients = async (): Promise<any> => {
    let ingredientData:ingredients[]=[];
    try {
        const response = await fetch(`https://dishes-api-production.up.railway.app/api/ingredients`, {
            method: 'GET',
            headers: getHeader()
        })
        ingredientData = await response.json();

    } catch (err) {
        console.log('Error while retreiving ingredients');
    }
    return ingredientData;
}
