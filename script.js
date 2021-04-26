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

function getInput(event) { return input = event.target.id; };
function deleteInput () { 
    inputArray.pop() 
    combinedArray = inputArray.join('');
    return display.textContent = combinedArray;
}

function displayInput(event) {
    getInput(event)
    if (input === 'del') { return deleteInput() }
    // if input is 0-9 and 0 is the only displayed input, replace displayed number with new number
    if (input >= 0 && inputArray[0] == 0 && inputArray.length === 1) {inputArray.pop()} 
    if (event.target.id == '.' && inputArray.includes('.')) {return}  // do not allow more than one '.'
    inputArray.push(input);
    combinedArray = inputArray.join('');
    return display.textContent = combinedArray;
}

function displayNumpad(item) {
    item.addEventListener('click', displayInput )
};

const numpad = document.querySelectorAll('.numpad > button');
numpad.forEach(displayNumpad);