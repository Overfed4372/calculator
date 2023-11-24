//Selecting numbers, digits and display buttons
const numbersButton = [...document.querySelectorAll(".number")];
const digitsButton = [...document.querySelectorAll(".digit")];
const displayRow1 = document.querySelector(".display .row1");
const displayRow2 = document.querySelector(".display .row2");
// const displayValue = display.textContent;
const clearButton = document.querySelector(".clear");
const digitEqual = document.querySelector(".digit-equal");

//Adding the same event listener to both numbers and digits button for altering display 
numbersButton.concat(digitsButton).forEach ( (element) => {
    element.addEventListener ('click' , (pressed) => {
        let buttonValue = pressed.target.textContent;
        if (buttonValue.search(/[+-/*]/) !== -1) {
            displayRow1.textContent += " " + pressed.target.textContent + " ";
        } else {
            displayRow1.textContent += pressed.target.textContent;
        }
    })
});
clearButton.addEventListener ('click' , () => {
    displayRow1.textContent = "";
    displayRow2.textContent = "0";
});
digitEqual.addEventListener ('click' , () => {
    let calculation = new Operation () ;
    let operationStr = displayRow1.textContent;
    displayRow2.textContent = calculation.calculate(operationStr);
});

//Calculation construct
function Operation () {
    this.add = function (n1 , n2) {
        return n1 + n2;
    }
    this.substract = function (n1 , n2) {
        return n1 - n2;
    }
    this.multiply = function (n1 , n2) {
        return n1 * n2;
    }
    this.divide = function (n1 , n2) {
        return n1 / n2;
    }
    this.calculate = function (string) {
        let opArr , op , n1 , n2;
        opArr = this.stringEval(string); 
        n1 = +opArr[0]; op = opArr[1]; n2 = +opArr[2];
        return this.operators[op](n1 , n2);
    }
    this.stringEval = function (string) {
        return string.trimEnd().split (" ");
    }
    this.operators = {
        '+' : this.add , 
        '-' : this.substract , 
        '*' : this.multiply ,
        '/' : this.divide ,
    }
    
}
