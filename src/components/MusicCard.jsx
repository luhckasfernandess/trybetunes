import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musics } = this.props;
    // Armazenando as informações da capa do album que é apenas o elemento 0 do array para não confundir mais minha lógica e botar um loop infinito maldito que trava pc
    const albumArtwork = musics[0];
    // Separando os tracks do elemento zero do array
    const tracks = musics.filter((element) => element.kind);
    return (
      <section>
        <section>
          <img src={ albumArtwork.artworkUrl100 } alt={ albumArtwork.artistName } />
          <h4 data-testid="artist-name">{ albumArtwork.artistName }</h4>
          <h5 data-testid="album-name">{ albumArtwork.collectionName }</h5>
        </section>
        <section>
          {/* Agora a mágica! Ou é ciência? */}
          {tracks.map((track) => (
            <section key={ track.trackNumber }>
              <p>{ track.trackName }</p>
              <audio data-testid="audio-component" src={ track.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento.
                <code>audio</code>
              </audio>
            </section>
          ))}
        </section>
      </section>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
