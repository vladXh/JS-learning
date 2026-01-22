
//////////////////////////////
// Project 1: Toggle button //
//////////////////////////////

let TestToggled = false;
document.getElementById("TestButton").addEventListener("click", function() {
    const circleDiv = document.getElementById("TestCircleDiv");
    
    if (!TestToggled) {
        circleDiv.style.backgroundColor = 'orangered';
        TestToggled = true;
    } else if (TestToggled) {
        circleDiv.style.backgroundColor = document.documentElement.style.getPropertyValue('--main-bg-color');
        TestToggled = false;
    }

});



///////////////////////////
// Project 2: Calculator //
///////////////////////////

// screen oveflow auto scroll 
const screen = document.getElementById("CalculatorScreen");
function updatescreen(value){
    screen.scrollLeft = screen.scrollWidth;
}

const buttonContainer = document.getElementById("CalculatorButtons");
let operators = [];
let numbers = [];
let hasDecimal = 0;

buttonContainer.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    const screen = document.getElementById("CalculatorScreen");
    const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    
    if (!btn || !buttonContainer.contains(btn)) return;

    // numbers and operators
    if (btn.dataset.value !== undefined) {
        console.log(btn.dataset.value);

        // operators
        if (btn.dataset.value === "+" || btn.dataset.value === "-" || btn.dataset.value === "*" || btn.dataset.value === "/") {
            console.log("Operator button clicked");
            hasDecimal = 0;

            var lsatChar = screen.value.slice(-1);
            if (lsatChar === "+" || lsatChar === "-" || lsatChar === "*" || lsatChar === "/") {
                screen.value = screen.value.slice(0, -1);
            }
        } else if (btn.dataset.value === ".") {
            hasDecimal++;
            console.log("Decimal TRUE");
            if (screen.value.slice(-1) === ".") {
                screen.value = screen.value.slice(0, -1);
            }
        }

        // numbers
        else {
            console.log("Number button clicked");
        }

        if (screen.value === "0" && btn.dataset.value !== ".") {
            screen.value = "";
        }
        screen.value += btn.dataset.value;
        updatescreen(btn.dataset.value);

        if (btn.dataset.value == "." && hasDecimal > 1) {
            console.log(hasDecimal);
            screen.value = screen.value.slice(0, -1);
            hasDecimal--;
        } else if (screen.value === "+" || screen.value === "*" || screen.value === "/") {
            screen.value = "0";
        }
    } 
    
    // actions
    else if (btn.dataset.action !== undefined) {
        console.log(btn.dataset.action);
        
        if (btn.dataset.action === "clear") {
            screen.value = "0";
            hasDecimal = false;
        } else if (btn.dataset.action === "delete" && screen.value !== "0") {
            if (screen.value.slice(-1) === ".") {
                hasDecimal = false;
            }
            if (screen.value.length === 1) {
                screen.value = "0";
                return;
            }
            screen.value = screen.value.slice(0, -1);

        } else if (btn.dataset.action === "calculate") {
            console.log("Calculating result...");
            screen.value = eval(screen.value);
            hasDecimal = false;
            operators = [];
            numbers = [];
        }
    }
});



//////////////////////
// Dark Mode Toggle //
//////////////////////

const darkModeBtn = document.getElementById("darkModeToggle");
let darkModeToggle = true;
darkModeBtn.addEventListener("click", () => {
    // document.getElementById("DarkModeOn").style.display = "none";
    // document.getElementById("DarkModeOff").style.display = "block";    
    if (!darkModeToggle) {
        darkModeToggle = true;
        document.getElementById("DarkModeOn").style.display = "block";
        document.getElementById("DarkModeOff").style.display = "none";

        if (!TestToggled){
            document.getElementById("TestCircleDiv").style.backgroundColor = "rgb(0, 0, 0)";
        }

        document.documentElement.style.setProperty("--main-bg-color", "rgb(0, 0, 0)");
        document.documentElement.style.setProperty("--main-text-color", "rgb(255,255,255)");
        document.documentElement.style.setProperty("--secondary-color", "rgba(255, 255, 255, 1)");
        document.documentElement.style.setProperty("--alt-text-color", "rgba(0, 0, 0, 1)");
        document.documentElement.style.setProperty("--main-hover-color", "rgba(21, 21, 21, 0.1)");
    } else {
        darkModeToggle = false;
        document.getElementById("DarkModeOn").style.display = "none";
        document.getElementById("DarkModeOff").style.display = "block";

        if (!TestToggled){
            document.getElementById("TestCircleDiv").style.backgroundColor = "rgba(255, 255, 255, 1)";
        }
        
        document.documentElement.style.setProperty("--main-bg-color", "rgba(255, 255, 255, 1)");
        document.documentElement.style.setProperty("--main-text-color", "rgba(0, 0, 0, 1)");
        document.documentElement.style.setProperty("--secondary-color", "rgba(0, 0, 0, 1)");
        document.documentElement.style.setProperty("--alt-text-color", "rgba(255, 255, 255, 1)");
        document.documentElement.style.setProperty("--main-hover-color", "rgba(216, 216, 216, 0.1)");
    }
});


////////////////////////
// Project 3: Counter //
////////////////////////

const counterNr = document.getElementById("counterNr");
const counterBtns = document.getElementById("counterBtnContainer");
let counterValue = 0;

counterBtns.addEventListener("click", (e) => {
    const btn = e.target.closest("button");

    if (!btn || !counterBtns.contains(btn)) return;

    if (btn.dataset.action === "up") {
        counterValue++;
        console.log(counterValue);
    } else if (btn.dataset.action === "down" && counterValue > 0) {
        counterValue--;
        console.log(counterValue);
    }

    counterNr.textContent = counterValue.toString().padStart(4, '0');
});


////////////////////////////
// Project 4: Tic Tac Toe //
////////////////////////////

const ticTacBtnContainer = document.getElementById("ticTacContainer");
let ticTacX = [];
let ticTacO = [];
let TicTacToggle = false;
let ticTackGameEnded = false;

const winningCombinations = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"]
];

ticTacBtnContainer.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    
    if (!btn || !ticTacBtnContainer.contains(btn)) return;

    console.log(btn.dataset.value);
    
    if (btn.textContent === "" && !ticTackGameEnded) {
        let playerTurnChar;
        if (!TicTacToggle) {
            playerTurnChar = "x";
            ticTacX.push(btn.dataset.value);
            console.log(ticTacX);
        } else {
            playerTurnChar = "o";
            ticTacO.push(btn.dataset.value);
            console.log(ticTacO);
        }    

        // Check for win
        const nrWinningComb = winningCombinations.length;
        for (let i = 0; i < nrWinningComb; i++) {
            const combination = winningCombinations[i];
            if (!TicTacToggle) {
                if (combination.every(val => ticTacX.includes(val))) {
                    console.log("Player X Wins!");
                    ticTackGameEnded = true;
                }
            } else {
                if (combination.every(val => ticTacO.includes(val))) {
                    console.log("Player O Wins!");
                    ticTackGameEnded = true;
                }
            }
        }

        btn.textContent = playerTurnChar;
        TicTacToggle = !TicTacToggle;
    }
});

const ticTacResetBtn = document.getElementById("ticTacResetBtn");
ticTacResetBtn.addEventListener("click", () => {
    const ticTacButtons = document.querySelectorAll("#ticTacContainer button");
    ticTacButtons.forEach((button) => {
        button.textContent = "";
    });
    TicTacToggle = false;
    ticTacO = [];
    ticTacX = [];
});