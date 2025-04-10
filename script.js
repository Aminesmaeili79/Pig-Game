'use strict';

var activePlayer = 0;
var playersScores = [0, 0];
var currentScore = 0;

const checkWinner = () => {
    if (playersScores[activePlayer] >= 100) {
        document.querySelector(`.player--${activePlayer}`).classList.toggle('player--winner');
        document.querySelector(".btn--roll").disabled = true;
        document.querySelector('.btn--hold').disabled = true;
    }
}

const diceAnimation = (randomNumber) => {
    setTimeout(() => {
        var tempRandomNumber = Math.ceil(Math.random() * 6);
        document.querySelector('.dice').src = `./assets/dice-${tempRandomNumber}.png`
        setTimeout(() => {
            var tempRandomNumber = Math.ceil(Math.random() * 6);
            document.querySelector('.dice').src = `./assets/dice-${tempRandomNumber}.png`
            setTimeout(() => {
                var tempRandomNumber = Math.ceil(Math.random() * 6);
                document.querySelector('.dice').src = `./assets/dice-${tempRandomNumber}.png`
                setTimeout(() => {
                    var tempRandomNumber = Math.ceil(Math.random() * 6);
                    document.querySelector('.dice').src = `./assets/dice-${tempRandomNumber}.png`
                    setTimeout(() => {
                        document.querySelector('.dice').src = `./assets/dice-${randomNumber}.png`
                    }, 50)
                }, 50)
            }, 50)
        }, 50)
    }, 50)
}

const switchPlayer = () => {
    document.querySelector(`.player--${activePlayer}`).classList.toggle("player--active");
    activePlayer = activePlayer ? 0 : 1;
    document.querySelector(`.player--${activePlayer}`).classList.toggle("player--active");
}

const handleRollDice = () => {
    var randomNumber = Math.ceil(Math.random() * 6);
    document.querySelector('.dice').classList.remove("hidden");
    diceAnimation(randomNumber);
    if (randomNumber === 1) {
        currentScore = 0;
        document.querySelector(`#current--${activePlayer}`).innerText = 0;
        switchPlayer();
    } else {
        setTimeout(() => {
            currentScore += randomNumber;
            document.querySelector(`#current--${activePlayer}`).innerText = currentScore;
        }, 250)
    }
}

const handleHold = () => {
    playersScores[activePlayer] += currentScore;
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).innerText = 0;
    document.getElementById(`score--${activePlayer}`).innerText = playersScores[activePlayer];
    checkWinner();
    switchPlayer();
}

const initGame = () => {
    currentScore = 0;
    playersScores = [0, 0];
    activePlayer = 0;
    document.getElementById('score--0').innerText = 0;
    document.getElementById('score--1').innerText = 0;
    document.querySelector(".dice").classList.add("hidden");
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');

    document.querySelector(".btn--roll").addEventListener('click', handleRollDice);
    document.querySelector('.btn--hold').addEventListener('click', handleHold)
    document.querySelector('.btn--new').addEventListener('click', initGame)
}

initGame();
