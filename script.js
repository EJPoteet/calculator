let firstNum = 0;
let secondNum = 0;
let operator = '';
const buttons = document.querySelectorAll('.button');
const resultsDisplay = document.querySelector('#resultsDisplay');

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function calculate(firstNum, secondNum, operator) {
    switch (operator) {
        case '+':
            return add(firstNum, secondNum);
        case '-':
            return subtract(firstNum, secondNum);
        case 'x':
            return multiply(firstNum, secondNum);
        case '/':
            return divide(firstNum, secondNum);
    }
}

function updateNum(newValue, whichOperand) {
    if (whichOperand === 1) {
        firstNum = Number(`${firstNum}${newValue}`);
        resultsDisplay.textContent = `${firstNum}`;
        return;
    } else if (whichOperand === 2) {
        secondNum = Number(`${secondNum}${newValue}`);
        resultsDisplay.textContent = `${secondNum}`;
        return;
    }
}

buttons.forEach(button => {
    const buttonValue = button.textContent;
    button.addEventListener('click', () => {
        //update this logic to later to call update functions
        firstNum = buttonValue;
        console.log(firstNum);
    })
})