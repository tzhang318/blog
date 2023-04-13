import axios from "axios";

const baseUrl = '/blogs';
let token = null;

export const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

export const getBlogs = async () => {
  const config ={ 
    headers: {
      Authorization: token
    }
  };
  const res = await axios.get(baseUrl, config);
  return res.data;
};

export const createBlog = async (data) => {
  const config ={ 
    headers: {
      Authorization: token
    }
  };
  const res = await axios.post(baseUrl, data, config);
  return res.data;
};

export const updateBlog = async (id, blog) => {  const config ={ 
    headers: {
      Authorization: token
    }
  };
  const res = await axios.put(`${baseUrl}\${id}`, blog, config);
  return res.data;
};
