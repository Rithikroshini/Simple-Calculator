const result = document.getElementById("result");
const expression = document.getElementById("expression");

let current = "";
let previous = "";
let operator = null;
let justCalculated = false;



function updateDisplay() {
    result.textContent = current || "0";

    if (previous && operator) {
        expression.textContent =
            `${previous} ${displayOperator(operator)}`;
    } else {
        expression.textContent = "";
    }
}


// Display operator symbols
function displayOperator(op) {
    const symbols = {
        "*": "×",
        "/": "÷",
        "-": "−",
        "+": "+"
    };

    return symbols[op] || op;
}



function inputNumber(value) {

    if (justCalculated) {
        current = "";
        justCalculated = false;
    }

    
    if (value === "." && current.includes(".")) {
        return;
    }

    
    if (value === "." && current === "") {
        current = "0";
    }


    if (current === "0" && value !== ".") {
        current = "";
    }

    current += value;

    updateDisplay();
}



function chooseOperator(op) {

    
    if (op === "%") {

        if (!current) {
            return;
        }

        current = String(Number(current) / 100);

        updateDisplay();

        return;
    }


    if (!current && !previous) {
        return;
    }


    
    if (current && previous && operator) {
        calculate();
    }


    previous = current || previous;
    current = "";
    operator = op;
    justCalculated = false;

    updateDisplay();
}



function calculate() {

    if (!previous || !current || !operator) {
        return;
    }

    const number1 = Number(previous);
    const number2 = Number(current);

    let answer;


    switch (operator) {

        case "+":
            answer = number1 + number2;
            break;

        case "-":
            answer = number1 - number2;
            break;

        case "*":
            answer = number1 * number2;
            break;

        case "/":

            if (number2 === 0) {
                result.textContent = "Cannot divide by 0";

                previous = "";
                current = "";
                operator = null;

                return;
            }

            answer = number1 / number2;
            break;
    }


    
    answer = Number(answer.toFixed(10));


    expression.textContent =
        `${previous} ${displayOperator(operator)} ${current} =`;

    result.textContent = answer;


    current = String(answer);
    previous = "";
    operator = null;
    justCalculated = true;
}



function clearAll() {

    current = "";
    previous = "";
    operator = null;
    justCalculated = false;

    updateDisplay();
}



function deleteLast() {

    if (justCalculated) {
        clearAll();
        return;
    }

    current = current.slice(0, -1);

    updateDisplay();
}



document.querySelectorAll("[data-value]").forEach(button => {

    button.addEventListener("click", () => {

        const value = button.dataset.value;

        if ("0123456789.".includes(value)) {
            inputNumber(value);
        } else {
            chooseOperator(value);
        }

    });

});



document.getElementById("clear")
    .addEventListener("click", clearAll);



document.getElementById("delete")
    .addEventListener("click", deleteLast);



document.getElementById("equal")
    .addEventListener("click", calculate);



document.addEventListener("keydown", event => {

    const key = event.key;


    if ("0123456789.".includes(key)) {
        inputNumber(key);
    }

    else if (["+", "-", "*", "/"].includes(key)) {
        chooseOperator(key);
    }

    else if (key === "%") {
        chooseOperator("%");
    }

    else if (key === "Enter" || key === "=") {
        calculate();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

    else if (key === "Escape" || key.toLowerCase() === "c") {
        clearAll();
    }

});