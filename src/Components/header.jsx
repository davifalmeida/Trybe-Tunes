import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            ? (
              <div>
                <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
                <Link data-testid="link-to-favorites" to="/favorites"> Favorites </Link>
                <Link data-testid="link-to-album" to="/album"> Album </Link>
                <Link data-testid="link-to-search" to="/search"> Search </Link>
                <span data-testid="header-user-name">{user.name}</span>
              </div>
            )
            : <span>Carregando...</span>
        }
      </header>
    );
  }
}

export default Header;
