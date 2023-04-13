import { useEffect, useState, useRef } from 'react';
import { getBlogs, createBlog, updateBlog, removeBlog } from '../../services/blogsApi';
import { Togglable } from '../toggles/Togglable';
import { CreateBlog } from './CreateBlog';
import { Blog } from './Blog';
import { Notification } from '../Notification';

export const Blogs =  props => {
  const [blogs, setBlogs] = useState([]);
  const [addedMsg, setMessage] = useState('');
  const blogRef = useRef();

  useEffect(() => {
    getBlogs().then(blogs => {
      setBlogs(blogs);
    });
  }, []);

  const handleCreateBlog = blogData => {
    createBlog(blogData).then(b => {
      setBlogs(blogs.concat(b));
      blogRef.current.toggle();  // access refed components property
      setMessage(`a new blog ${b.title} by ${b.author} added`);
      setTimeout(() => {
        setMessage('');
      }, 5000);
    });
  };

  const handdleUpdateBlog = blogDate => {
    updateBlog(blogDate).then(res => setBlogs(res));
  };

  const handleRemoveBlog = id => {
    removeBlog(id).then(res => {
      setBlogs(res);
    });
  };

  return (
    <div className="blogs">
      <h2>blogs</h2>
      {addedMsg && <Notification message={addedMsg} success />}
      <p>{`${props.name} is logged in`}</p>
      <Togglable
        buttonLabel='Add blog'
        cancelLabel='Cancel'
        ref={blogRef}
      >
        <CreateBlog createBlog={handleCreateBlog} />
      </Togglable>
      {
        blogs.sort((a,b) => (b.likes - a.likes)).map(b => (
          <Blog
            key={b.id}
            blog={b}
            name={props.name}
            updateBlog={handdleUpdateBlog}
            removeBlog={handleRemoveBlog}
          />
        ))
      }
    </div>
  );
};
