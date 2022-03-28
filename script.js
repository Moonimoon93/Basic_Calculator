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

const operate = (operator, num1, num2) => {
    return operator(num1, num2);
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
const operators = document.querySelectorAll('.operator');
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        screen.insertAdjacentHTML("beforeend", operator.value)
    })
})

//Concept 2
//1. Operators will be invoked behind the scence as user press operator button.
//This concept has a critical problem, if user press '+' and '*' later
//proper order of operation will be ruined.