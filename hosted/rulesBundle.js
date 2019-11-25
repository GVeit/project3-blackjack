"use strict";

var csrfToken = void 0;

var RulesWindow = function RulesWindow(props) {
    return React.createElement(
        "div",
        { id: "rules-wrapper" },
        React.createElement(
        )
    );
};


var createRulesWindow = function createRulesWindow(csrf) {
    ReactDOM.render(React.createElement(RulesWindow, { csrf: csrf }), document.querySelector("#rules-wrapper"));
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

    createRulesWindow(csrf);
};
