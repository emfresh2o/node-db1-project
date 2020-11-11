const express = require('express');

const accountRouter = require('../api/accountRouter.js');

const server = express();

server.use(express.json());
server.use('/api/accounts', accountRouter);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'The Server in now LIVE!' });
});

module.exports = server;
