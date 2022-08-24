import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    search: false,
    searchArtist: '',
    searchResults: [],
    loading: false,
    clickOnSearch: false,

  }

  handleSearch = (event) => {
    const { target: { value } } = event;
    this.setState({ searchArtist: value });
    if (value.length >= 2) {
      this.setState({ search: true });
    } else {
      this.setState({ search: false });
    }
  }

  handleClickSearch = async (e) => {
    e.preventDefault();
    const { searchArtist } = this.state;
    const artistResearched = searchArtist;
    this.setState({
      loading: true,
      search: false,
      searchArtist: '',
      artistResearched,

    });
    const response = await searchAlbumsAPI(artistResearched);
    this.setState({
      searchResults: response,
      loading: false,
      clickOnSearch: true,
    });
  }

  render() {
    const {
      search,
      searchArtist,
      searchResults,
      loading,
      clickOnSearch,
      artistResearched,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (
          <h1>Carregando...</h1>
        ) : (
          <div>
            <form>

              Search:
              <input
                type="text"
                placeholder="Nome do artista"
                data-testid="search-artist-input"
                value={ searchArtist }
                onChange={ this.handleSearch }
              />

              <button
                type="submit"
                disabled={ !search }
                data-testid="search-artist-button"
                onClick={ this.handleClickSearch }
              >
                Pesquisar
              </button>
            </form>
            {clickOnSearch && (
              <div>
                <h2>{`Resultado de álbuns de: ${artistResearched}`}</h2>
                {searchResults.length > 0 ? (
                  <div>
                    {searchResults.map((album) => {
                      const {
                        artistName,
                        collectionName,
                        collectionId,
                        artworkUrl100,
                      } = album;
                      return (
                        <div key={ collectionId }>
                          <Link
                            data-testid={ `link-to-album-${collectionId}` }
                            to={ `/album/${collectionId}` }
                          >
                            <img
                              src={ artworkUrl100 }
                              alt={ collectionName }
                            />
                          </Link>
                          <p className="album-name">{collectionName}</p>
                          <p className="album-artist">{artistName}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <h3>Nenhum álbum foi encontrado</h3>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
