let myQuids = 1000;

//cards
let cards = [];
let suits = ["spades","hearts","clubs","diams"];
let numbers = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];


let rules = document.getElementById('rules');




function gameStart() {
  rules.innerHTML = "Game Started!";
  document.getElementById('start').style.display = 'none';
  buildCards();
  shuffleArray(cards);
}

//randomise the cards
function shuffleArray(array) {
    for (let i = array.length-1; i > 0; i--) {
        let holder = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[holder];
        array[holder] = temp;
    }
    return array;
}






//build the cards - loop through the card arrays
function buildCards() {
    cards = [];
    for(s in suits) {
        for (n in numbers) {
            let card = {
                suit : suits[s]
                , num : numbers[n]
                , cardValue : parseInt(n) + 2
            }
            cards.push(card);
        }
    }
    console.log(cards);
}