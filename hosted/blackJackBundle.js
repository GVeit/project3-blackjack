"use strict";

// BLACKJACK WINDOW
var userMoney = 0;
var csrfToken = void 0;

var BlackJackWindow = function BlackJackWindow(props) {
    return React.createElement(
        "div",
        { id: "game-Wrapper" },
        React.createElement(
            "div",
            { id: "game-board" },
            React.createElement("div", { id: "dealer-cards" }),
            React.createElement("br", null),
            React.createElement("div", { id: "dealer-score" }),
            React.createElement("br", null),
            React.createElement("div", { id: "player-cards" }),
            React.createElement("br", null),
            React.createElement("div", { id: "player-score" }),
            React.createElement("br", null)
        )
    );
};

// BLACKJACK WINDOW

var createBlackJackWindow = function createBlackJackWindow(csrf) {
    ReactDOM.render(React.createElement(BlackJackWindow, { csrf: csrf }), document.querySelector("#game"));
    //document.getElementById("player").innerHTML = "Your money: $" + player.money;
    document.getElementById("hit-button").disabled = true;
    document.getElementById("stand-button").disabled = true;
    getMoney();
};

/* =+=+=+=+=+=+=+=+=+=+=+= */

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        csrfToken = result.csrfToken;
        setup(result.csrfToken);
    });
};

var getMoney = function getMoney() {
    sendAjax('Get', '/getFunds', null, function (result) {
        userMoney = result.funds;
        player.money = userMoney;
        console.dir(document.getElementById("player"));
        document.getElementById("player").innerHTML = "Balance: $" + userMoney;
    });
};

var sendMoney = function sendMoney(playerBet) {
    console.dir(playerBet);
    sendAjax('POST', '/addFunds', { fundField: playerBet, _csrf: csrfToken }, function (result) {
        console.dir(result);
    });
};


const sendMoneyTotal = (playerBet) => {
  console.dir(playerBet);
    sendAjax('POST', '/moneyTotal', {fundField: playerBet, _csrf: csrfToken}, (result) => {
            console.dir(result);
        });
}

const sendBjTotal = (playerBet) => {
  console.dir(playerBet);
    sendAjax('POST', '/bjTotal', {fundField: playerBet, _csrf: csrfToken}, (result) => {
            console.dir(result);
        });
}

const sendWonTotal = (playerBet) => {
  console.dir(playerBet);
    sendAjax('POST', '/wonTotal', {fundField: playerBet, _csrf: csrfToken}, (result) => {
            console.dir(result);
        });
}

$(document).ready(function() {
    getToken();
});



const setup = function(csrf) {
    
    createBlackJackWindow(csrf);

};


//document.getElementById("confirm-purchase").addEventListener("click", function(){
//  document.getElementById("credit").innerHTML = userMoney;
//});

var totalCardsPulled = 0;
var deckArray = [];
var player = {
        cards: [],
        score: 0,
        money: userMoney
    };
var playerHand = '';


var dealer = {
    cards: [],
    score: 0
};
var dealerHand = '';




function getCard(x)
{
    var valueArray = [];
    var total = 0;
    var ace = 0;

    valueArray = x;

    // run through the value of each cards
    for(var i = 0; i < valueArray.length; i++)
    {
        // aces worth 11 or 1
        if (valueArray[i].rank === "A") 
        {
            total += 11;
            // keep track number of aces just in case if someone went over 21
            ace += 1;
        } 
        // J, Q, K cards worth 10
        else if (valueArray[i].rank === "J" || valueArray[i].rank === "Q" || valueArray[i].rank === "K") 
        {
            total += 10;
        } 
        // rest of them worth itself
        else 
        {
            total += valueArray[i].rank;
        }

        //console.log(total);
    }
    
    //if over 21, reset ace value to 1
    while (ace > 0 && total > 21) {
        total -= 10;
        ace -= 1;
    }
    
    return total;

}

