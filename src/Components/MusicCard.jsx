import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './loading';

class MusicCard extends Component {
  state = {
    isChecked: false,
    loading: false,
  }

  handleChange = async () => {
    const { musicObj } = this.props;
    this.setState((preview) => ({ loading: true, isChecked: !preview.isChecked }));
    await addSong(musicObj);
    this.setState({ loading: false });
  }

  loadingCheked = () => {
    const { loading } = this.state;
    if (loading === true) {
      return <Loading />;
    }
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
