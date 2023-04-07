const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs);
  });
});

blogsRouter.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then(blog => {
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).send({ error: 'blog not found.' }).end();
      }
    })
    .catch(error => next(error));
});

blogsRouter.get('/info', (req, res, next) => {
  Blog.estimatedDocumentCount()
    .then(count => {
      res.send(`There are ${count} blogs saved, ${Date()}`);
    })
    .catch(e => next(e));
});

// blogsRouter.put('/:id', (req, res, next) => {
//   const { name, number } = req.body
//   Person.findByIdAndUpdate(
//     req.params.id,
//     { name, number },
//     { new: true, runValidators: true, context: 'query' }
//   ).then(result => {
//     res.json(result)
//   })
//     .catch(e => {
//       next(e)
//       return e
//     })
// })

// blogsRouter.delete('/:id', (req, res, next) => {
//   Person.findByIdAndRemove(req.params.id)
//     .then(result => {
//       if (!result) {
//         throw({ error: {
//           name: 'NO_RECORD_ERROR',
//           message: 'Record not found'
//         } })
//       } else {
//         res.status(204).end()
//       }
//     })
//     .catch(e => {
//       next(e)
//       console.log('delete error: ', e)
//       return e
//     })
// })

blogsRouter.post('/', (req, res, next) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  });
  blog.save()
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(e => next(e));
});

module.exports = blogsRouter;
