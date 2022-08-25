import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/header';
import Loading from '../Components/loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    loading: false,
    userName: '',
    email: '',
    description: '',
    image: '',
  }

  componentDidMount = () => {
    this.getUser();
  }

  getUser = async () => {
    this.setState({ loading: true });
    const response = await getUser();
    this.setState({
      userName: response.userName,
      email: response.email,
      description: response.description,
      image: response.image,
      loading: false,
    });
  }

  render() {
    const {
      userName,
      email,
      description,
      image,
      loading,
    } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading === true ? <Loading /> : null }
        <h1>Profile</h1>
        <image data-testid="edit-input-image" src={ image } alt={ userName } />
        <Link to="/profile/edit">
          <button type="button">Editar perfil</button>
        </Link>
        <p>
          Nome:
          {' '}
          <span>{userName}</span>
        </p>
        <p>
          Email:
          {' '}
          <span>{email}</span>
        </p>
        <p>
          Description:
          {' '}
          <span>{description}</span>
        </p>
      </div>
    );
  }
}

export default Profile;
