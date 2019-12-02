let csrfToken;

const AccountWindow = (props) => {
    return (
            
        
    
    );
};

const createAccountWindow = (csrf) => {
    ReactDOM.render(
        <AccountWindow csrf={csrf} />,
        document.querySelector("#stat-wrapper")
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
