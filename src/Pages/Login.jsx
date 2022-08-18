import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

const minLength = 3;

class Login extends React.Component {
state = {
  userMinLength: false,
  userName: '',
  userPassword: '',
  loading: false,
  login: false,
}

  handleUserName = ({ target }) => {
    const { value } = target;
    if (value.length >= minLength) {
      this.setState({
        userMinLength: true,
        userName: value,
        userPassword: value });
    } else {
      this.setState({
        userMinLength: false,
      });
    }
  }
  // implementar em handleUserName a logica de userName e userPassword devem ser as duas liberadas para o login

   login = async () => {
     const { userName, userPassword } = this.state;
     this.setState({ loading: true }, async () => {
       await createUser({ name: userName, password: userPassword });
       this.setState({ login: true });
     });
   }

   render() {
     const { userMinLength, loading, login } = this.state;

     return (
       <div data-testid="page-login">
         {loading === false ? (
           <div>
             <h1>Login</h1>
             <form>
               <input
                 type="text"
                 name="userName"
                 placeholder="Username"
                 onChange={ this.handleUserName }
                 data-testid="login-name-input"
               />
               <input
                 type="password"
                 name="password"
                 placeholder="Password"
                 onChange={ this.handleUserName }
               />
               <button
                 type="submit"
                 disabled={ !userMinLength }
                 onClick={ this.login }
                 data-testid="login-submit-button"
               >
                 Entrar
               </button>
             </form>
           </div>
         ) : (
           <div>
             {login === true ? <Redirect to="/search" /> : <h1> Carregando... </h1> }
           </div>
         )}
       </div>
     );
   }
}

export default Login;
