const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const jwt = require('jsonwebtoken')
// const Sequelize = require('sequelize');

const db = require('./config/database');

db.authenticate()
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log('Error: ' + err));

const app = express();

app.engine('hbs', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(flash());

// app.use((req, res, next) => {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   next();
// });

app.use((req, res, next)=>{
  // if there's a flash message in the session request, make it available in the response, then delete it
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))


// app.get('/user', (req, res) => res.render('user', {layout : 'adm'}));
app.get('/strategy', (req, res) => res.render('strategy'));
app.get('/contactUs', (req, res) => res.render('contact'));

app.get('/clients', (req, res) => {
  res.render('clients', { messages: req.flash('success_msg') });
  // console.log(messages);
});

// app.get('/clients', (req, res) => {
//   res.render('clients', {sessionFlash: res.locals.sessionFlash})
// });

app.get('/register', (req, res) => res.render('register'));

// app.get('/admins', (req, res)=>res.render('admin', {layout : 'adm'}));

// app.get('/register', (req, res) => db
//   .query('SELECT allow FROM allowreg where allow = true', { raw: true })
//   .then(allow => {
//     if (allow.get('allow') === true){
//       res.render('register');
//     }

//     else if(allow.get('allow') === false){
//       res.render('clients');
//     }
//   }
// ));

app.get('/', (req, res) => res.render('cover'));

app.post('/contactUs', require('./routes/inquiries'));

// User routes
app.use('/users', require('./routes/users'));
// app.use('/', require('./routes/users'));

// Deposit routes
// app.use('/deposit', require('./routes/deposits'));

// Withdrawal routes
app.use('/admins', require('./routes/admins'));
// app.use('/admins', require('./routes/withdrawals'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
