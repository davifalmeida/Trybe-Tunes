import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/header';
import Loading from '../Components/loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    loading: false,
    profile: {},
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const result = await getUser();
      this.setState({
        loading: false,
        profile: result,
      });
    });
  }

  render() {
    const {
      loading,
      profile: {
        name,
        image,
        email,
        description,
      } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Profile</h1>
        { loading === true ? <Loading /> : null }
        <div>
          <img src={ image } alt={ name } data-testid="profile-image" />
          <h2 data-testid="profile-name">
            { name }
          </h2>
          <h2 data-testid="profile-email">
            { email }
          </h2>
          <p data-testid="profile-description">
            { description }
          </p>

          <Link to="/profile/edit">
            <p>Editar perfil</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default Profile;
