let csrfToken;

const RulesWindow = (props) => {
    return (
            
    <div id="rulesWrapper">

        <h1>Basic Blackjack Rules</h1>
        
        <ul style={{ listStyleType: "disc" }}>
              <li>The main goal of blackjack is to beat the dealer hand without going over 21.</li>
              <li>Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand.</li>
              <li>Each player starts with two cards, one of the dealer cards is hidden until the end.</li>
              <li>To hit is to ask for another card. To stand is to hold your total and end your turn.</li>
              <li>If you go over 21 you bust, and the dealer wins regardless of the dealer hand.</li>
              <li>Each player starts with two cards, one of the dealer cards is hidden until the end.</li>
              <li>If you are dealt 21 from the start (Ace and 10), you got a blackjack.</li>
              <li>Blackjack usually means you win 2 the amount of your bet.</li>
              <li>Dealer will hit until their cards total 17 or higher.</li>
        </ul>  
        
    </div>
    
    );
};

const createRulesWindow = (csrf) => {
    ReactDOM.render(
        <RulesWindow csrf={csrf} />,
        document.querySelector("#rules-wrapper")
    );
};

/* =+=+=+=+=+=+=+=+=+=+=+= */

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
      csrfToken = result.csrfToken;
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});


const setup = function(csrf) {
    
    createRulesWindow(csrf);

};
