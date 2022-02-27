const express = require('express');
const app = express();
const dbConn = require('./db');
const PORT = process.env.PORT || 3000;
const authRoute = require('./routes/Auth.route');
const bodyParser = require('body-parser');

// middlewares
app.use(bodyParser.json());

dbConn.connectToDB()
    .then((status) => {
        console.log(status);
        app.listen(PORT, () => { console.log("server is running on port " + PORT) });
    })
    .catch(status => {
        console.log(status);
    })

app.use('/auth', authRoute);