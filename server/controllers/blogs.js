const middleware = require('../utils/middleware');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// error handling is done in middleware by this
// library: express-async-errors
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(400).send({ error: 'blog not found.' }).end();
  }
});

blogsRouter.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body;
  const result = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  );
  res.json(result);
});

blogsRouter.delete('/:id',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res) => {
    const found = await Blog.findById(req.params.id);
    if (!found) {
      res.status(404).json({ error: 'delete blog failed: NOT found' });
    }
    if (!req.user.id || req.user.id.toString() !== found.user?.toString()) {
      res.status(401).json({ error: 'delete blog failed: NOT authorized' }).end();
    } else {
      await Blog.findByIdAndRemove(req.params.id);
      res.status(204).end();
    }
  });

blogsRouter.post('/',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res) =>
  {
    const { body, user } = req;
    if (!body.title || !body.url) {
      res.status(400).end();
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ?? 0,
      user: user.id
    });
    const saved = await blog.save();
    user.blogs = user.blogs.concat(saved.id);
    await user.save();
    res.status(201).json(saved);
  });

module.exports = blogsRouter;
