const express = require('express');

const path = require('path');

const siteRoutes = require('./routes/site');
const rootDir = require('./util/path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(siteRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
})

app.listen(3000);