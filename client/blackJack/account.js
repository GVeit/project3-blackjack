let csrfToken;

const AccountWindow = (props) => {
    return (
            
        <div id="statWrapper">
        
            <h1>Statistics</h1>

            <div id="infoWrapper">
        
                <div id="wonTotal">Won Total: 0</div>

                <div id="bjTotal">Blackjack Total: 0</div>

                <div id="moneyTotal">Won: $0</div>
            
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
        //console.dir(document.getElementById("player"));
        document.getElementById("wonTotal").innerHTML= "Won Total: " + userWonTotal;
    });
}

const getBjTotal = () =>{
    sendAjax('Get', '/bjTotal', null, (result) => {
        let userBjTotal = result.bjTotal;
        //console.dir(document.getElementById("player"));
        document.getElementById("bjTotal").innerHTML= "Blackjack Total: " + userBjTotal;
    });
}

const getMoneyTotal = () =>{
    sendAjax('Get', '/moneyTotal', null, (result) => {
        let userMoneyTotal = result.moneyTotal;
        //console.dir(document.getElementById("player"));
        document.getElementById("wonTotal").innerHTML= "Won: $" + userMoneyTotal;
    });
}