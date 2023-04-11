const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);

const blogsHelper = require('../../utils/blogs_helper');
const Blog = require('../../models/blog');

const baseUrl = '/blogs';
beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = blogsHelper.blogs.map(b => new Blog(b));
  const savePromises = blogObjects.map(blog => blog.save());
  await Promise.all(savePromises);
});

describe('access and load blogs from Mongo', () => {
  test('blogs are returned as json', async () => {
    await api
      .get(baseUrl)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 10000); //this third param is to override the default Jest test timeout of 5000 ms

  test('there are six blogs', async () => {
    const response = await api.get(baseUrl);
    expect(response.body).toHaveLength(blogsHelper.blogs.length);
  });

  test('the first blog is about HTTP methods', async () => {
    const response = await api.get(baseUrl);
    const titles = response.body.map(r => r.title);
    expect(titles).toContain('TDD harms architecture');
  });

  test('there is an id property in a blog object', async () => {
    const response = await api.get(baseUrl);
    const firstBlog = response.body[0];
    expect(firstBlog.id).toBeDefined();
  });
});

describe('add new blog to Mongo', () => {
  test('can add a blog', async () => {
    const blog = {
      title: 'Tesla Cuts Price Again!',
      author: 'Elon Musk',
      url: 'tesla.com',
      likes: '288'
    };
    await api
      .post(baseUrl)
      .send(blog)
      .expect(201);

    const response = await api.get(baseUrl);
    const allBlogs = response.body;
    const titles = allBlogs.map(b => b.title);
    expect(allBlogs.length).toBe(blogsHelper.blogs.length + 1);
    expect(titles).toContain('Tesla Cuts Price Again!');
  });
});

describe('blog likes field can be omitted', () => {
  test('likes will be default to 0', async () => {
    await api
      .post(baseUrl)
      .send({
        title: 'MPW Returns 14% Dividend',
        author: 'Yahoo Finance',
        url: 'finance.yahoo.com',
      });
    const response = await api.get(baseUrl);
    const newBlog = response.body.find(b => b.title === 'MPW Returns 14% Dividend');
    expect(newBlog.likes).toBe(0);
  });
});

describe('title and url are required', () => {
  test('save a blog without title will fail', async () => {
    await api
      .post(baseUrl)
      .send({
        author: 'Yahoo Finance',
        url: 'finance.yahoo.com',
      })
      .expect(400);
  });

  test('save a blog without url will fail', async () => {
    await api
      .post(baseUrl)
      .send({
        title: 'Dummy post',
        author: 'Yahoo Finance',
        likes: 999999,
      })
      .expect(400);
  });
});

describe('Delete a blog', () => {
  test('can delete blog', async () => {
    const response = await api.get(baseUrl);
    const id = response.body[2].id;
    await api
      .delete(`${baseUrl}/${id}`)
      .expect(204);
    const newRes = await api.get(baseUrl);
    const blog = newRes.body.find(b => b.id === id);
    expect(blog).toBeUndefined();
    await api
      .get(`${baseUrl}/${id}`)
      .expect(400);
  });
});

describe('Update a blog', () => {
  test('fails if id is wrong', async () => {
    const id = 'some_bad_id';
    await api
      .put(`${baseUrl}/${id}`)
      .send({
        'title': 'Stock Markt Update',
        'author': 'Tom King',
        'url': 'bloomberg.com',
        'likes': 1024
      })
      .expect(400);
  });

  test('blog is updated', async () => {
    const response = await api.get(baseUrl);
    const id = response.body[2].id;
    await api
      .put(`${baseUrl}/${id}`)
      .send({
        'title': 'Stock Markt Update',
        'author': 'Tom King',
        'url': 'bloomberg.com',
        'likes': 1024
      })
      .expect(200);
    const newRes = await api.get(baseUrl);
    expect(newRes.body.length).toBe(response.body.length);
    const titles = newRes.body.map(b => b.title);
    const updated = newRes.body.find(b => b.id === id);
    expect(titles).toContain('Stock Markt Update');
    expect(updated.likes).toBe(1024);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
