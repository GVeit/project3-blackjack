let csrfToken;

// addFunds WINDOW
const addFundsWindow = (props) => {
    return (
        <div class="payment">
            <form>
                <div class="form-group owner">
                    <label for="owner">Owner</label>
                    <input type="text" class="form-control" id="owner"></input>
                </div>
                <div class="form-group CVV">
                    <label for="cvv">CVV</label>
                    <input type="text" class="form-control" id="cvv"></input>
                </div>
                <div class="form-group" id="card-number-field">
                    <label for="cardNumber">Card Number</label>
                    <input type="text" class="form-control" id="cardNumber"></input>
                </div>
                <div class="form-group" id="expiration-date">
                    <label>Expiration Date</label>
                    <select>
                        <option value="01">January</option>
                        <option value="02">February </option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                    <select>
                        <option value="16"> 2019</option>
                        <option value="17"> 2020</option>
                        <option value="18"> 2021</option>
                        <option value="19"> 2022</option>
                        <option value="20"> 2023</option>
                        <option value="21"> 2024</option>
                    </select>
                </div>
                <div class="form-group" id="credit_cards">
                    <img src="assets/img/visa.jpg" id="visa"></img>
                    <img src="assets/img/mastercard.jpg" id="mastercard"></img>
                    <img src="assets/img/amex.jpg" id="amex"></img>
                </div>
                <div class="form-group" id="pay-now">
                    <button type="submit" class="btn btn-default" id="confirm-purchase" style="width: 100%;">Confirm</button>
                </div>
            </form>
        </div>
    );
};

// addFunds WINDOW
const createaddFundsWindow = (csrf) => {
    ReactDOM.render(
        <addFundsWindow csrf={csrf} />,
        document.querySelector("#reactCredit")
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
    document.getElementById("addedFund").innerHTML = "Successfully added to balance";

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