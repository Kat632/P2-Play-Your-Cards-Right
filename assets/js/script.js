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

//Hide html elements
document.getElementById("myMiniImg").style.display = "none";

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
    rules.innerHTML = "Game Started!";

    //Hide and show various elements within the game play
    document.getElementById('cards').innerHTML = "";
    document.getElementById('start').style.display = 'none';
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
    }
    if (currentBet > myQuids) {
        myB.value = myQuids;
    }
    myB.max = myQuids;
    myMoney.innerHTML = myQuids;
    if (count > 3) {
        endPlay()
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
    document.getElementById('playerResult').style.display = "";
    if (myQuids > 2000) {
        document.getElementById("playerResult1").style.display = "block";
        document.getElementById("playerResult2").style.display = "none";
    } else if (myQuids > 1000) {
        document.getElementById("playerResult2").style.display = "block";
        document.getElementById("playerResult1").style.display = "none";
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