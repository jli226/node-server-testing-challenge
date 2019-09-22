const express = require("express");

const heroesRouter = require("../heroes/heroes-router.js");

const server = express();

server.use(express.json());

server.use("/api/heroes", heroesRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running!" });
});

module.exports = server;
