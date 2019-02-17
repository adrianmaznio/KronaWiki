const bodyParser = require('body-parser');
const express = require('express');
var session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
const path = require("path");
var async = require('async');
const errorHandler = require('errorhandler');

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://amaznio:adrian134@ds029811.mlab.com:29811/amazniowiki';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var objectID = mongoose.Types.ObjectId();


//Items
// const weapon = require('./routes/weapon.routes'); // Imports routes for the products
const weapon_controller = require('./controllers/weapon.controller');
const armor_controller = require('./controllers/armor.controller');
const consumable_controller = require('./controllers/consumable.controller');
//Other
const guide_controller = require('./controllers/guide.controller');
const newspost_controller = require('./controllers/newspost.controller');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

const app = express();

//App configuration
app.use(cookieParser());
app.use(session({
  secret: 'secret123',
  saveUninitialized: true,
  resave: true
}));

//express messages middleware
app.use(require('connect-flash')());
app.use(function(req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
// express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
      root = namspace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namspace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/controllers'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/routes'));

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//Routes
// app.use('/item', item);

//Routes
app.get('/', function(req, res) {
  res.render('home');
});
app.get('/home', function(req, res) {
  res.render('home');
});
app.get('/character/items/weapons', function(req, res) {
  db.collection('weapons').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('weapons', {
      weapons: result
    })
  })
});
app.get('/character/items/weapons/:weaponID/details', urlencodedParser, weapon_controller.weapon_details);
app.post('/dashboard/items/weapons/create', urlencodedParser, weapon_controller.weapon_create);
app.post('/dashboard/items/weapons/update', urlencodedParser, weapon_controller.weapon_update);
app.post('/dashboard/items/weapons/delete', urlencodedParser, weapon_controller.weapon_delete);

app.get('/character/items/armor', function(req, res) {
  db.collection('armors').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('armor', {
      armor: result
    })
  })
});
app.get('/character/items/armor/:armorID/details', urlencodedParser, armor_controller.armor_details);
app.post('/dashboard/items/armor/create', urlencodedParser, armor_controller.armor_create);
app.post('/dashboard/items/armor/update', urlencodedParser, armor_controller.armor_update);
app.post('/dashboard/items/armor/delete', urlencodedParser, armor_controller.armor_delete);

app.get('/dashboard/items', function(req, res) {
  var locals = {};
  var tasks = [
    // Load Weapons
    function(callback) {
      db.collection('weapons').find({}).toArray(function(err, weapons) {
        if (err) return callback(err);
        locals.weapons = weapons;
        callback();
      });
    },
    // // Load Armor
    function(callback) {
      db.collection('armors').find({}).toArray(function(err, armor) {
        if (err) return callback(err);
        locals.armor = armor;
        callback();
      });
    }
  ];

  async.parallel(tasks, function(err) { //This function gets called after the two tasks have called their "task callbacks"
    if (err) return next(err); //If an error occurred, let express handle it by calling the `next` function
    // Here `locals` will be an object with `products` and `newsposts` keys
    // Example: `locals = {products: [...], newsposts: [...]}`
    res.render('manageitems', locals);
  });
});

// app.get('/dashboardnewsposts', function(req, res) {
//     db.collection('newsposts').find().toArray((err, result) => {
//         if (err) return console.log(err)
//         console.log('Rendering dashboard_newsposts.ejs');
//         res.render('dashboard_newsposts', {
//             newsposts: result
//         })
//     })
// });
//
// app.post('/dashboardnewsposts/create', urlencodedParser, newspost_controller.newspost_create);
// app.post('/dashboardnewsposts/update', urlencodedParser, newspost_controller.newspost_update);
// app.post('/dashboardnewsposts/delete', urlencodedParser, newspost_controller.newspost_delete);

//Guides
app.get('/guide/', function(req, res) {
  res.render('guide');
});
app.get('/guide/beginners', function(req, res) {
  res.render('beginnersguide');
});
app.get('/guide/leveling', function(req, res) {
  res.render('levelingguide');
});

app.get('/guide/classes', function(req, res) {
  res.render('classesguide');
});

app.get('/guide/everpower', function(req, res) {
  res.render('everpowerguide');
});

app.get('/guide/crafting', function(req, res) {
  res.render('craftingguide');
});

app.get('/guide/spirits', function(req, res) {
  res.render('spiritsguide');
});

//Resources
app.get('/guide/awakes', function(req, res) {
  res.render('awakestable');
});

app.get('/guide/highly-detailed-fully-graphical-guide', function(req, res) {
  res.render('highly-detailed-fully-graphical-guide');
});

// app.get('/guides/:guideID/:guideName', urlencodedParser, guide_controller.guide_details);
// app.post('/guides/create', urlencodedParser, guide_controller.guide_create);
// app.post('/guides/update', urlencodedParser, guide_controller.guide_update);
// app.post('/guides/delete', urlencodedParser, guide_controller.guide_delete);
//
app.get('/dashboard/items/consumables/:consumableID/details', urlencodedParser, consumable_controller.consumable_details);
app.post('/dashboard/items/consumables/create', urlencodedParser, consumable_controller.consumable_create);
app.post('/dashboard/items/consumables/update', urlencodedParser, consumable_controller.consumable_update);
app.post('/dashboard/items/consumables/delete', urlencodedParser, consumable_controller.consumable_delete);


//
app.listen(process.env.PORT || 4000, () => {
  console.log('Wiki is up and running!');
});