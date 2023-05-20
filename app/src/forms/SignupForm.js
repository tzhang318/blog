import { useFormik } from 'formik';
import { signupUser } from '../services/usersApi';

export const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      name: '',
      password: ''
    },
    onSubmit: async (values) => {
      const user = await signupUser(values);
      if (user.name === values.name) {
        window.location = '/login';
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>Signup Form</label>
      <input
        id="username"
        name="username"
        type="username"
        placeholder='username'
        onChange={formik.handleChange}
        value={formik.values.username}
      />
      <input
        id="name"
        name="name"
        type="name"
        placeholder='name'
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <input
        id="password"
        name="password"
        type="password"
        placeholder='password'
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <button type='submit'>Signup</button>
    </form>
  );
};
