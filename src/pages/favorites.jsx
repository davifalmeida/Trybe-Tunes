import React from 'react';
import Header from '../Components/header';
import Loading from '../Components/loading';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.favoriteSongs = this.favoriteSongs.bind(this);
  }

  state = {
    arrFavSongs: [],
    loading: false,
  };

componentDidMount = () => {
  this.favoriteSongs();
}

favoriteSongs = async () => {
  this.setState({ loading: true });
  const response = await getFavoriteSongs();
  this.setState({ loading: false, arrFavSongs: response });
};

render() {
  const { arrFavSongs, loading } = this.state;
  return (
    <div data-testid="page-favorites">
      <Header />
      <h1>Favorites</h1>
      { loading === true ? <Loading /> : null }

      <div>

        {
          arrFavSongs.map((music) => (
            <MusicCard
              key={ music.trackName }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              music={ music }
              favoriteSongs={ this.favoriteSongs }
            />
          ))
        }
      </div>

    </div>
  );
}
}

export default Favorites;
