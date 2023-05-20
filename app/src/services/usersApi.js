import axios from 'axios';

const baseUrl = '/users';

export const signupUser = async (params) => {
  const resp = await axios.post(baseUrl, params);
  return resp.data;
};

export const getUsers = async () => {
  const resp = await axios.get(baseUrl);
  return resp.data;
};
