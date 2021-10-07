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
}
//build the cards - loop through the card arrays
function buildCards() {
    cards = [];
    for(s in suits) {
        for (n in numbers) {
            let card = {
                suit : suits[s]
                , num : numbers[n]
            }
            cards.push(card);
        }
    }
    console.log(cards);
}