"use strict";
const roman = {
    'M': 1000,
    'D': 500,
    'C': 100,
    'L': 50,
    'X': 10,
    'V': 5,
    'I': 1
};
function romans(num) {
    let romanNumber = "";
    const keys = Object.keys(roman);
    for (let i in roman) {
        while (num >= roman[i]) {
            const numString = num.toString();
            const firstCharNum = parseInt(numString.charAt(0));
            const length = (num.toString().length);
            if ((firstCharNum === 4 || firstCharNum === 9) && length < 4) {
                let index;
                index = keys.findIndex(r => r === i);
                if (firstCharNum === 4) {
                    console.log(index);
                    romanNumber += keys[index] + keys[index - 1];
                }
                else {
                    romanNumber += keys[index + 1] + keys[index - 1];
                }
                num -= (firstCharNum * Math.pow(10, (length - 1)));
            }
            else {
                romanNumber += i;
                num -= roman[i];
            }
        }
    }
    return romanNumber;
}
const romanToInt = (numArray) => {
    const romanArrayString = [];
    numArray.forEach((number) => {
        romanArrayString.push(romans(number));
    });
    return romanArrayString;
};
console.log(romanToInt([950, 456, 4, 9, 49, 69]));
