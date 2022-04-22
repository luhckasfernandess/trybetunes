import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardsMusic extends Component {
  render() {
    const {
      searchResult,
    } = this.props;
    return (
      searchResult.map((album) => (
        <Link
          data-testid={ `link-to-album-${album.collectionId}` }
          to={ `/album/${album.collectionId}` }
          key={ album.collectionId }
        >
          <section>
            <img src={ album.artworkUrl100 } alt={ album.collectionName } />
            <h4>{ album.collectionName }</h4>
            <h5>{ album.artistName }</h5>
          </section>
        </Link>
      ))
    );
  }
}

CardsMusic.propTypes = {
  searchResult: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardsMusic;
