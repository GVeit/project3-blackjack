'use strict';

var csrfToken = void 0;

// addFunds WINDOW
var addFundsWindow = function addFundsWindow(props) {
    return React.createElement(
        'div',
        null,
        'It works!'
    );
};

// addFunds WINDOW
var createaddFundsWindow = function createaddFundsWindow(csrf) {
    ReactDOM.render(React.createElement('addFundsWindow', { csrf: csrf }), document.querySelector("#game"));
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

    var fundField = document.querySelector("#credit").value;

    var xhr = new XMLHttpRequest();
    xhr.open("post", "/addFunds");

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = function () {
        return handleResponse(xhr);
    };

    var formData = 'fundField=' + fundField + '&_csrf=' + csrfToken;

    xhr.send(formData);
};

var handleResponse = function handleResponse(xhr) {
    console.dir(xhr.response);
};

var setup = function setup(csrf) {

    console.dir(csrfToken);
    document.getElementById("confirm-purchase").addEventListener("click", getMoney);

    createaddFundsWindow(csrf);
};
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#domoMessage").animate({ width: 'hide' }, 350);
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
