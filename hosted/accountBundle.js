"use strict";

var csrfToken = void 0;

var AccountWindow = function AccountWindow(props) {
    return React.createElement(
        "div",
        { id: "stat-wrapper" },
    );
};


var createAccountWindow = function createAccountWindow(csrf) {
    ReactDOM.render(React.createElement(AccountWindow, { csrf: csrf }), document.querySelector("#stat-wrapper"));
};

/* =+=+=+=+=+=+=+=+=+=+=+= */

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        csrfToken = result.csrfToken;
        setup(result.csrfToken);
    });
};


$(document).ready(function () {
    getToken();
});

var setup = function setup(csrf) {

    createAccountWindow(csrf);
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};

var getMoneyTotal = function getMoneyTotal() {
    sendAjax('Get', '/wonTotal', null, function (result) {
        moneyTotal = result.funds;
        console.dir(document.getElementById("winningTotal"));
        document.getElementById("winningTotal").innerHTML = "Won: " + moneyTotal;
    });
}


var getBjTotal = function getBjTotal() {
    sendAjax('Get', '/bjTotal', null, function (result) {
        blackTotal = 
        console.dir(document.getElementById("bjTotal"));
        document.getElementById("bjTotal").innerHTML = "Blackjack Total: " + moneyTotal;
    });
}

var getWonTotal = function getWonTotal() {
    sendAjax('Get', '/moneyTotal', null, function (result) {
        userMoney = result.funds;
        player.money = userMoney;
        console.dir(document.getElementById("moneyTotal"));
        document.getElementById("moneyTotal").innerHTML = "Balance: $" + userMoney;
    });
};
