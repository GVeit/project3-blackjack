let csrfToken;

const AccountWindow = (props) => {
    return (
            
        <div id="statWrapper">
        
            <h1>Statistics</h1>

            <div id="winningTotal">Won Total: 0</div>

            <div id="bjTotal">Blackjack Total: 0</div>

            <div id="moneyTotal">Won: $0</div>
        
        </div>
    );
};

const createAccountWindow = (csrf) => {
    ReactDOM.render(
        <AccountWindow csrf={csrf} />,
        document.querySelector("#stat-wrapper")
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
    
    createAccountWindow(csrf);

};


const getWonTotal = () =>{
    sendAjax('Get', '/wonTotal', null, (result) => {
        let userWonTotal = result.wonTotal;
        console.dir(document.getElementById("player"));
        document.getElementById("winningTotal").innerHTML= "Won Total: " + userWonTotal;
    });
}

