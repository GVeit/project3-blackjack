let csrfToken;

const AccountWindow = (props) => {
    return (
            
    <div id="rulesWrapper">

        <h1>It works</h1>
        
    </div>
    
    );
};

const createAccountWindow = (csrf) => {
    ReactDOM.render(
        <AccountWindow csrf={csrf} />,
        document.querySelector("#account-wrapper")
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
