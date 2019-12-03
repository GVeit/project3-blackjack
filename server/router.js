const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/login', controllers.Account.loginPage);
  app.post('/login', controllers.Account.login);
  app.get('/signup', controllers.Account.signupPage);
  app.post('/signup', controllers.Account.signup);
  app.get('/logout', controllers.Account.logout);
  app.get('/addFunds', controllers.Account.addFunds);
  app.post('/addFunds', controllers.Account.increaseMoney);
  app.get('/getFunds', controllers.Account.getFunds);
  app.get('/blackJack', controllers.Account.blackJack);
  app.get('/rules', controllers.Account.rules);
  app.get('/nav', controllers.Account.nav);
  app.get('/account', controllers.Account.account);
  app.get('/', controllers.Account.loginPage);
};

module.exports = router;

