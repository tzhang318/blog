const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch(error) {
    return res.status(400).json({ error })
  }
});

blogsRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.delete(req.params.id);
    return res.status(200);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = blogsRouter;
