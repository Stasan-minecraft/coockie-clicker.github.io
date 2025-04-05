var score = Number(localStorage.getItem("scores")) || 0;
var multiply = Number(localStorage.getItem("multiplys")) || 1;
var bonusPrice = Number(localStorage.getItem("bonusPrices")) || 50;
var autoClickerPrice = Number(localStorage.getItem("autoClickerPrice")) || 100;
var autoCLickers = Number(localStorage.getItem("autoClickers")) || 0;

var coockie = document.getElementById("click");
var scoreBoard = document.getElementById("score");
var bonusButton = document.getElementById("click-x2");
var xShow = document.getElementById("x");
var autoClick = document.getElementById("auto-click");

function restoreAutoClicker() {
    if (autoCLickers > 0) {
        setInterval(() => {
            score = score + multiply * autoCLickers;
            updateHtml();
        },1000);
    }
}

restoreAutoClicker();

function updateHtml() {
    scoreBoard.innerText = score + " UAH";
    bonusButton.innerText = "buy update for click " + bonusPrice + " UAH";
    autoClick.innerText = "buy auto click " + autoClickerPrice + " UAH";
    xShow.innerText =  "+" + multiply;
}

updateHtml();

function clicker() {
    score = score + multiply;
    updateHtml();
    coockie.disabled = true;
    setTimeout(() => {
        coockie.disabled = false;
    }, 200);
}


function autoClickerBuy() {
    if (score >= autoClickerPrice) {
        autoCLickers = autoCLickers + 1;
        score = score - autoClickerPrice;
        autoClickerPrice = autoClickerPrice * 1.7;
        setInterval(() => {
            score = score + multiply;
            updateHtml();
        },1000);
        updateHtml();
    }
}

function bonusBuy() {
    if (score >= bonusPrice) {
        score = score - bonusPrice;
        bonusPrice = bonusPrice * 1.5;
        multiply = multiply + 1;
        updateHtml();
    }
}



function saveProgres() {
    localStorage.setItem("scores",score);
    localStorage.setItem("multiplys",multiply);
    localStorage.setItem("bonusPrices",bonusPrice);
    localStorage.setItem("autoClickers",autoCLickers);
    localStorage.setItem("autoClickerPrice",autoClickerPrice);
}

window.addEventListener("beforeunload", saveProgres);
coockie.addEventListener("click", clicker);
bonusButton.addEventListener("click", bonusBuy);
autoClick.addEventListener("click", autoClickerBuy);

function rP() {
    score = 0;
    autoCLickers = 0;
    multiply = 1;
    bonusPrice = 50;
    autoClickerPrice = 100;
    saveProgres();
    updateHtml();
}