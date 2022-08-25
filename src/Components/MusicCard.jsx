import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.removeSong = this.removeSong.bind(this);
  }

  state = {
    // isChecked: false,
    loading: false,
    arrFavSongs: [],
  }

  componentDidMount = async () => {
    const songsFavorites = await getFavoriteSongs();
    this.setState({ arrFavSongs: songsFavorites });
  }
  // getFavoriteSongs = async () => {
  //   const { trackId } = this.props;
  //   const response = await getFavoriteSongs();
  //   const isChecked = response.some(({ trackId: id }) => id === trackId);
  //   this.setState({ isChecked });
  // }

  removeSong = async (music) => {
    const { arrFavSongs } = this.state;
    const { favoriteSongs } = this.props;
    if (arrFavSongs.some((element) => element.trackId === music.trackId)) {
      this.setState({ loading: true });
      console.log(1);
      await removeSong(music);
      console.log(music);
      await favoriteSongs();
      console.log(this.props);
      const trackRemove = arrFavSongs.filter((element) => (
        element.trackId !== music.trackId
      ));
      this.setState({ loading: false, arrFavSongs: trackRemove });
    } else {
      this.setState({ loading: true }, async () => {
        await addSong(music);
        this.setState({ loading: false, arrFavSongs: [...arrFavSongs, music] });
      });
    }
  }

  // handleChange = async () => {
  //   const { musicObj } = this.props;
  //   this.setState((preview) => ({ loading: true, isChecked: !preview.isChecked }));
  //   await addSong(musicObj);
  //   const newFavorite = await getFavoriteSongs() || [];
  //   this.setState({ loading: false });
  //   this.setState((preview) => { preview.arrFavSongs = newFavorite; return preview; });
  // }

  render() {
    const { loading, arrFavSongs } = this.state;
    const { music } = this.props;
    return (
      <div>
        { loading === true ? <Loading /> : null }
        <h1>{ music.trackName }</h1>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
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
            name={ music.trackId }
            id="favorite"
            data-testid={ `checkbox-music-${music.trackId}` }
            checked={ arrFavSongs.some((element) => element.trackId === music.trackId) }
            onChange={ (event) => this.removeSong(music, event) }
          />
        </label>
      </div>
    );
  }
}
MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  favoriteSongs: PropTypes.func,
};
MusicCard.defaultProps = {
  favoriteSongs: () => {},
};

export default MusicCard;
