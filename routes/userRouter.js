var express = require('express')

var userRouter = express.Router();

/*
    recurso --> acciones o datos en la pagina web (solicitar hacer login, hacer mismamente el login/register)
    -->tiene que ver con el comprobaciones con el backend

  GET -> pedir un recurso
  POST -> subir/crear un recurso
  PUT -> modificar un recurso
  DELETE -> borrar un recurso
*/

userRouter.post("/register", registerHandler);
userRouter.post("/login", loginHandler)