import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);

    this.state = {
      disabled: true,
    };
  }

  onChange({ target }) {
    const minCharacter = 2;
    const { value } = target;
    if (value.length >= minCharacter) this.setState({ disabled: false });
    else this.setState({ disabled: true });
  }

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Nome da banda ou artista"
            onChange={ this.onChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ disabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