beginGame();
shuffle();

function beginGame(){
    var iconArray = ["clubs", "diamonds", "hearts", "spades"];
    var rankArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

        for (var s = 0; s < iconArray.length; s += 1) {

            for (var r = 0; r < rankArray.length; r += 1) {

                deckArray[s * 13 + r] = {
                    // value of the cards
                    rank: rankArray[r],
                    // suits 
                    icon: iconArray[s]

                };
            }
        }
}


function shuffle(){
    
    var temp; 
    var rnd;

    // switch the values of two random cards
    for (var i = 0; i < deckArray.length; i += 1) {
        rnd = Math.floor(Math.random() * deckArray.length);
        temp = deckArray[i];
        deckArray[i] = deckArray[rnd];
        deckArray[rnd] = temp;
    }
}

function bet(won) {

    var playerBet = document.getElementById("bet").valueAsNumber;

    if (won === true) {

        player.money += playerBet;
        sendMoney(playerBet);
        //send money total to stat
        sendMoneyTotal(playerBet);
    }
    if (won === false) {

        player.money -= playerBet;
        sendMoney(-playerBet);
    }

}

// reset the game
function restartGame() {
    

        //document.getElementById("bet").disabled = true;        
        // restart everything 
        totalCardsPulled = 0;
        player.cards = [];
        dealer.cards = [];
        player.score = 0;
        dealer.score = 0;

        beginGame();
        shuffle();
    
        document.getElementById("bet").disabled = false;
        document.getElementById("hit-button").disabled = true;
        document.getElementById("stand-button").disabled = true;
        document.getElementById("new-game-button").disabled = false;

}

function endGame() {
    // if player has exact 21, player would auto win the game
    
    var playerBet = document.getElementById("bet").valueAsNumber;

    if (playerBet > player.money) {
        document.getElementById("message-board").innerHTML = "You do not have sufficient fund to make a bet";
    } else {
        
        document.getElementById("bet").disabled = true;


        if (player.score === 21) {
            document.getElementById("message-board").innerHTML = "You win! You got blackjack! Place a new bet";
            bet(true);
            document.getElementById("player").innerHTML = "Your money: $" + player.money;
            //update stats

            //add bj score to stat
            sendBjTotal(1);
            sendWonTotal(1);
            
            restartGame();
        }
        // if player went over 21, player would lose
        if (player.score > 21) {
            document.getElementById("message-board").innerHTML = "You went over 21! The dealer wins. Place a new bet";
            bet(false);
            document.getElementById("player").innerHTML = "Your money: $" + player.money;
            restartGame();
        }
        // if dealer has exact 21, it would win 
        if (dealer.score === 21) {
            document.getElementById("message-board").innerHTML = "You lost. Dealer got blackjack. Place a new bet";
            bet(false);
            document.getElementById("player").innerHTML = "Your money: $" + player.money;
            restartGame();
        }
        // if dealer went over 21, dealer would lose
        if (dealer.score > 21) {
            document.getElementById("message-board").innerHTML = "Dealer went over 21! You win! Place a new bet";
            bet(true);
            document.getElementById("player").innerHTML = "Your money: $" + player.money;
            //update stats
            sendWonTotal(1);
            restartGame();
        }
        // if dealer has 17 scores and still less than player's current scores, it would lose
        if (dealer.score >= 17 && player.score > dealer.score && player.score < 21) {
            document.getElementById("message-board").innerHTML = "You win! You beat the dealer. Place a new bet";
            bet(true);
            document.getElementById("player").innerHTML = "Your money: $" + player.money;
            //update stats
            sendWonTotal(1);
            restartGame();
        }
        // if dealer has 17 scores and greater than player's current scores, it would win
        if (dealer.score >= 17 && player.score < dealer.score && dealer.score < 21) {
            document.getElementById("message-board").innerHTML = "You lost. Dealer had the higher score. Place a new bet";
            bet(false);
            document.getElementById("player").innerHTML = "Your money: $" + player.money;
            restartGame();
        }
        // if both player and dealer have same scores, it would be tie
        if (dealer.score >= 17 && player.score === dealer.score && dealer.score < 21) {
            document.getElementById("message-board").innerHTML = "You tied! Place a new bet.";
            restartGame();
        }
        if (player.money <= 0) {
            document.getElementById("new-game-button").disabled = true;
            document.getElementById("bet").disabled = true;
            document.getElementById("hit-button").disabled = true;
            document.getElementById("stand-button").disabled = true;
            document.getElementById("message-board").innerHTML = "You lost!" + "<br>" + "You are out of money";
        }
        
    }

}

