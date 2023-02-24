const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT;

//config
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.REACT_APP_URL
}));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})