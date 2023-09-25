// import 'es6-promise/auto';
const getHeader = () => {
    return new Headers({
        'Content-Type': 'application/json', // Specify the content type as JSON
    });
}
export const fetchDishes = async () :Promise<any>=> {
    try {
        const response = await fetch(`https://dishes-api-production.up.railway.app/api/dishes`, {
            method: 'GET',
            headers: getHeader()
        })

        const dishData = await response.json();
        return dishData;
    } catch (err) {
        console.log('Error while retreiving dishes');
    }
}
// const newData=fetchDishes();
// console.log(newData);

export const fetchIngredients = async (): Promise<any> => {
    try {
        const response = await fetch(`https://dishes-api-production.up.railway.app/api/ingredients`, {
            method: 'GET',
            headers: getHeader()
        })
        const ingredientData = await response.json();
         return ingredientData;
    } catch (err) {
        console.log('Error while retreiving ingredients');
    }
}
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