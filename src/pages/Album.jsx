import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.requestGetMusics = this.requestGetMusics.bind(this);

    this.state = {
      musics: [],
    };
  }

  componentDidMount() {
    this.requestGetMusics();
  }

  async requestGetMusics() {
    const { match: { params: { id } } } = this.props;
    this.setState({ musics: await getMusics(id) });
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {musics.length !== 0 && <MusicCard musics={ musics } />}
      </div>
    );
  }
}

Album.propTypes = {
  // Um objeto de qualquer tipo de dados via StackOverFlow
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  // Source: https://stackoverflow.com/questions/38237439/route-object-validation-as-props-in-react
};

export default Album;
