const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");

const { StatusCodes } = require('http-status-codes')

function validateFields(username, password) {
  if ( password == null || password === "" ) {
    return { ok: false, msg: "Invalid password" }
  }

  if ( username == null || username === "" ) {
    return { ok: false, msg: "Invalid username" }
  }

  return { ok: true }
}

async function registerHandler(req, res, next) {
  
  const { username, password } = req.body;

  var check = validateFields(username, password);
  if ( check.ok === false ) {
    res.statusCode = StatusCodes.BAD_REQUEST;
    res.send(check);
    return
  }

  // INSERT INTO tdl_users VALUES(..., ...)
  await prisma.tdl_users.create({
    data: {
      username : username,
      password : password
    }
  }).then(() => {
    // registro correcto
    res.statusCode = StatusCodes.OK
    res.send({
      ok: true,
      msg: "Registered succesfully"
    })
  }).catch(e => {
    // error de registro
    res.statusCode = StatusCodes.CONFLICT
    res.send({
      ok: false,
      msg: e.msg
    })
  })
}

async function loginHandler(req, res, next) {
  const { username, password } = req.body;

  var check = validateFields(username, password);
  if ( check.ok === false ) {
    res.statusCode = StatusCodes.BAD_REQUEST;
    res.send(check);
    return
  }

  await prisma.tdl_users.findUniqueOrThrow({
    where: {
      username
    }   
  })
  .then(async u => {
    const validPassword = await bcrypt.compare(
      password,
      u.password
    );

    if (validPassword)
    {

      var token = jwt.sign({ name: username }, process.env.TOKEN_SECRET, { expiresIn: '720h' });

      res.statusCode = StatusCodes.OK
      res.send({
        ok: true,
        msg: "logged in succesfully",
        token
      })
    }
    else
    {
      res.statusCode = StatusCodes.UNAUTHORIZED
      res.send({
        ok: false,
        msg: "Incorrect username or password"
      })
    }
  })
  .catch(e => {
    console.log(e.message)
    res.statusCode = StatusCodes.UNAUTHORIZED
    res.send({
      ok: false,
      msg: "Incorrect username or password"
    })
  })
}

module.exports = {
  registerHandler,
  loginHandler
}