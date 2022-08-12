const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function registerHandler(req, res, next) {
  const { username, password } = req.body;

  if ( password === "" ) {
    res.statusCode = 400 // error
    res.send({
      ok: false,
      msg: "Invalid password"
    })

    return
  }

  if ( username === "" ) {
    res.statusCode = 400 // error
    res.send({
      ok: false,
      msg: "Invalid username"
    })

    return
  }

  await prisma.tdl_users.create({
    data: {
      Username : username,
      Password : password
    }
  }).then(() => {
    // registro correcto
    res.statusCode = 200
    res.send({
      ok: true,
      msg: "Registered succesfully"
    })
  }).catch(e => {
    // error de registro
    res.statusCode = 409
    res.send({
      ok: false,
      msg: ""
    })
  })
}

async function loginHandler(req, res, next) {

}