//Selecting numbers, digits and display buttons
const numbersButton = [...document.querySelectorAll(".number")];
const digitsButton = [...document.querySelectorAll(".digit")];
const displayContent = document.querySelector(".display");
const clearButton = document.querySelector(".clear");

//Adding the same event listener to both numbers and digits button for altering display 
numbersButton.concat(digitsButton).forEach ( (element) => {
    element.addEventListener ('click' , (pressed) => {
        displayContent.textContent += pressed.target.textContent;
    })
});
clearButton.addEventListener ('click' , () => {
    displayContent.textContent = "";
});