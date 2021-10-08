let myQuids = 1000;

//cards
let cards = [];
let suits = ["spades", "hearts", "clubs", "diams"];
let numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let count = 0;
let cardOutput = document.getElementById('cards');

let rules = document.getElementById('rules');




function gameStart() {
    rules.innerHTML = "Game Started!";
    document.getElementById('start').style.display = 'none';
    document.getElementById('highLow').style.display = 'block';
    buildCards();
    shuffleArray(cards);
    cardOutput.innerHTML += showCard();
}

function hilo(a) {
    //calculate winner
    let win = false;
    let oldCard = cards[count].cardValue;
    count++;
    cardOutput.innerHTML += showCard();
    let newCard = cards[count].cardValue;
    if (a == 'high' && oldCard < newCard) {
        win = true;
    } else if (a == 'low' && oldCard > newCard) {
        win = true;
    }
    if (win) {
        rules.innerHTML = "You were right!";
    } else {
        rules.innerHTML = "You were wrong!";
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
    return '<span class="icard" style="color:' + bgColor + '">' + c.num + '&' + c.suit + ';</span>'; //Show the colours to the user
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