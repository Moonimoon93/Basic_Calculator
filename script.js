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

const numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (screen.innerText === '0') {
            screen.innerHTML = number.value
        } else {
            screen.insertAdjacentHTML("beforeend", number.value)
        }
    })
});