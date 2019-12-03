"use strict";

var csrfToken = void 0;

var NavWindow = function NavWindow(props) {
    return React.createElement(
        "div",
        { id: "navReact" },
    );
};


var createNavWindow = function createNavWindow(csrf) {
    ReactDOM.render(React.createElement(NavWindow, { csrf: csrf }), document.querySelector("#navReact"));
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

    createNavWindow(csrf);
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
