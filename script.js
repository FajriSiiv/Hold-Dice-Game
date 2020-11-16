'use strict';

//Selecting Elements
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const btnIndonesia = document.querySelector('#btnI');
const btnInggris = document.querySelector('#btnIn');
const closeBtn = document.querySelector('.fa.fa-times');
const rulesPeraturan = document.querySelector('.rules');
//starting condition

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  diceImg.classList.add('hidden');
  current1El.textContent = 0;
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
};
init();
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
};

//Rolling Dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating Roll Dice
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    //2.Display Dice
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${diceRoll}.png`;
    //3.Check for rolled dice.
    if (diceRoll !== 1) {
      //add to current score
      currentScore = currentScore + diceRoll;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
      // current0El.textContent = currentScore; //change later
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active player's score
    scores[activePlayer] = scores[activePlayer] + currentScore;
    // scores[1] = scores[1] + currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.check if player score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish game
      playing = false;
      diceImg.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } Win!`;
    } else {
      //switch player score;
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

const rules = function () {
  document.querySelector('.overlay').classList.toggle('removeHidden');
  document.querySelector('.rules').classList.toggle('removeHidden');
};

btnInggris.addEventListener('click', rules);

closeBtn.addEventListener('click', rules);

document.addEventListener('keydown', function (e) {
  console.log(e.key);
  if (e.key === 'Escape' && !rulesPeraturan.classList.remove('hidden')) {
    document.querySelector('.overlay').classList.remove('removeHidden');
    document.querySelector('.rules').classList.remove('removeHidden');
  }
});
document.querySelector('.overlay').addEventListener('click', rules);
