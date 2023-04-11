var collection = require('lodash/collection');
var object = require('lodash/object');

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
];

const dummy = blogs => {
  return blogs.length;
};

const totalLikes = blogs => {
  return blogs.reduce((acc, cur) => {
    return acc += cur.likes ?? 0;
  }, 0);
};

const favoriteBlog = blogs => {
  return blogs.reduce((acc, curr) => {
    return curr.likes > acc.likes ? curr : acc;
  }, { likes: 0 });
};

const mostBlogs = blogs => {
  const list = object.toPairs(collection.countBy(blogs, 'author'));
  return list.reduce((acc, curr) => {
    const [author, numberOfBlogs] = curr;
    if (numberOfBlogs > acc.blogs) {
      return { author, blogs: numberOfBlogs };
    }
  }, { blogs: 0 });
};

const mostLikes = blogs => {
  const authorRatings = blogs.reduce((acc, curr) => {
    if (Object.keys(acc).find(a => a === curr.author)) {
      return {
        ...acc,
        [curr.author]: acc[curr.author] + curr.likes
      };
    }
    return {
      ...acc,
      [curr.author]: curr.likes
    };
  }, {});
  const list = object.toPairs(authorRatings);

  return list.reduce((acc, curr) => {
    const [author, likes] = curr;
    if (likes > acc.likes) {
      return { author, likes };
    }
    return acc;
  }, { likes: 0 });
};

module.exports = {
  blogs,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
