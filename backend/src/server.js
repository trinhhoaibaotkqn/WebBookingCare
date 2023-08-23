const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv').config();

const { connectDB } = require('./config/connectDatabase');
const route = require("./routes/index");

const app = express();
const port = process.env.PORT || 3000;

//config
app.use(express.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.REACT_APP_URL,
    credentials: true,
}));

//connect database
connectDB();

//init route
route(app);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})