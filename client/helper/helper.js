const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#loginMessage").fadeIn({width:'toggle'},100);
};

const redirect = (response) => {
    $("#loginMessage").fadeIn({width:'hide'},100);
    window.location = response.redirect;
};

const sendAjax = (type, action, data, success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function(xhr, status, error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};