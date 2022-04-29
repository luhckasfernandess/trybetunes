import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.didAddFavorite = this.didAddFavorite.bind(this);
    this.itsChecked = this.itsChecked.bind(this);

    this.state = {
      loading: false,
      favoritesSongs: [],
    };
  }

  componentDidMount() {
    this.itsChecked();
  }

  // Função para recuperar as músicas salvas ao recarregar a página
  itsChecked() {
    this.setState({ loading: true }, async () => {
      this.setState({ favoritesSongs: await getFavoriteSongs(), loading: false });
    });
  }

  // Consegui resolver o bug do requisito 8 graças a ajuda do Ronan Salvador que me ajudou a ver o que estava vindo no value
  // E ao resolver o bug do 8 acabei resolvendo o requisito 10 também rsrs 2 com 1 cajadada
  didAddFavorite({ target }) {
    // console.log(JSON.parse(target.value));
    const { value, checked } = target;
    // console.log(this.props);
    this.setState({ loading: true }, async () => {
      if (checked === true) {
        await addSong(JSON.parse(value));
        // Chamo a função de novo aqui para atualizar mais rápido o meu estado e não dá conflito com os checkeds
        this.setState({ favoritesSongs: await getFavoriteSongs() });
      }
      this.setState({ loading: false });
    });
  }

  render() {
    const { musics } = this.props;
    const { loading, favoritesSongs } = this.state;
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
          {loading && <Loading />}
          {/* Agora a mágica! Ou é ciência? */}
          {tracks.map((track) => (
            <section key={ track.trackNumber }>
              <p>{ track.trackName }</p>
              <audio data-testid="audio-component" src={ track.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento.
                <code>audio</code>
              </audio>
              <label htmlFor={ `checkbox-music-${track.trackId}` }>
                Favorita
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${track.trackId}` }
                  value={ JSON.stringify(track) }
                  checked={
                    // vai procurar por algum semelhante no array salvo do getFavoriteSongs e marcar checked, pq o some e every retornam true. Ah muleque ;)
                    favoritesSongs.some((element) => element.trackId === track.trackId)
                  }
                  // Tu acreditas que todo aquele erro era pq vc tava chamando a função abaixo com () no final? Fala sério!
                  onChange={ this.didAddFavorite } // eu sabia que devia usar onChange desde o início
                  /* Mudei para onChange por causa desse erro, defalutChecked não funcionou pra mim, descubra o pq
                  index.js:1 Warning: You provided a `checked` prop to a form field without an `onChange` handler.
                  This will render a read-only field. If the field should be mutable use `defaultChecked`.
                  Otherwise, set either `onChange` or `readOnly`. */
                />
              </label>
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
