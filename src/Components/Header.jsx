import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    user: undefined,
  }

  async componentDidMount() {
    await getUser().then((user) => this.setState({ user }));
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        {
          (user)
            ? <span data-testid="header-user-name">{user.name}</span>
            : <span>Carregando...</span>
        }
      </header>
    );
  }
}

export default Header;
