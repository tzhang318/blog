import { useState } from 'react';

import './Blog.scss';

export const CreateBlog = props => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleClick = () => {
    props.createBlog({
      title,
      author,
      url
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div className='create-blog'>
      <h2>Create blog:</h2>
      <div className='title'>
        <label>Title: </label>
        <input
          name='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className='author'>
        <label>Author: </label>
        <input
          name='author'
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </div>
      <div className='url'>
        <label>Url: </label>
        <input
          name='url'
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </div>
      <button className='button create-button' onClick={handleClick}>Create</button>
    </div>
  );
};
