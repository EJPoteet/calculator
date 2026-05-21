let firstNum = 0;
let secondNum = 0;
let operator = '';
let updateFirstNum = false;
let updateSecondNum = false;
const operators = ['x', '/', '-', '+']
const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
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

//consider separating out the logic that updates the display to another function
function updateNum(newValue, whichOperand) {
    if (whichOperand === 1) {
        firstNum = Number(`${firstNum}${newValue}`);
        resultsDisplay.textContent = `${firstNum}`;
        updateFirstNum = true;
        return;
    } else if (whichOperand === 2) {
        secondNum = Number(`${secondNum}${newValue}`);
        updateSecondNum = true;
        return;
    }
}

buttons.forEach(button => {
    const buttonValue = button.textContent;

    button.addEventListener('click', () => {
        if (!operator && nums.includes(buttonValue)) {
            updateNum(buttonValue, 1);
        } else if (updateFirstNum && !updateSecondNum && operators.includes(buttonValue)) {
            operator = buttonValue;
            resultsDisplay.textContent = `${firstNum} ${operator}`;
        } else if (updateSecondNum && operators.includes(buttonValue)) {
            firstNum = calculate(firstNum, secondNum, operator);
            operator = buttonValue
            resultsDisplay.textContent = `${firstNum} ${operator}`;
            secondNum = 0;
            updateSecondNum = false;
        } else if (operator && nums.includes(buttonValue)) {
            updateNum(buttonValue, 2);
            resultsDisplay.textContent = `${firstNum} ${operator} ${secondNum}`;
        } else if (operator && buttonValue === '=') {
            firstNum = calculate(firstNum, secondNum, operator);
            resultsDisplay.textContent = `${firstNum}`;
            operator = '';
            secondNum = 0;
            updateSecondNum = false;
        } else if (buttonValue === 'Clear') {
            firstNum = 0;
            secondNum = 0;
            operator = '';
            updateFirstNum = false;
            updateSecondNum = false;
            resultsDisplay.textContent = '0';
        }
    })
})