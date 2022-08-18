import React from 'react';
import Header from '../Components/header';

class Search extends React.Component {
  state = {
    search: false,
  }

  handleSearch = ({ target }) => {
    const { value } = target;
    if (value.length >= 2) this.setState({ search: true });
  };

  render() {
    const { search } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            placeholder="Nome do artista"
            data-testid="search-artist-input"
            onChange={ this.handleSearch }
          />
          <button
            type="submit"
            disabled={ !search }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
