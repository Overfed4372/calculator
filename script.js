//Selecting numbers, digits and display buttons
const numbersButton = [...document.querySelectorAll(".number")];
const digitsButton = [...document.querySelectorAll(".digit")];
const displayRow1 = document.querySelector(".display .row1");
const displayRow2 = document.querySelector(".display .row2");
const clearButton = document.querySelector(".clear");
const digitEqual = document.querySelector(".digit-equal");
//Selecting the most outer div -> container
const container  = document.querySelector(".container");


//Adding the same event listener to both numbers and digits button for altering the display
numbersButton.forEach ( (element) => {
    element.addEventListener ('click' , (pressed) => {
        // let buttonValue = pressed.target.textContent;
        displayRow1.textContent += pressed.target.textContent;
    })
});
digitsButton.forEach ( (element) => {
    element.addEventListener ('click' , (pressed) => {
        let displayValue = displayRow1.textContent;
        let buttonValue = pressed.target.textContent;
        //Check if there is a number before the operand, then let the operand be inserted
        let opEval= new Operation ().stringEval(displayValue);
        //Check if button value is '.' , then see if there is not two of this character
        if (buttonValue === `C`) {
            if (opEval.length === 1 && opEval[0] !== '' ||
                opEval.length === 3 && opEval[2] !== '') {
                displayRow1.textContent = displayValue.slice(0,-1);
            } 
        } else if (buttonValue === '.') {
            if (opEval.length === 3 && opEval[1].search(/[+-/*]/) !== -1 && !opEval[2].includes('.') ) {
                displayRow1.textContent += buttonValue;
            } else if (opEval.length === 2 && opEval[1].search(/[+-/*]/) !== -1 && opEval[2] === undefined ) {
                displayRow1.textContent += `0${buttonValue}`;
            } 
            else if (opEval.length === 1 && !opEval[0].includes('.')) {
                displayRow1.textContent += `0${buttonValue}`;
            }
        } else {
            if (opEval[0] !== '' && opEval.length === 1) {
                displayRow1.textContent += " " + buttonValue + " ";
            } else if (opEval.length === 3 && parseInt(opEval[0]) !== NaN && 
            opEval[1].search(/[+-/*]/) !== -1 && parseInt(opEval[2]) !== NaN) {
                digitEqual.click();
                displayRow1.textContent += " " + buttonValue + " ";
            }
        } 
    })
});
clearButton.addEventListener ('click' , () => {
    displayRow1.textContent = "";
    displayRow2.textContent = "0";
});

// Click the equal button to do the calculation
digitEqual.addEventListener ('click' , () => {
    let operationStr = displayRow1.textContent;
    let calculation = new Operation().calculate(operationStr) ;
    if (calculation !== undefined) {
        displayRow2.textContent = displayRow1.textContent;
        displayRow1.textContent = calculation;
    }
});

//Keyboard functionality
document.addEventListener("keydown" , (event) => {
    let key = event.key;
    let allNumsAndDigits = document.querySelectorAll(".calculations button");
    let pressedButton;
    key = (key === "Enter") ? "=" : key ;
    function setOption(selectElement, value) {
        return [...selectElement].find((element) => {
            // console.log(option);
            if (element.value === value) return element;
        });
    }
    pressedButton = setOption(allNumsAndDigits , key);
    if (pressedButton) pressedButton.click();
});

//Calculation construct
function Operation () {
    this.add = function (n1 , n2) {
        return parseFloat( (n1 + n2).toFixed(6) );
    }
    this.substract = function (n1 , n2) {
        return parseFloat( (n1 - n2).toFixed(6) );
    }
    this.multiply = function (n1 , n2) {
        return parseFloat( (n1 * n2).toFixed(6) );
    }
    this.divide = function (n1 , n2) {
        return parseFloat ( (n1 / n2).toFixed(6) );
    }
    this.calculate = function (string) {
        let opArr , op , n1 , n2;
        opArr = this.stringEval(string);
        if (opArr.length == 3 && parseInt(opArr[0]) !== NaN && 
            opArr[1].search(/[+-/*]/) !== -1 && parseInt(opArr[2]) !== NaN) {
            n1 = +opArr[0]; op = opArr[1]; n2 = +opArr[2];
            return this.operators[op](n1 , n2);
        }
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
