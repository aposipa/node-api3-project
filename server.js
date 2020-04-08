const express = require('express');
const helmet = require('helmet');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter.js');

const server = express();

server.use(helmet());
server.use(logger)
server.use(express.json());

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const { method, originalUrl } = req;
  const date = Date.now();
  timeStamp = date.toString();
  console.log(`${method} to ${originalUrl} @ ${timeStamp}`);
  next();
}

module.exports = server;
