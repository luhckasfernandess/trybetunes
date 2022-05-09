import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();

    this.recoverListMusics = this.recoverListMusics.bind(this);

    this.state = {
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.recoverListMusics();
  }

  componentDidUpdate() {
    this.recoverListMusics();
  }

  async recoverListMusics() {
    this.setState({ favoriteSongs: await getFavoriteSongs() });
  }

  render() {
    const { favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {favoriteSongs.length > 0 ? <MusicCard musics={ favoriteSongs } />
          : <p>No favorite songs</p>}
      </div>
    );
  }
}

export default Favorites;
