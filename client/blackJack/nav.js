let csrfToken;

const NavWindow = (props) => {
    return (
            
    <div id="navWrapper">

      <nav><a href="/login"><img id="logo" src="/assets/img/bjIcon.png" alt="face logo"/></a>
        <div class="navlink"><a href="/blackJack">BLACKJACK</a></div>
        <div class="navlink"><a href="/rules">RULES</a></div>
        <div class="navlink"><a href="/addFunds">ADD FUNDS</a></div>
        <div class="navlink"><a href="/account">ACCOUNT</a></div>  
        <div class="navlink"><a href="/logout">LOG OUT</a></div>    
      </nav>
        
    </div>
    
    );
};

const createNavWindow = (csrf) => {
    ReactDOM.render(
        <NavWindow csrf={csrf} />,
        document.querySelector("#navReact")
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
    
    createNavWindow(csrf);

};
