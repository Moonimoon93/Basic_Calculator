const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const divide = (a, b) => {
    return a / b;
}

const multiply = (a, b) => {
    return a * b;
}

const screen = document.querySelector('.screen');

//When digits are pressed, numbers will be added at the end.
//Except the beginning. 0 that is originally shown on screen will be replaced first.
//Then, numbers will be added at the end as digits are pressed.
const numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (screen.innerText === '0') {
            //Initially, replacing 0 with first number.
            screen.innerHTML = number.value
        } else if (parseInt(screen.innerHTML) == temp) {
            screen.innerHTML = number.value
        } else {
            //In order to put number at the end rather replacing what's on screen.
            screen.insertAdjacentHTML("beforeend", number.value)
        }
    })
});
//After user press '=' button, all buttons except 'CL' button will be disabled.
const disableExcept = () => {
    let buttons = document.querySelectorAll('.button')
    buttons.forEach(button => {
        button.classList.add('disabled');
    })
    clearButton.classList.remove('disabled');
}

//After user press 'CL', all of buttons will be functional again.
const enableAll = () => {
    let buttons = document.querySelectorAll('.button')
    buttons.forEach(button => {
        button.classList.remove('disabled');
    })
}

//Concept 1
//1. Numbers and operators will be shown on screen when user pressed buttons.
//2. When user press '=' button, there will be a logic to 
//  a. identify numbers and operator(s)
//  b. invoke appopriate operator(s)

//(2022-03-28 16:19) UPDATE.
//Instead of showing all of items(numbers and operator), when user press
//operator button screen will reset to 0.
//Number will store behind the scene.
//When user press operator, appropriate function will be invoked(behind the scene)
//User will press '=' button at the end of calculation.
let temp = null;
let lastOperator = null;
const memoryScreen = document.querySelector('.memory');
let memory = null;
//Simple Clear button with clearing temp and screen.
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
    temp = null;
    lastOperator = null;
    memory = null;
    screen.innerHTML = 0;
    memoryScreen.innerHTML = 0;
    enableAll();
})

//(2022-03-28 17:17) UPDATE!
//Basic funcitons are completed!!
//Now working on making calculator to disable all buttons EXCEPT clear button.
const operators = document.querySelectorAll('.operator');
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (temp === null) {
            temp = parseInt(screen.innerHTML);
            memory = temp;
            memoryScreen.innerHTML = memory;
            temp = 0;
            screen.innerHTML = temp;
            lastOperator = operator.value;
        } else {
            switch (lastOperator) {
                case '+':
                    if (screen.innerHTML === '0') {
                        alert("You haven't pressed any numbers yet.")
                        return;
                    }
                    memory += parseInt(screen.innerHTML);
                    memoryScreen.innerHTML = memory;
                    temp = 0;
                    screen.innerHTML = temp;
                    lastOperator = operator.value;
                    break;
                case '-':
                    if (screen.innerHTML === '0') {
                        alert("You haven't pressed any numbers yet.")
                        return;
                    }
                    memory -= parseInt(screen.innerHTML);
                    memoryScreen.innerHTML = memory;
                    temp = 0;
                    screen.innerHTML = temp;
                    lastOperator = operator.value;
                    break;
                case '*':
                    if (screen.innerHTML === '0') {
                        let confirmation = confirm("Do you really want to multiply 0?")
                        if (confirmation === false) {
                            return
                        }
                    }
                    memory *= parseInt(screen.innerHTML);
                    memoryScreen.innerHTML = memory;
                    temp = 0;
                    screen.innerHTML = temp;
                    lastOperator = operator.value;
                    break;
                case '/':
                    if (screen.innerHTML === '0') {
                        alert("YOU SHALL NOT DIVIDE ANYTHING BY 0!")
                        return;
                    }
                    memory /= parseInt(screen.innerHTML);
                    memory = memory.toFixed(2);
                    memoryScreen.innerHTML = memory;
                    temp = 0;
                    screen.innerHTML = temp;
                    lastOperator = operator.value;
                    break;
                default:
                    alert("Numbers need to be inserted beforehand.");
            }
        }
    })
});
//Going to add an event listener on equalButton
const equalButton = document.querySelector('#equal');
equalButton.addEventListener('click', () => {
    if (temp === null) {
        alert("Do you not know how to use calculator? Try again.");
        return;
    } else if (screen.innerHTML === '0') {
        alert("You haven't pressed any numbers yet")
        return;
    }
    switch (lastOperator) {
        case '+':
            memory += parseInt(screen.innerHTML);
            memoryScreen.innerHTML = memory;
            screen.innerHTML = temp;
            disableExcept();
            break;
        case '-':
            memory -= parseInt(screen.innerHTML);
            memoryScreen.innerHTML = memory;
            screen.innerHTML = temp;
            disableExcept();
            break;
        case '*':
            memory *= parseInt(screen.innerHTML);
            memoryScreen.innerHTML = memory;
            screen.innerHTML = temp;
            disableExcept();
            break;
        case '/':
            memory /= parseInt(screen.innerHTML);
            memory = memory.toFixed(2);
            memoryScreen.innerHTML = memory;
            screen.innerHTML = temp;
            disableExcept();
            break;
    }
});


//Concept 2
//1. Operators will be invoked behind the scence as user press operator button.
//This concept has a critical problem, if user press '+' and '*' later
//proper order of operation will be ruined.