import React from 'react';
import Header from '../Components/header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>

      </div>
    );
  }
}

export default Album;
