const express = require('express');
const path = require('path');
const session = require('express-session');
const handle = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = handle.create({ helpers });

const sess = {
    secret: 'Super secret secret',
    cookie: {maxAge: 36000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
app.use(express,json);
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
sequelize.sync({force:false}).then(()=> {
    app.listen(PORT, () => console.log('Unicorns are listening!'));
});
app.engine('handlebars',hbs.engine);
app.set('view engine', 'handlebars'); 

