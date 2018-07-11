window.onload = function(){
    let username = this.prompt('Welcome to Paper Rock \'n\' Scissors. Please enter your name:');

    if(username === "" || username === null || username === undefined){
        username = 'player 1';
    }

    document.getElementById('player-name').innerText = username;
}

function getIndex(arrayLen) {
return Math.floor(Math.random() * Math.floor(arrayLen));
}

function computerPlay(){

    const computerOptions = ['rock', 'paper', 'scissors'];

    return computerOptions[getIndex(computerOptions.length)];
}

function playRound(player, computer){
    let status = null;
    let winner = null;
    let message = null;

    if (player === computer){
        return { 
            status: 'tie',
            winner: '',
            message: 'it was a tie'
        }
    } else if ((player === 'rock' && computer === 'scissors') || (player === 'paper' && computer === 'rock') || (player === 'scissors' && computer === 'paper')){
        return { 
            status: 'win',
            winner: 'player',
            message: 'you won this round!!!'
        }
    } else {
        return { 
            status: 'win',
            winner: 'computer',
            message: 'you lost this round!!!'
        }
    }
}

function updateScore(player, tie, computer){
    document.getElementById('player-score').innerText = parseInt(document.getElementById('player-score').innerText, 10) + player;
    document.getElementById('ties-count').innerText = parseInt(document.getElementById('ties-count').innerText, 10) + tie;
    document.getElementById('computer-score').innerText = parseInt(document.getElementById('computer-score').innerText, 10) + computer;
}

function reset(){
    location.reload();
}


function game(e){

    let playerScore = 0;
    let computerScore = 0;
    let tieScore = 0;

    const playerSelection = e.target.id;
    const computerSelection = computerPlay();

    const playResult = playRound(playerSelection, computerSelection);

    if (playResult.status === 'tie'){
        playerScore = 0;
        computerScore = 0;
        tieScore = 1;
    }

    if(playResult.status === 'win'){
        if (playResult.winner === 'player'){
            playerScore = 1;
            computerScore = 0;
            tieScore = 0;
        }

        if (playResult.winner === 'computer'){
            playerScore = 0;
            computerScore = 1;
            tieScore = 0;
        }
    }

    updateScore(playerScore, tieScore, computerScore);
    let gameResults = '';
    
    if (parseInt(document.getElementById('player-score').innerText, 10)  === 5){
        gameResults = `
            <h3 style="color: green;">Congratulations ${ document.getElementById('player-name').innerText }, you win!!!</h3>
            <p style="text-align: center;">
                Total game play:  ${(parseInt(document.getElementById('player-score').innerText, 10) + parseInt(document.getElementById('ties-count').innerText, 10) + parseInt(document.getElementById('computer-score').innerText, 10))} <br />
                Your Score              : ${parseInt(document.getElementById('player-score').innerText, 10)} <br/>
                Ties                    : ${parseInt(document.getElementById('ties-count').innerText, 10)} <br/>
                Computer Player Score   : ${parseInt(document.getElementById('computer-score').innerText, 10)} <br/>
            </p>
            <h5>Click on reset to play again.</h5>
            <div style="width:100%; text-align: center;"><button onclick="reset()">Replay</button></div>
        `;

        document.querySelector('body').innerHTML = gameResults;
    }

    if (parseInt(document.getElementById('computer-score').innerText, 10)  === 5){
        gameResults = `
            <h3 style="color: red;">Sorry ${ document.getElementById('player-name').innerText }, you loss!!!</h3>
            <p style="text-align: center;">
                Total game play:  ${(parseInt(document.getElementById('player-score').innerText, 10) + parseInt(document.getElementById('ties-count').innerText, 10) + parseInt(document.getElementById('computer-score').innerText, 10))} <br />
                Your Score              : ${parseInt(document.getElementById('player-score').innerText, 10)} <br/>
                Ties                    : ${parseInt(document.getElementById('ties-count').innerText, 10)} <br/>
                Computer Player Score   : ${parseInt(document.getElementById('computer-score').innerText, 10)} <br/>
            </p>
            <h5>Click on reset to play again.</h5>
            <div style="width:100%; text-align: center;"><button onclick="reset()">Replay</button></div>
        `;

        document.querySelector('body').innerHTML = gameResults;
    }

}

const img = document.querySelectorAll('img');

for(let i = 0; i < img.length; i++){
    img[i].addEventListener('click', game);
}

