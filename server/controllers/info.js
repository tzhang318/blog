const infoRouter = require('express').Router();
const Blog = require('../models/blog');

infoRouter.get('/', async (req, res) => {
  const count = await Blog.estimatedDocumentCount();
  res.send(`There are ${count} blogs saved, ${Date()}`);
});

module.exports = infoRouter;
