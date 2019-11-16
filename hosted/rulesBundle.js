var RulesWindow = function RulesWindow(props) {
    return React.createElement(
        <h1>Basic Blackjack Rules</h1>
        
        <ul style="list-style-type:disc;">
              <li>The main goal of blackjack is to beat the dealer's hand without going over 21.</li>
              <li>Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand.</li>
              <li>Each player starts with two cards, one of the dealer's cards is hidden until the end.</li>
              <li>To 'Hit' is to ask for another card. To 'Stand' is to hold your total and end your turn.</li>
              <li>If you go over 21 you bust, and the dealer wins regardless of the dealer's hand.</li>
              <li>Each player starts with two cards, one of the dealer's cards is hidden until the end.</li>
              <li>If you are dealt 21 from the start (Ace and 10), you got a blackjack.</li>
              <li>Blackjack usually means you win 2 the amount of your bet.</li>
              <li>Dealer will hit until his/her cards total 17 or higher.</li>
        </ul>  
    );
};

var createRulesWindow = function createRulesWindow(csrf) {
    ReactDOM.render(React.createElement(RulesWindow, { csrf: csrf }), document.querySelector("#rulesWrapper"));
};

var setup = function setup(csrf) {

    RulesWindow(csrf);

};
