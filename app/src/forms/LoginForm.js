import './LoginForm.scss';

export const LoginForm = props => {
  return (
    <form className='login-form' onSubmit={props.handleLogin}>
      <h2 className='login-header'>Please login to application</h2>
      <div className='credentials'>
        <div className='username'>
          <label>Username: </label>
          <input
            value={props.username}
            name='username'
            onChange={props.setUsername}
          />
        </div>
        <div className='password'>
          <label>Password: </label>
          <input
            type='password'
            value={props.password}
            name='password'
            onChange={props.setPassword}
          />
        </div>
      </div>
      <button className='submit-button' type='submit'>Submit</button>
    </form>
  )
};
