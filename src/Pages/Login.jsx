import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
