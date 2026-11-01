
// Get display element
const display = document.getElementById("display");

// Get all calculator buttons
const buttons = document.querySelectorAll("button");


// Add click event to every button
buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Get button value and action
        const value = button.dataset.value;
        const action = button.dataset.action;


        // AC: Clear everything
        if (action === "clear") {
            display.value = "0";
        }


        // DEL: Delete last character
        else if (action === "delete") {

            display.value = display.value.slice(0, -1);

            if (display.value === "" || display.value === "Error") {
                display.value = "0";
            }
        }


        // %: Convert the last number to percentage
        else if (action === "percent") {

            let expression = display.value;

            const match = expression.match(/(\d+\.?\d*|\.\d+)$/);

            if (match) {
                const number = Number(match[0]) / 100;

                display.value =
                    expression.slice(0, match.index) + number;
            }
        }


        // =: Calculate the result
        else if (action === "calculate") {

            try {

                const expression = display.value;

                // Allow only numbers and calculator operators
                if (!/^[0-9+\-*/. ]+$/.test(expression)) {
                    throw new Error("Invalid expression");
                }

                const result = eval(expression);

                if (!Number.isFinite(result)) {
                    throw new Error("Invalid calculation");
                }

                display.value = Number(result.toFixed(10)).toString();

            } catch (error) {

                display.value = "Error";

            }
        }


        // Numbers and mathematical operators
        else if (value !== undefined) {

            const operators = ["+", "-", "*", "/"];

            // If display shows Error, start a new calculation
            if (display.value === "Error") {
                display.value = "0";
            }

            // Handle decimal point
            if (value === ".") {

                const currentNumber = display.value.split(/[+\-*/]/).pop();

                if (currentNumber.includes(".")) {
                    return;
                }

                if (currentNumber === "") {
                    display.value += "0";
                }

                display.value += ".";

                return;
            }


            // Handle mathematical operators
            if (operators.includes(value)) {

                if (display.value === "0" && value !== "-") {
                    return;
                }

                // Replace the previous operator
                if (operators.includes(display.value.slice(-1))) {

                    display.value =
                        display.value.slice(0, -1) + value;

                } else {

                    display.value += value;

                }

                return;
            }


            // Handle numbers
            if (display.value === "0") {
                display.value = value;
            } else {
                display.value += value;
            }

        }

    });

});
