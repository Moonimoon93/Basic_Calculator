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
//Simple Clear button with clearing temp and screen.
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
    temp = null;
    lastOperator = null;
    screen.innerHTML = 0;
})

//(2022-03-28 17:17) UPDATE!
//Basic funcitons are completed!!
//Now working on making calculator to disable all buttons EXCEPT clear button.
//I don't understand why document.querySelectorAll('.button').disabled = true doesn't work.
const operators = document.querySelectorAll('.operator');
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (temp === null) {
            temp = parseInt(screen.innerHTML);
        } else {
            switch (operator.value) {
                case '+':
                    temp += parseInt(screen.innerHTML);
                    screen.innerHTML = temp;
                    lastOperator = '+'
                    break;
                case '-':
                    temp -= parseInt(screen.innerHTML);
                    screen.innerHTML = temp;
                    lastOperator = '-'
                    break;
                case '*':
                    temp *= parseInt(screen.innerHTML);
                    screen.innerHTML = temp;
                    lastOperator = '*'
                    break;
                case '/':
                    temp /= parseInt(screen.innerHTML);
                    screen.innerHTML = temp;
                    lastOperator = '/'
                    break;
                case '=':
                    switch (lastOperator) {
                        case '+':
                            temp += parseInt(screen.innerHTML);
                            screen.innerHTML = temp;
                            break;
                        case '-':
                            temp -= parseInt(screen.innerHTML);
                            screen.innerHTML = temp;
                            break;
                        case '*':
                            temp *= parseInt(screen.innerHTML);
                            screen.innerHTML = temp;
                            break;
                        case '/':
                            temp /= parseInt(screen.innerHTML);
                            screen.innerHTML = temp;
                            break;
                    }
                    screen.innerHTML = temp;
                    break;
                default:
                    alert("Numbers need to be inserted beforehand.");
            }
        }
    })
});



//Going to add an event listener on equalButton
const equalButton = document.querySelector('#equal');


//Concept 2
//1. Operators will be invoked behind the scence as user press operator button.
//This concept has a critical problem, if user press '+' and '*' later
//proper order of operation will be ruined.