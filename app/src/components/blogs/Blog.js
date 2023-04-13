import { useState } from 'react';

export const Blog = props => {
  const { blog } = props;
  // const [blog, setBlog] = useState(props.blog);
  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  const onLikeClick = () => {
    props.updateBlog({
      ...blog,
      likes: blog.likes + 1
    });
  };

  const handleRemove = () => {
    const confirm = window.confirm(`Remove blog: ${blog.title} by ${blog.author}`);
    if (confirm) {
      props.removeBlog(blog.id);
    }
  };

  return (
    <div className='blog'>
      <div>
        <label>{blog.title}</label>
        <button className='button' onClick={toggle}>{show ? 'Hide' : 'Show'}</button>
      </div>
      {show &&
        <div>
          <div>
            <label>Url: </label>
            {blog.url}
          </div>
          <div>
            <label className='likes'>{`Likes: ${blog.likes}`}</label>
            <button className='button' onClick={onLikeClick}>Like</button>
          </div>
          <div>{`Author: ${blog.author}`}</div>
          {props.name === blog.author &&
            <button className='button remove-button warn' onClick={handleRemove}>
              Remove
            </button>
          }
        </div>
      }
    </div>
  );
};
