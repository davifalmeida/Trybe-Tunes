import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './loading';

class MusicCard extends Component {
  state = {
    isChecked: false,
    loading: false,
    arrFavSongs: [],
  }

  componentDidMount = () => {
    this.getFavoriteSongs();
  }

  getFavoriteSongs = async () => {
    const { trackId } = this.props;
    const response = await getFavoriteSongs();
    const isChecked = response.some(({ trackId: id }) => id === trackId);
    this.setState({ isChecked });
  }

  handleChange = async () => {
    const { musicObj } = this.props;
    this.setState((preview) => ({ loading: true, isChecked: !preview.isChecked }));
    await addSong(musicObj);
    const newFavorite = await getFavoriteSongs() || [];
    this.setState({ loading: false });
    this.setState((preview) => { preview.arrFavSongs = newFavorite; return preview; });
  }

  render() {
    const { loading, isChecked } = this.state;
    const {
      trackName,
      previwUrl,
      trackId,
    } = this.props;

    return (
      <div>
        { loading === true ? <Loading /> : null }
        <h1>{ trackName }</h1>
        <audio data-testid="audio-component" src={ previwUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">

          Favorita
          <input
            type="checkbox"
            name={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleChange }
            checked={ isChecked }
          />
        </label>
      </div>
    );
  }
}
MusicCard.propTypes = {
  trackId: PropTypes.number,
  trackName: PropTypes.string,
  previwUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
