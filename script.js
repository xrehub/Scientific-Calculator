/* 
    1. Uzyskać dostęp do całego kalkulatora w tym: przyciski operacyjne, czyszące, równości jak i numery.
    2. Nadać event dla danych przycisków.
    3. Zablokować dostęp do wielokrotonego użytku znaku kropki.
    4. Nadać error przy nietypowych/błednych obiiczeniach.
*/
const numberEl = document.querySelectorAll(".number");
const operatorEl = document.querySelectorAll(".operator-btn");
const clearEl = document.querySelector(".clear-btn");
const deleteEl = document.querySelector(".delete-btn");
const equalEl = document.querySelector(".equal-btn");
const before = document.querySelector(".before-result");
const current = document.querySelector(".current-result");

let currentResult = " ";
let beforeResult = " ";
let operation = undefined;

const calculate = () =>{
    let action 
    if (!beforeResult || !currentResult) return
    const previous = parseFloat(beforeResult);
    const current2 = parseFloat(currentResult);

    if(isNaN(previous) || isNaN(current2)){
        return
    }

    switch (operation) {
        case '+':
            action = previous + current2
            break;
        case '-':
            action = previous - current2
            break;
        case '&times;':
            action = previous * current2
            break;
        case '÷':
            if(current2 === 0){
                clearResult();
                return alert('We dont divide by zero :)');
            }
            action = previous / current2    
            break;
        case '√':
            action = Math.pow(previous, 1 / current2)   
            break;
        case '%':
            action = previous / 100 + current2   
            break;
        case '^':
            action = Math.pow(previous, current2)    
            break;
        case 'log':
            action = Math.log(previous/Math.log(current2))
            break;
        default:
            return        
    }
    currentResult = action;
    operation = undefined;
    beforeResult = ' ';
}

const chooseNumber = (operatorEl) => {
    if(currentResult === " ") {
        return
    }
    if(beforeResult !== " ") {
        const previous = beforeResult.innerText
        if (currentResult.toString() === '0' && before[before.length-1 === '÷']) {
            clearResult();
        }
        calculate();
    }
    operation = operatorEl;
    beforeResult = currentResult;
    currentResult = " ";
}
 
const updateResult = () => {
    current.innerText = currentResult;
    if(operation != null){
        before.innerText = beforeResult + operation;
    } else {
        beforeResult.innerText = " ";
    }
}

const AddNumber = (number) => {
    if(number === '•') {
        if(currentResult.includes('.')){
            return
        }
    number = ".";
}
    currentResult = currentResult.toString() + number.toString()
}

const clearResult = () => {
    currentResult = " ";
    beforeResult = " ";
    operation = undefined;
}

numberEl.forEach((number) => {
    number.addEventListener("click", () => {
        AddNumber(number.innerText)
        updateResult()
    })
});

const deleteNumber = () => {
    currentResult = currentResult.toString().slice(0, -1);
}

deleteEl.addEventListener('click', () => {
    deleteNumber();
    updateResult();
})

operatorEl.forEach((operatorEl) => {
    operatorEl.addEventListener('click', ()=>{
        chooseNumber(operatorEl.innerText)
        updateResult();
    })
})

equalEl.addEventListener('click', () => {
    calculate();
    updateResult();
})

clearEl.addEventListener('click', () => {
    clearResult();
    updateResult();
})