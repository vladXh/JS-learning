
//////////////////////////////
// Project 1: Toggle button //
//////////////////////////////

let toggled = false;
document.getElementById("TestButton").addEventListener("click", function() {
    const circleDiv = document.getElementById("TestCircleDiv");
    
    if (!toggled) {
        circleDiv.style.backgroundColor = 'orangered';
        toggled = true;
    } else if (toggled) {
        circleDiv.style.backgroundColor = 'rgb(' + 0 + ',' + 0 + ',' + 0 + ')';
        toggled = false;
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