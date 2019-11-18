let csrfToken;

// addFunds WINDOW
const addFundsWindow = (props) => {
    return (
        <div>It works!</div>
    );
};

// addFunds WINDOW
const createaddFundsWindow = (csrf) => {
    ReactDOM.render(
        <addFundsWindow csrf={csrf} />,
        document.querySelector("#game")
    );
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        csrfToken = result.csrfToken;
        setup(result.csrfToken);
    });
};


$(document).ready(function() {
    getToken();
});


const getMoney = (e) =>{
    e.preventDefault();
    console.dir('adding money');
    const fundField = document.querySelector("#credit").value;
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/addFunds");
    
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');
    
    xhr.onload = () => handleResponse(xhr);
    
    const formData = `fundField=${fundField}&_csrf=${csrfToken}`;
    
    console.dir(formData);
    
    document.querySelector("#credit").value = "";

    xhr.send(formData);
    return false;
};

const handleResponse = (xhr) => {
    console.dir(xhr.response);
};

const setup = function(csrf) {

  console.dir(csrfToken);
    document.getElementById("confirm-purchase").addEventListener("click", getMoney);

    createaddFundsWindow(csrf);

};