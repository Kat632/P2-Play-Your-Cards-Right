let myQuids = 0;

//cards

let suits = ["spades", "hearts", "clubs", "diams"];
let numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let count = 0;
let cards = [];
let cardOutput = document.getElementById('cards');

let rules = document.getElementById('rules');
let scoreOutput = document.getElementById('score');

let myMoney = document.getElementById('quids');
let myB = document.getElementById('myBet');

myB.addEventListener('change', checkMe);
myB.addEventListener('blur', checkMe);

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
    rules.innerHTML = "Game Started!";

    //Hide and show various elements within the game play
    document.getElementById('cards').style.display = 'block';
    document.getElementById('start').style.display = 'none';
    document.getElementById('highLow').style.display = 'block';
    document.getElementById('score').style.display = 'block';


    buildCards();
    shuffleArray(cards);
    cardOutput.innerHTML += showCard();
    //scoreOutput.innerHTML = "SCORE:"+score+"LIVES:"("+lives+");
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
        rules.innerHTML = "You were right! You made £" +myBetAmount;
        myQuids = myQuids + myBetAmount;
    } else {
        rules.innerHTML = "You were wrong! You lost £" +myBetAmount;
        myQuids = myQuids - myBetAmount;
    }
    let currentBet = parseInt(myB.value);
    if (myQuids < 1) {
        myB.value = 0;
    }
    if (currentBet > myQuids) {
        myB.value = myQuids;
    }
    myB.max= myQuids;
    myMoney.innerHTML = myQuids;
    if (count > 3) {
        endPlay()
    }
}

function endPlay() {
    document.getElementById('highLow').style.display = 'none';
    rules.innerHTML = "Game over! You have £" + myQuids;
    document.getElementById('start').style.display = 'block';
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
    console.log(hpos);
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
    console.log(cards);
}