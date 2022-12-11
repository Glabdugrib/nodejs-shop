const path = require('path');

const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

const User = require('./models/user');

const app = express();
const router = express.Router();

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', './layouts/main')

const adminRoutes = require('./routes/admin');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req, res, next) => {
   res.render('site/home', {
      pageTitle: 'Home',
      url: '/'
   });
});

router.get('/users/index', (req, res, next) => {
   User.fetchAll(users => {
      res.render('site/users', {
         pageTitle: 'Users',
         url: '/users/index',
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
app.use(adminRoutes);

app.use((req, res, next) => {
   res.status(404).render('site/404', { pageTitle: 'Page not found', url: '' });
})

app.listen(port);