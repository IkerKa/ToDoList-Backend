const { PrismaClient } = require('@prisma/client')  //REQUIRE === IMPORT (detalles sensibles de javaS)
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const prisma = new PrismaClient()
const express = require('express')

const app = express()

// Use modules and folders
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var corsOptions = {
    origin: "*", // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
const port = 5000

var userRouter = require('./routes/userRouter')

app.use("/user", userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

