/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, lastDice1Value, lastDice2Value , winningScore, player1Name, player2Name, dice1, dice2;

winningScore = 100;
player1Name = 'Player 1';
player2Name = 'Player 2';

function init(){
scores=[0,0];
roundScore=0;
activePlayer=0;
document.querySelector('#dice1').style.display = 'none';
document.querySelector('#dice2').style.display = 'none';
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;
document.getElementById('name-0').textContent = player1Name;
document.getElementById('name-1').textContent = player2Name;
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
gamePlaying = true;

};
init();



document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying){
        // 1. Random Number
        dice1 = Math.floor(Math.random()*6)+1;
        dice2 = Math.floor(Math.random()*6)+1;
        
        
        // 2. Display the result
        var dice1DOM = document.querySelector('#dice1');
        dice1DOM.style.display = 'block';
        dice1DOM.src ='resources/dice-' + dice1 +'.png';

        var dice2DOM = document.querySelector('#dice2');
        dice2DOM.style.display = 'block';
        dice2DOM.src ='resources/dice-' + dice2 +'.png';

        // Update the round score if the rolled number was not a 1
        if (lastDice1Value === 6 && dice1 === 6 || lastDice1Value === 6 && dice2 === 6 || lastDice2Value === 6 && dice1 === 6 || lastDice2Value === 6 && dice2 === 6 || dice1 === 6 && dice2 === 6  )
        {
            scores[activePlayer]=0;
            document.querySelector('#current-' + activePlayer).textContent = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        } else
        {
            if (dice1 === 1 || dice2 === 1){
                 // Next player turn
                 nextPlayer();
            }else{
               
                roundScore += (dice1 + dice2);
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }  
        } 
        lastDice1Value = dice1;
        lastDice2Value = dice2;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        // Add current score to the global score
            scores[activePlayer] += roundScore;

        // Update the UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer] ;
            
        // Click if player won the game
        if (scores[activePlayer] >= winningScore){
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#dice1').style.display = 'none';
            document.querySelector('#dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.getElementById('current-' + activePlayer ).textContent = 0;
            gamePlaying = false;
        }else{
        // Next player turn
            nextPlayer(); 
        }
    }
});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
   // document.querySelector('#dice1').style.display = 'none';
   // document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
};

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-settings').addEventListener('click', function(){
    document.getElementById('myModal').style.display = 'block';
});

document.querySelector(".close").addEventListener('click',function(){
    document.getElementById('myModal').style.display = 'none';
});

document.querySelector('#play-btn').addEventListener('click', function(){
    winningScore = document.getElementById('winning_score').value;
    player1Name = document.getElementById('player-0-name').value;
    player2Name = document.getElementById('player-1-name').value;
    document.getElementById('name-0').textContent = player1Name;
    document.getElementById('name-1').textContent = player2Name;
    document.getElementById('myModal').style.display = 'none';
    
});
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+ dice+'</em>';


