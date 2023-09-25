let numbersToConvert=[];
let romanNumeralsArray=[];


document.getElementById("button").onclick=function (){

    numbersToConvert.push(document.getElementById("convertButton").value);
    romanNumeralsArray.push( convertToRomanNumerals(numbersToConvert));
    console.log(romanNumeralsArray);

    const tbody = document.getElementById('romanNumeralsTableBody');
    for(let i=0;i<romanNumeralsArray.length;i++){
        const tr = tableElements(numbersToConvert[i],romanNumeralsArray[i]);
        tbody.appendChild(tr);
    }
}

function tableElements(numbersToConvert,romanNumbersArray){
    const tr = document.createElement('tr');

    const tdFromUser = document.createElement('td');
    const fromUserText = document.createTextNode(numbersToConvert);
    tdFromUser.appendChild(fromUserText);
    tr.appendChild(tdFromUser);

    const tdToUser = document.createElement('td');
    const toUserText = document.createTextNode(romanNumbersArray);
    tdToUser.appendChild(toUserText);
    tr.appendChild(tdToUser);

    return tr;
}


