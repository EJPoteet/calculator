let firstNum = 0;
let secondNum = 0;
let operator = '';
let updateFirstNum = false;
let updateSecondNum = false;
let addDecimalToFirstNum = false;
let addDecimalToSecondNum = false;
let disabledDecimal = false;
let equationFinished = false;
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

function updateNum(newValue, whichOperand) {
    if (whichOperand === 1) {
        if (addDecimalToFirstNum) {
            firstNum = Number(`${firstNum}.${newValue}`);
            updateFirstNum = true;
            addDecimalToFirstNum = false;
        } else {
            firstNum = Number(`${firstNum}${newValue}`);
            updateFirstNum = true;
            return;
        }
    } else if (whichOperand === 2) {
        if (addDecimalToSecondNum) {
            secondNum = Number(`${secondNum}.${newValue}`);
            updateSecondNum = true;
            addDecimalToSecondNum = false;
        } else {
            secondNum = Number(`${secondNum}${newValue}`);
            updateSecondNum = true;
            return;
        }
    }
}

function clearValues() {
    firstNum = 0;
    secondNum = 0;
    operator = '';
    updateFirstNum = false;
    updateSecondNum = false;
    equationFinished = false;
    addDecimalToFirstNum = false;
    addDecimalToSecondNum = false;
    disabledDecimal = false;
    resultsDisplay.textContent = '0';
}

function checkForDecimal(num) {
    return Number.isInteger(num) ? num : num.toFixed(2);
}

buttons.forEach(button => {
    const buttonValue = button.textContent;

    if (nums.includes(buttonValue)) {
        button.addEventListener('click', () => {
            if (!operator && !equationFinished) {
                updateNum(buttonValue, 1);
                resultsDisplay.textContent = `${firstNum}`;
                console.log(disabledDecimal);

            } else if (!operator && equationFinished) {
                equationFinished = false;
                firstNum = 0;
                updateNum(buttonValue, 1);
                resultsDisplay.textContent = `${firstNum}`;
                console.log(disabledDecimal);

            } else if (operator) {
                updateNum(buttonValue, 2);
                resultsDisplay.textContent = `${firstNum} ${operator} ${secondNum}`;
                console.log(disabledDecimal);
            }
        })

    } else if (operators.includes(buttonValue)) {
        button.addEventListener('click', () => {
            if (updateFirstNum && !updateSecondNum) {
                operator = buttonValue;
                resultsDisplay.textContent = `${firstNum} ${operator}`;
                disabledDecimal = false;
                console.log(disabledDecimal);

            } else if (updateSecondNum && !(operator === '/' && secondNum === 0)) {
                firstNum = checkForDecimal(calculate(firstNum, secondNum, operator));
                operator = buttonValue
                resultsDisplay.textContent = `${firstNum} ${operator}`;
                secondNum = 0;
                updateSecondNum = false;
                disabledDecimal = false;
                console.log(disabledDecimal);
            }
        })

    } else if (buttonValue === '=') {
        button.addEventListener('click', () => {
            if (operator === '/' && secondNum === 0) {
                resultsDisplay.textContent = 'Rude! Stop that.';
            } else if (operator && updateSecondNum) {
                firstNum = checkForDecimal(calculate(firstNum, secondNum, operator));
                resultsDisplay.textContent = `${firstNum}`;
                equationFinished = true;
                operator = '';
                secondNum = 0;
                updateSecondNum = false;
                console.log(disabledDecimal);
            }
        })

    } else if (buttonValue === 'Clear') {
        button.addEventListener('click', () => {
            clearValues();
        })
    }

    else if (buttonValue === '.') {
        button.addEventListener('click', () => {
            if (equationFinished && !operator) {
                resultsDisplay.textContent = '0.';
                addDecimalToFirstNum = true;
                disabledDecimal = true;
                console.log(disabledDecimal);
            } else if (!disabledDecimal && !operator) {
                resultsDisplay.textContent = `${firstNum}.`;
                addDecimalToFirstNum = true;
                disabledDecimal = true;
                console.log(disabledDecimal);
            } else if (!disabledDecimal && operator) {
                resultsDisplay.textContent = `${firstNum} ${operator} ${secondNum}.`;
                addDecimalToSecondNum = true;
                disabledDecimal = true;
                console.log(disabledDecimal);
            }
        })
    }
})