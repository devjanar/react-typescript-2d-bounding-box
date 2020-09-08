const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
//routes
const boundingbox  = require( './routes/Boundingbox');
const app = express();
// db
mongoose
    .connect("mongodb://localhost:27017/box", {
        useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true  })
    .then(() => console.log('DB connected'))
    .catch(err => {
        console.log(err);
    });
// middlewares
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000'}));
// routes middleware
app.use('/api',boundingbox);
// port
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});