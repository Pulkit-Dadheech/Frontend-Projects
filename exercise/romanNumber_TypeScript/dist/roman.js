"use strict";
const romanNumerals = {
    'M': 1000,
    'D': 500,
    'C': 100,
    'L': 50,
    'X': 10,
    'V': 5,
    'I': 1
};
function intToRoman(num) {
    let romanNumber = "";
    const romanKeys = Object.keys(romanNumerals);
    for (const romanSymbol of romanKeys) {
        while (num >= romanNumerals[romanSymbol]) {
            const numString = num.toString();
            const firstDigit = parseInt(numString.charAt(0));
            const length = numString.length;
            if ((firstDigit === 4 || firstDigit === 9) && length < 4) {
                const currentIndex = romanKeys.findIndex(symbol => symbol === romanSymbol);
                if (firstDigit === 4) {
                    romanNumber += romanKeys[currentIndex] + romanKeys[currentIndex - 1];
                }
                else {
                    romanNumber += romanKeys[currentIndex + 1] + romanKeys[currentIndex - 1];
                }
                num -= (firstDigit * Math.pow(10, (length - 1)));
            }
            else {
                romanNumber += romanSymbol;
                num -= romanNumerals[romanSymbol];
            }
        }
    }
    return romanNumber;
}
function convertToRomanNumerals(numArray) {
    const romanArray = [];
    numArray.forEach((number) => {
        romanArray.push(intToRoman(number));
    });
    return romanArray;
}
