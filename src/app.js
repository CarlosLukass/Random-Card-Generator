/* eslint-disable */
import "bootstrap";
import "./style.css";

const cardType = ["♦", "♥", "♠", "♣"];
const cardNumber = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "King",
  "Queen",
  "J",
  "Ace"
];
let cards = 2;
let cardIndex = 0;
const $deck = document.querySelector("#deck");

const generateNewCard = () => {
  //Disable animation in background card
  const $card = document.querySelector(
    cardIndex === 1 ? "#card0" : `#card${cardIndex - 1}`
  );
  if (cardIndex !== 0) {
    $card.classList.remove("card-animation");
  }

  //Generate ramdon card data
  const symbol = Math.floor(Math.random(cardType) * cardType.length);
  const number = Math.floor(Math.random(cardNumber) * cardNumber.length);

  //Generate new card
  $deck.innerHTML += `<div
                       id="card${cardIndex}"
                       class="card-animation card-position position-absolute shadow bg-light rounded d-flex justify-content-between align-items-center flex-column px-2"
                        style="width: 270px; height: 400px; z-index: 4; margin-top: -${cards}px">
                       <div class="align-self-start">
                         <h1 class="display-1 ${
                           cardType[symbol] == "♦"
                             ? "symbol-red"
                             : cardType[symbol] == "♥"
                             ? "symbol-red"
                             : ""
                         }">${cardType[symbol]}</h1>
                       </div>
                       <div>
                          <h1 class="display-1 card-text">${
                            cardNumber[number]
                          }</h1>
                                            </div>
                       <div class="align-self-end">
                         <h1 class="display-1 rotate ${
                           cardType[symbol] == "♦"
                             ? "symbol-red"
                             : cardType[symbol] == "♥"
                             ? "symbol-red"
                             : ""
                         }" >${cardType[symbol]}</h1>
                       </div>
                      </div>`;

  // update variables
  cardIndex += 1;
  cards += 2;
};

const timer = () => {
  let segs = 10;
  const $timer = document.querySelector("#timer");
  let autoDrawActive = true;

  // start onload counting
  let interval = setInterval(() => {
    if (segs > 0) {
      $timer.innerHTML = `&nbsp${segs} segs`;
      segs -= 1;
    } else {
      generateNewCard();
      segs = 10;
    }
  }, 1000);

  //toggle counting with button
  const $stop = document.querySelector("#stop");
  $stop.addEventListener("click", () => {
    autoDrawActive = !autoDrawActive;
    if (autoDrawActive) {
      interval = setInterval(() => {
        if (segs > 0) {
          $timer.innerHTML = `&nbsp${segs} segs`;
          segs -= 1;
        } else {
          generateNewCard();
          segs = 10;
        }
      }, 1000);
      $stop.textContent = "Stop Auto Draw";
    } else {
      $stop.textContent = "Activate Auto Draw";
      clearInterval(interval);
    }
  });
};

// RENDER --------------------------------------

// Load First Card
window.onload = () => {
  timer();
  generateNewCard();
};

// add new card through button
document.querySelector("#addNewCardBtn").addEventListener("click", () => {
  generateNewCard();
});
