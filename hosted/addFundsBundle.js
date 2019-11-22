"use strict";

var csrfToken = void 0;

// addFunds WINDOW
var addFundsWindow = function addFundsWindow(props) {
    return React.createElement(
        "div",
        { "class": "payment" },
        React.createElement(
            "form",
            null,
            React.createElement(
                "div",
                { "class": "form-group owner" },
                React.createElement(
                    "label",
                    { "for": "owner" },
                    "Owner"
                ),
                React.createElement("input", { type: "text", "class": "form-control", id: "owner" })
            ),
            React.createElement(
                "div",
                { "class": "form-group CVV" },
                React.createElement(
                    "label",
                    { "for": "cvv" },
                    "CVV"
                ),
                React.createElement("input", { type: "text", "class": "form-control", id: "cvv" })
            ),
            React.createElement(
                "div",
                { "class": "form-group", id: "card-number-field" },
                React.createElement(
                    "label",
                    { "for": "cardNumber" },
                    "Card Number"
                ),
                React.createElement("input", { type: "text", "class": "form-control", id: "cardNumber" })
            ),
            React.createElement(
                "div",
                { "class": "form-group", id: "expiration-date" },
                React.createElement(
                    "label",
                    null,
                    "Expiration Date"
                ),
                React.createElement(
                    "select",
                    null,
                    React.createElement(
                        "option",
                        { value: "01" },
                        "January"
                    ),
                    React.createElement(
                        "option",
                        { value: "02" },
                        "February "
                    ),
                    React.createElement(
                        "option",
                        { value: "03" },
                        "March"
                    ),
                    React.createElement(
                        "option",
                        { value: "04" },
                        "April"
                    ),
                    React.createElement(
                        "option",
                        { value: "05" },
                        "May"
                    ),
                    React.createElement(
                        "option",
                        { value: "06" },
                        "June"
                    ),
                    React.createElement(
                        "option",
                        { value: "07" },
                        "July"
                    ),
                    React.createElement(
                        "option",
                        { value: "08" },
                        "August"
                    ),
                    React.createElement(
                        "option",
                        { value: "09" },
                        "September"
                    ),
                    React.createElement(
                        "option",
                        { value: "10" },
                        "October"
                    ),
                    React.createElement(
                        "option",
                        { value: "11" },
                        "November"
                    ),
                    React.createElement(
                        "option",
                        { value: "12" },
                        "December"
                    )
                ),
                React.createElement(
                    "select",
                    null,
                    React.createElement(
                        "option",
                        { value: "16" },
                        " 2019"
                    ),
                    React.createElement(
                        "option",
                        { value: "17" },
                        " 2020"
                    ),
                    React.createElement(
                        "option",
                        { value: "18" },
                        " 2021"
                    ),
                    React.createElement(
                        "option",
                        { value: "19" },
                        " 2022"
                    ),
                    React.createElement(
                        "option",
                        { value: "20" },
                        " 2023"
                    ),
                    React.createElement(
                        "option",
                        { value: "21" },
                        " 2024"
                    )
                )
            ),
            React.createElement(
                "div",
                { "class": "form-group", id: "credit_cards" },
                React.createElement("img", { src: "assets/img/visa.jpg", id: "visa" }),
                React.createElement("img", { src: "assets/img/mastercard.jpg", id: "mastercard" }),
                React.createElement("img", { src: "assets/img/amex.jpg", id: "amex" })
            ),
            React.createElement(
                "div",
                { "class": "form-group", id: "pay-now" },
                React.createElement(
                    "button",
                    { type: "submit", "class": "btn btn-default", id: "confirm-purchase", style: "width: 100%;", onClick: getMoney },
                    "Confirm"
                )
            )
        )
    );
};

// addFunds WINDOW
var createaddFundsWindow = function createaddFundsWindow(csrf) {
    ReactDOM.render(React.createElement("addFundsWindow", { csrf: csrf }), document.querySelector("#reactCredit"));
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        csrfToken = result.csrfToken;
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});

var getMoney = function getMoney(e) {
    e.preventDefault();
    console.dir('adding money');
    var fundField = document.querySelector("#credit").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/addFunds");

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = function () {
        return handleResponse(xhr);
    };

    var formData = "fundField=" + fundField + "&_csrf=" + csrfToken;

    console.dir(formData);

    document.querySelector("#credit").value = "";
    document.getElementById("addedFund").innerHTML = "Successfully added to balance";

    xhr.send(formData);
    return false;
};

var handleResponse = function handleResponse(xhr) {
    console.dir(xhr.response);
};

var setup = function setup(csrf) {

    createaddFundsWindow(csrf);
    console.dir(csrfToken);
    //document.getElementById("confirm-purchase").addEventListener("click", getMoney);
};
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#loginMessage").fadeIn({ width: 'toggle' }, 100);
};

var redirect = function redirect(response) {
    $("#loginMessage").fadeIn({ width: 'hide' }, 100);
    window.location = response.redirect;
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
