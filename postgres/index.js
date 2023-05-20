require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const loginRouter = require('./routes/loginRouter');
const blogsRouter = require('./routes/blogsRouter');
const usersRouter = require('./routes/usersRouter');
const Blog = require('./models/blog');
const User = require('./models/user');

Blog.sync();
User.sync();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/login', loginRouter);
app.use('/blogs', blogsRouter);
app.use('/users', usersRouter);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
