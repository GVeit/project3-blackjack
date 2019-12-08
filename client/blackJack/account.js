let csrfToken;

const AccountWindow = (props) => {
    return (
            
        <div id="statWrapper">
        
            <h1>Statistics</h1>

            <div id="infoWrapper">
        
                <div id="wonTotal">Game Won Total: 0</div>

                <div id="bjTotal">Blackjack Total: 0</div>

                <div id="moneyTotal">Money Won Total: $0</div>
            
            </div>
        
        </div>
    );
};

const createAccountWindow = (csrf) => {
    ReactDOM.render(
        <AccountWindow csrf={csrf} />,
        document.querySelector("#stat-wrapper")
    );
    getWonTotal();
    getBjTotal();
    getMoneyTotal();
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
        document.getElementById("wonTotal").innerHTML= "<b>Game Won Total </b>" + userWonTotal;
    });
}

const getBjTotal = () =>{
    sendAjax('Get', '/bjTotal', null, (result) => {
        let userBjTotal = result.bjTotal;
        document.getElementById("bjTotal").innerHTML= "<b>Blackjack Total: </b>" + userBjTotal;
    });
}

const getMoneyTotal = () =>{
    sendAjax('Get', '/moneyTotal', null, (result) => {
        let userMoneyTotal = result.wonMoneyTotal;
        document.getElementById("moneyTotal").innerHTML= "<b>Money Won Total: </b>$" + userMoneyTotal;
    });
}