function dealerDraw() {
    // draw a card
    dealer.cards.push(deckArray[totalCardsPulled]);
    // get value of the card
    dealer.score = getCard(dealer.cards);

    var icon = '';
    var suit = dealer.cards[dealer.cards.length-1].icon
    var valueOfCard = dealer.cards[dealer.cards.length-1].rank

    if (suit == 'hearts'){
        icon='&hearts;';
        console.log("&hearts" + valueOfCard);
    }
    else if (suit == 'spades'){
        icon = '&spades;';
        console.log("&spades" + valueOfCard);
    }
    else if (suit == 'diamonds'){
        icon = '&diams;';
        console.log("Diamonds" + valueOfCard);
    }
    else{
        icon = '&clubs;';
        console.log("Clubs" + valueOfCard);
    }
    document.getElementById("dealer-cards").innerHTML = dealerHand + '<div>' + valueOfCard + '<br/>' + icon + '</div>';
    dealerHand = dealerHand + '<div>' + valueOfCard + '<br/>' + icon + '</div>';



    // display the score
    document.getElementById("dealer-score").innerHTML = "Dealer Score: " + dealer.score;
    // keep track of how many cards are there
    totalCardsPulled += 1;
}



function newGame() {
    
    
    var playerBet = document.getElementById("bet").valueAsNumber;
    
    if (playerBet > player.money) {
        document.getElementById("message-board").innerHTML = "You do not have sufficient fund to make a bet";
    } else {
        // reset everything
        dealerHand = '';
        playerHand = '';

        document.getElementById("new-game-button").disabled = true;
        document.getElementById("hit-button").disabled = false;
        document.getElementById("stand-button").disabled = false;
        document.getElementById("message-board").innerHTML = "";
        hit();
        hit();
        dealerDraw();
        endGame();
    }
}

function hit() {
    player.cards.push(deckArray[totalCardsPulled]);
    player.score = getCard(player.cards);
    //document.getElementById("player-cards").innerHTML = "Player Cards: " + JSON.stringify(player.cards);

    var icon = '';
    var suit = player.cards[player.cards.length-1].icon
    var valueOfCard = player.cards[player.cards.length-1].rank
    
    
    if (suit == 'hearts'){
        icon='&hearts;';
        console.log("Hearts" + valueOfCard);
    }
    else if (suit == 'spades'){
        icon = '&spades;';
        console.log("Spades" + valueOfCard);
    }
    else if (suit == 'diamonds'){
        icon = '&diams;';
        console.log("Diamonds" + valueOfCard);
    }
    else{
        icon = '&clubs;';
        console.log("Clubs" + valueOfCard);
    }
    
    document.getElementById("player-cards").innerHTML = playerHand + '<div>' + valueOfCard + '<br/>' + icon + '</div>';
        
    playerHand = playerHand + '<div>' + valueOfCard + '<br/>' + icon + '</div>';
    
    document.getElementById("player-score").innerHTML = "Player Score: " + player.score;
        
        
        totalCardsPulled += 1;
        if (totalCardsPulled > 2) {
            endGame();
        }

}

function stand() {
    while (dealer.score < 17) {
        dealerDraw();
    }
    endGame();
}
