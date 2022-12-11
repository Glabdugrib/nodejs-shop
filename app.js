const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');

const User = require('./models/user');

const app = express();
const router = express.Router();

// const users = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req, res, next) => {
   res.render('home.ejs', {
      pageTitle: 'Home',
      url: '/'
   });
});

router.get('/users', (req, res, next) => {
   User.fetchAll(users => {
      res.render('users.ejs', {
         pageTitle: 'Users',
         url: '/users',
         users: users
      });
   });
});

router.post('/add-user', (req, res, next) => {
   let user = new User(req.body.username);
   user.save();

   // users.push({
   //    username: req.body.username
   // });
   res.status(302).redirect('/users');
});

app.use(router)

app.use((req, res, next) => {
   res.status(404).render('404.ejs', { pageTitle: 'Page not found', url: '' });
})

app.listen(3000);