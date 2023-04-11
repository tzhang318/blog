const blogsHelper = require('../blogs_helper');

describe('dummy test', () => {
  test('dummy returns array length', () => {
    expect(blogsHelper.dummy(blogsHelper.blogs)).toBe(blogsHelper.blogs.length);
  });
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = blogsHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('totalLikes returns sum of likes from all blogs', () => {
    expect(blogsHelper.totalLikes(blogsHelper.blogs)).toBe(36);
  });

  test('it does not have likes in the blog', () => {
    const noLikeBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        __v: 0
      }
    ];
    expect(blogsHelper.totalLikes(noLikeBlog)).toBe(0);
  });
});

describe('Find the blog with most likes', () => {
  test('find the favorite blog', () => {
    const favorite = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };
    expect(blogsHelper.favoriteBlog(blogsHelper.blogs).likes).toEqual(favorite.likes);
  });
});

describe('Find the author with most blogs', () => {
  test('author that has the most blogs', () => {
    expect(blogsHelper.mostBlogs(blogsHelper.blogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});

describe('Find the author with most likes', () => {
  test('author is liked the most', () => {
    expect(blogsHelper.mostLikes(blogsHelper.blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    });
  });
});
