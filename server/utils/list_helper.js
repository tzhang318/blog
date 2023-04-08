var collection = require('lodash/collection');
var object = require('lodash/object');

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
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
