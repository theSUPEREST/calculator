function add(a, b) { return (a + b); }

function subtract(a, b) { return (a - b); }

function multiply(a, b) { return (a * b); }

function divide(a, b) { return (a / b); }

function operate(operator, a, b) {
    return operator(a, b);
}

let display = document.getElementById('screen');
let input;
let inputArray = [];
let displayedNumber = [];

/* Numpad */

function getInput(event) { return input = event.target.id; };
function deleteInput () { 
    inputArray.pop() 
    displayedNumber = inputArray.join('');
    return display.textContent = displayedNumber;
}

function displayInput(event) {
    getInput(event)
    if (input === 'del') { return deleteInput() }
    // if input is 0-9 and 0 is the only displayed input, replace displayed number with new number
    if (input >= 0 && inputArray[0] == 0 && inputArray.length === 1) {inputArray.pop()} 
    if (event.target.id == '.' && inputArray.includes('.')) {return}  // do not allow more than one '.'
    inputArray.push(input);
    displayedNumber = inputArray.join('');
    return display.textContent = displayedNumber;
}

function displayNumpad(item) {
    item.addEventListener('click', displayInput )
};

const numpad = document.querySelectorAll('.numpad > button');
numpad.forEach(displayNumpad);

/* Functions */
let workingNumbers = [];
let operator;

function selectOperator(event) {
    if (event.target.id === 'add') { operator = add; }
    if (event.target.id === 'subtract') { operator = subtract; }
    if (event.target.id === 'multiply') { operator = multiply; }
    if (event.target.id === 'divide') { operator = divide; }
}

function runFunction(event) {
    if (inputArray.length === 0) {return}
    if (workingNumbers.length >= 1) {
        workingNumbers.push(Number(inputArray.join('')));
        inputArray.splice(0, inputArray.length);
        let ans = operate(operator, workingNumbers[0], workingNumbers[1]);
        workingNumbers.splice(0, workingNumbers.length);
        workingNumbers.push(ans);
        display.textContent = Math.round(ans * 100)/100;
        selectOperator(event);
    } else {  
        selectOperator(event)
        console.log(operator)  
        workingNumbers.push(Number(inputArray.join(''))); // push input array to working numbers array for operation
        inputArray.splice(0, inputArray.length);
    }
}

function addFunctionListener(item) {
    item.addEventListener('click', runFunction )
};

const functions = document.querySelectorAll('.funct-btns > button');
functions.forEach(addFunctionListener);

/* Sub-Functions */

// clear button

function clearAll() {
    workingNumbers.splice(0, workingNumbers.length);
    inputArray.splice(0, inputArray.length);
    display.textContent = "";
}

function changeSign() {
    let testChange = inputArray.join('');
    testChange *= -1;
    inputArray = testChange.toString().split('');
    displayedNumber = inputArray.join('');
    return display.textContent = displayedNumber;

}

function addSubfunctionListener(item) {
    item.addEventListener('click', (event) => {
        if (event.target.id === 'clear') {
            return clearAll();
        };
        if (event.target.id === 'plus-minus') {
            return changeSign();
        }
    })
};

const subfunctions = document.querySelectorAll('.subfunct-btns > button');
subfunctions.forEach(addSubfunctionListener);