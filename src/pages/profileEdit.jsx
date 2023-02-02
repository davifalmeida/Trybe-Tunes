import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Components/header';
import Loading from '../Components/loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
state = {
  loading: false,
  isValid: false,
  name: '',
  image: '',
  email: '',
  description: '',
}

async componentDidMount() {
  this.setState({
    loading: true,
  }, async () => {
    const result = await getUser();
    this.setState({
      loading: false,
      name: result.name,
      image: result.image,
      email: result.email,
      description: result.description,
    });
    this.validateForm();
  });
}

handleChange = (e) => {
  const { name, value } = e.target;
  this.setState({
    [name]: value,
  }, this.validateForm);
}

handleSubmit = async (e) => {
  e.preventDefault();
  const {
    name,
    image,
    email,
    description,
  } = this.state;
  await updateUser({
    name,
    image,
    email,
    description,
  });

  // eslint-disable-next-line react/destructuring-assignment
  this.props.history.push('/profile');
}

validateForm = () => {
  const emailRegex = /\b[\w\\.-]+@[\w\\.-]+\.\w{2,4}\b/gi;
  const { name, email, image, description } = this.state;
  const isValid = [
    name.length > 0,
    email.length > 0 && emailRegex.test(email),
    image.length > 0,
    description.length > 0,
  ].every(Boolean);
  this.setState({ isValid });
};

render() {
  const {
    loading,
    name,
    image,
    email,
    description,
    isValid,
  } = this.state;
  return (
    <div data-testid="page-profile-edit">
      <Header />
      <h1>Profile Edit</h1>
      { loading === true ? <Loading /> : null }
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            data-testid="edit-input-name"
          />
        </label>
        <label htmlFor="image">
          Image:
          <input
            type="text"
            id="image"
            name="image"
            value={ image }
            onChange={ this.handleChange }
            data-testid="edit-input-image"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="edit-input-email"
          />
        </label>

        <label htmlFor="description">
          Description:
          <textarea
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="edit-input-description"
          />
        </label>

        <button
          type="submit"
          data-testid="edit-button-save"
          disabled={ !isValid }
        >
          Save
        </button>

      </form>

      <Link to="/profile">
        Cancel
      </Link>
    </div>
  );
}
}

ProfileEdit.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
