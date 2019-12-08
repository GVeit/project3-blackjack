const models = require('../models');

const Account = models.Account;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const signupPage = (req, res) => {
  res.render('signup', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const addFunds = (req, res) => {
  res.render('addFunds');
};

const increaseMoney = (req, res) =>{
    
    console.dir('increase');
    //grab the current account from mongo
    Account.AccountModel.findByUsername(req.session.account.username, (err, doc) => {
        let account = doc;
      
      console.dir(req.body.fundField);
      console.dir(parseFloat(req.body.fundField));
        
        account.fund += parseFloat(req.body.fundField);
        
        let saveMoney = account.save();
        
        saveMoney.then(() => {
        console.dir("success");
           res.json({message: 'success'}); 
        });
        
        saveMoney.catch((err) => {
            res.json({err});
        });
    });

    
};

const getFunds = (req, res) => {
    Account.AccountModel.findByUsername(req.session.account.username, (err, doc) =>{
        res.json({funds: doc.fund});
    });
};

const getWonTotal = (req, res) => {
    Account.AccountModel.findByUsername(req.session.account.username, (err, doc) =>{
        res.json({wonTotal: doc.wonTotal});
    });
};

const increaseWonTotal = (req, res) =>{
    
    console.dir('increase');
    //grab the current account from mongo
    Account.AccountModel.findByUsername(req.session.account.username, (err, doc) => {
        let account = doc;
      
      //console.dir(req.body.fundField);
     // console.dir(parseFloat(req.body.fundField));
        
        account.wonTotal += 1;
        
        
        let save = account.save();
        
        save.then(() => {
        console.dir("success");
           res.json({message: 'success'}); 
        });
        
        save.catch((err) => {
            res.json({err});
        });
    });

    
};

const getBjTotal = (req, res) => {
    Account.AccountModel.findByUsername(req.session.account.username, (err, doc) =>{
        res.json({bjTotal: doc.bjTotal});
    });
};

const increaseBjTotal = (req, res) =>{
    
    console.dir('increase');
    //grab the current account from mongo
    Account.AccountModel.findByUsername(req.session.account.username, (err, doc) => {
        let account = doc;
      

        account.bjTotal += 1;
        

        let save = account.save();
        
        save.then(() => {
        console.dir("success");
           res.json({message: 'success'}); 
        });
        
        save.catch((err) => {
            res.json({err});
        });
    });

    
};


const getMoneyTotal = (req, res) => {
    Account.AccountModel.findByUsername(req.session.account.username, (err, doc) =>{
        res.json({wonMoneyTotal: doc.wonMoneyTotal});
    });
};

const increaseMoneyTotal = (req, res) =>{
    
    console.dir('increase');
    //grab the current account from mongo
    Account.AccountModel.findByUsername(req.session.account.username, (err, doc) => {
        let account = doc;
      

        account.wonMoneyTotal += parseInt(string, req.query.fundField);

        
        let save = account.save();
        
        save.then(() => {
        console.dir("success");
           res.json({message: 'success'}); 
        });
        
        save.catch((err) => {
            res.json({err});
        });
    });

    
};

const blackJack = (req, res) => {
  res.render('blackJack');
};

const login = (request, response) => {
  const req = request;
  const res = response;

    // force cast to strings to cover some security flaws
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/blackJack' });
  });
};

const rules = (req, res) => {
    res.render('rules');
};

const account = (req, res) => {
    res.render('account');
};

const nav = (req, res) => {
    res.render('nav');
};


const signup = (request, response) => {
  const req = request;
  const res = response;

    // cast to strings to cover up some security flaws
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };
      
      

    const newAccount = new Account.AccountModel(accountData);
    const savePromise = newAccount.save();

        // savePromise.then(() => res.json({ redirect: '/maker' }));

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/blackJack' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }
      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};


module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.getFunds = getFunds;
module.exports.addFunds = addFunds;
module.exports.blackJack = blackJack;
module.exports.rules = rules;
module.exports.nav = nav;
module.exports.account = account;
module.exports.signupPage = signupPage;
module.exports.signup = signup;
module.exports.getToken = getToken;
module.exports.wonTotal = getWonTotal;
module.exports.increaseWonTotal = increaseWonTotal;
module.exports.bjTotal = getBjTotal;
module.exports.increaseBjTotal = increaseBjTotal;
module.exports.moneyTotal = getMoneyTotal;
module.exports.increaseMoneyTotal = increaseMoneyTotal;
module.exports.increaseMoney = increaseMoney;