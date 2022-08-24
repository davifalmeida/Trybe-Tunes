import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName,
      previwUrl,
    } = this.props;

    return (
      <div>
        <h1>{ trackName }</h1>
        <audio data-testid="audio-component" src={ previwUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string,
  previwUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
