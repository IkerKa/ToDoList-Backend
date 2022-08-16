const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { StatusCodes } = require('http-status-codes')

async function registerHandler(req, res, next) {
  console.log(req.body)
  const { username, password } = req.body;

  if ( password == null || password === "" ) {
    res.statusCode = StatusCodes.BAD_REQUEST// error
    res.send({
      ok: false,
      msg: "Invalid password"
    })

    return
  }

  if ( username == null || username === "" ) {
    res.statusCode = StatusCodes.BAD_REQUEST // error
    res.send({
      ok: false,
      msg: "Invalid username"
    })

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

}

module.exports = {
  registerHandler,
  loginHandler
}