import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/header';
import getMusic from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends React.Component {
  state = {
    artistName: '',
    collectionID: '',
    collectionName: '',
    collectionImage: '',
    arrMusics: [],
  }

componentDidMount = () => {
  this.responseAPI();
}

responseAPI = async () => {
  const { match: { params: { id } } } = this.props;
  const response = await getMusic(id);
  this.setState({
    artistName: response[0].artistName,
    collectionName: response[0].collectionName,
    collectionImage: response[0].artworkUrl100,
    collectionID: response[0].collectionId,
    arrMusics: response.filter(({ kind }) => kind === 'song'),
  });
}

render() {
  const {
    artistName,
    collectionName,
    collectionImage,
    arrMusics,
    collectionID,
  } = this.state;
  return (
    <div data-testid="page-album">
      <Header />
      <h1>Album</h1>
      <div>
        <img src={ collectionImage } alt={ collectionName } />
        <h2 data-testid="artist-name">
          { artistName }
        </h2>
        <h2 data-testid="album-name">
          { collectionName }
        </h2>
        <p>
          {collectionID}
        </p>
      </div>
      {
        arrMusics.map((music) => (
          <MusicCard
            key={ music.trackName }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            music={ music }
          />
        ))
      }
    </div>
  );
}
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
