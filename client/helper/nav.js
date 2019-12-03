const NavWindow = (props) => {
    return (
            
    <div id="navWrapper">

      <nav><a href="/login"><img id="logo" src="/assets/img/bjIcon.png" alt="face logo"/></a>
        <div className="navlink"><a href="/blackJack">BLACKJACK</a></div>
        <div className="navlink"><a href="/rules">RULES</a></div>
        <div className="navlink"><a href="/addFunds">ADD FUNDS</a></div>
        <div className="navlink"><a href="/account">ACCOUNT</a></div>  
        <div className="navlink"><a href="/logout">LOG OUT</a></div>    
      </nav>
        
    </div>
    
    );
};

const createNavWindow = (csrf) => {
    ReactDOM.render(
        <NavWindow />,
        document.querySelector("#navReact")
    );
};

/* =+=+=+=+=+=+=+=+=+=+=+= */


$(document).ready(function() {
    createNavWindow();
});