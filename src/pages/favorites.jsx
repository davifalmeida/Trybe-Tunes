import React from 'react';
import Header from '../Components/header';
import Loading from '../Components/loading';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    arrFavSongs: [],
    loading: false,
  };

componentDidMount = async () => {
  this.getFavoriteSongs();
}

getFavoriteSongs = async () => {
  this.setState({ loading: true });
  const response = await getFavoriteSongs();
  this.setState({ arrFavSongs: response, loading: false });
};

render() {
  const { arrFavSongs, loading } = this.state;
  return (
    <div data-testid="page-favorites">
      <Header />
      <h1>Favorites</h1>
      { loading === true ? <Loading /> : null }
      {
        arrFavSongs.map(({ trackName, previewUrl, trackId }) => (
          <MusicCard
            key={ trackName }
            trackName={ trackName }
            previwUrl={ previewUrl }
            trackId={ trackId }
          />
        ))
      }

    </div>
  );
}
}

export default Favorites;
