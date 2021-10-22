const defaultCardLayout = document.getElementById("cards-container"); 

let myQuids = 0;
let count = 0;
let firstRun = true;

//cards
let suits = ["spades", "hearts", "clubs", "diams"];
let numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let cards = [];

//Get html elements
let cardOutput = document.getElementById('cards');
let rules = document.getElementById('rules');
let scoreOutput = document.getElementById('score');
let myMoney = document.getElementById('quids');
let myB = document.getElementById('myBet');
let result = document.getElementById("playerResult");

//Hide html elements
cardOutput.style.display = "none"; //if this is not here, a card displays under the start button
//result.style.display = "none";  //I don't think I need this.

myB.addEventListener('change', checkMe);
myB.addEventListener('blur', checkMe);


//Check if user is making a bet and check if they are changing it according to the rules.  You can't bet more money than you have
function checkMe() {
    if (this.value > myQuids) {
        this.value = myQuids;
    }
    if (this.value < 0) {
        this.value = 0;
    }
    rules.innerHTML = "Bet changed to £" + this.value;
}

function gameStart() {

    myQuids = 1000;
    count = 0;
    myMoney.innerHTML = myQuids; //reset the money at the start of the game
    rules.innerHTML = "Game Started!";
    cardOutput.innerHTML = defaultCardLayout;
    cardOutput.style.display = ""; //Tried the one below instead, can't see the cards
    //document.getElementById('cards').innerHTML = "";
    //Hide and show various elements within the game play
    document.getElementById('start').style.display = 'none';
    result.style.display = "none";
    document.getElementById('footer').style.display = "none"
    document.getElementById('highLow').style.display = 'block';
    document.getElementById('score').style.display = 'block';
    if (firstRun) {
    buildCards();
    firstRun = false;
    }
    shuffleArray(cards);
    cardOutput.innerHTML += showCard();
}

function hilo(a) {
    //calculate winner
    let win = false;
    let oldCard = cards[count].cardValue;
    let myBetAmount = parseInt(myB.value);
    count++;
    cardOutput.innerHTML += showCard();
    let newCard = cards[count].cardValue;
    if (a == 'high' && oldCard < newCard) {
        win = true;
    } else if (a == 'low' && oldCard > newCard) {
        win = true;
    }
    if (win) {
        rules.innerHTML = "You were right! You made £" + myBetAmount;
        myQuids = myQuids + myBetAmount;
    } else {
        rules.innerHTML = "You were wrong! You lost £" + myBetAmount;
        myQuids = myQuids - myBetAmount;
    }
    let currentBet = parseInt(myB.value);
    if (myQuids < 1) {
        myB.value = 0;
        endPlay();
    }
    if (currentBet > myQuids) {
        myB.value = myQuids;
    }
    myB.max = myQuids;
    myMoney.innerHTML = myQuids;
    if (count > 3) {
        endPlay();
    }
}

function endPlay() {
    document.getElementById('highLow').style.display = 'none';
    document.getElementById('start').style.display = 'block';
    document.getElementById('score').style.display = 'none';
    rules.innerHTML = "Game over! You have £" + myQuids;
    displayPrize();
}

function displayPrize() {
    
    document.getElementById('cards').style.display = "none";
    document.getElementById('playerResult').style.display = "";
    if (myQuids >= 12000) {
        document.getElementById("playerResult1").style.display = "block";
        document.getElementById("playerResult0").style.display = "none";
        document.getElementById("playerResult2").style.display = "none";
        document.getElementById("playerResult3").style.display = "none";
        document.getElementById("playerResult4").style.display = "none";
        document.getElementById("playerResult5").style.display = "none";   
    } else if ((myQuids >= 8000)  && (myQuids <= 11999)) {
        document.getElementById("playerResult4").style.display = "block";
        document.getElementById("playerResult3").style.display = "none";
        document.getElementById("playerResult1").style.display = "none";
        document.getElementById("playerResult2").style.display = "none";
        document.getElementById("playerResult0").style.display = "none";
        document.getElementById("playerResult5").style.display = "none";   
    } else if ((myQuids >= 5000) && (myQuids <=7999)) {
        document.getElementById("playerResult3").style.display = "block";
        document.getElementById("playerResult1").style.display = "none";
        document.getElementById("playerResult2").style.display = "none";
        document.getElementById("playerResult4").style.display = "none";
        document.getElementById("playerResult0").style.display = "none";
    } else if ((myQuids >= 1000) && (myQuids <= 4999)) {
        document.getElementById("playerResult2").style.display = "block";
        document.getElementById("playerResult1").style.display = "none";
        document.getElementById("playerResult3").style.display = "none";
        document.getElementById("playerResult4").style.display = "none";
        document.getElementById("playerResult0").style.display = "none";
        document.getElementById("playerResult5").style.display = "none";   
    } else if ((myQuids >= 1) && (myQuids <= 999)) {
        document.getElementById("playerResult5").style.display = "block";
        document.getElementById("playerResult0").style.display = "none";
        document.getElementById("playerResult1").style.display = "none";
        document.getElementById("playerResult2").style.display = "none";
        document.getElementById("playerResult3").style.display = "none";
        document.getElementById("playerResult4").style.display = "none";  
    } else if (myQuids == 0) {
        document.getElementById("playerResult0").style.display = "block";
        document.getElementById("playerResult1").style.display = "none";
        document.getElementById("playerResult2").style.display = "none";
        document.getElementById("playerResult3").style.display = "none";
        document.getElementById("playerResult4").style.display = "none";
        document.getElementById("playerResult5").style.display = "none";       
    }
}

//randomise the cards
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let holder = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[holder];
        array[holder] = temp;
    }
    return array;
}

//display the cards to the user
function showCard() {
    let c = cards[count];
    let bgColor = (c.icon == "H" || c.icon == "D") ? 'red' : 'black'; //Get colours for the suits
    let hpos = (count > 0) ? count * 200 + 30 : 30;
    return '<div class="icard ' + c.suit + '" style="left:' + hpos + 'px;"> <div class="cardtop suit">' + c.num + '<br></div> <div class="cardmid suit"></div>  <div class="cardbottom suit">' + c.num + '<br></div></div>';
}

//build the cards - loop through the card arrays
function buildCards() {
    cards = [];
    for (s in suits) {
        let suit = suits[s][0].toUpperCase();
        for (n in numbers) {
            let card = {
                suit: suits[s],
                num: numbers[n],
                cardValue: parseInt(n) + 2,
                icon: suit
            }
            cards.push(card);
        }
    }
}