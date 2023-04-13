import { useEffect, useState } from "react";
import { getBlogs, createBlog } from "../../services/blogsApi";
import { CreateBlog } from "./CreateBlog";
import { Blog } from "./Blog";
import { Notification } from "../Notification";

export const Blogs =  props => {
  const [blogs, setBlogs] = useState([]);
  const [addedMsg, setMessage] = useState('');

  useEffect(() => {
    getBlogs().then(blogs=>{
      setBlogs(blogs);
    });
  }, []);

  const handleCreateBlog = blogData => {
    createBlog(blogData).then(b=>{
      setBlogs(blogs.concat(b));
      setMessage(`a new blog ${b.title} by ${b.author} added`);
      setTimeout(() => {
        setMessage('');
      }, 5000);
  });
  };

  return (
    <div className="blogs">
      <h2>blogs</h2>
      {addedMsg && <Notification message={addedMsg} success />}
      <p>{`${props.name} is logged in`}</p>
      <CreateBlog createBlog={handleCreateBlog} />
      {
        blogs.map(b => (
          <Blog key={b.id} blog={b} />
        ))
      }
    </div>
  )
};
