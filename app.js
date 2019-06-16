/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying = undefined;

init();

document.querySelector(".btn-roll").addEventListener("click", () => {
    if(!gamePlaying)
        return;

    let dice = Math.floor(Math.random() * 6) + 1;

    var diceDOM = document.querySelector(".dice");

    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    if(dice !== 1) {
        roundScore += dice;
        document.querySelector("#current-" + activePlayer).innerHTML = roundScore;
    } else {
        nextPlayer();
    }
});

document.querySelector(".btn-hold").addEventListener("click", () => {
    if(!gamePlaying)
        return;
        
    scores[activePlayer] = scores[activePlayer] += roundScore;

    document.getElementById("score-" + activePlayer).innerHTML = scores[activePlayer];

    if(scores[activePlayer] >= 100) {
        document.getElementById("name-" + activePlayer).innerHTML = "Winner!";

        document.querySelector(".dice").style.display = "none";

        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");

        gamePlaying = false;
    } else {
        nextPlayer();
    }
});

document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {
    roundScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    document.getElementById("current-0").innerHTML = "0";
    document.getElementById("current-1").innerHTML = "0";

    document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
    document.querySelector(".player-" + (activePlayer === 0 ? 1 : 0) + "-panel").classList.remove("active");

    document.querySelector(".dice").style.display = "none";
}

function init() {
    gamePlaying = true;

    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    document.querySelector(".dice").style.display = "none";
    document.getElementById("score-0").innerHTML = "0";
    document.getElementById("score-1").innerHTML = "0";
    document.getElementById("current-0").innerHTML = "0";
    document.getElementById("current-1").innerHTML = "0";

    document.getElementById("name-0").innerHTML = "Player 1";
    document.getElementById("name-1").innerHTML = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("active");
}
