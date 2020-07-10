const express = require('express');
const morgan =require("morgan")


const actionRouter = require("./routers/actionRouter")
const projectRouter = require("./routers/projectRouter")

const server = express();


server.use(morgan("dev"))
server.use(express.json())


server.use("/api/action", actionRouter)
server.use("/api/project", projectRouter)


server.get('/', (req, res) => {
  res.send('API Test');
});


module.exports = server;