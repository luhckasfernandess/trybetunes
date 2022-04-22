import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import CardsMusic from '../components/CardsMusic';

class Search extends Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.onClickSearchButton = this.onClickSearchButton.bind(this);

    this.state = {
      valueInput: '', // estado p/ armazenar o valor do input pois vou usar ao fazer a requisição
      awaitingResponse: false, // vou usar para a condicional de carregando...
      searchResult: [], // vai armazenar o retorno da minha requisição
      disabled: true,
    };
  }

  onChange({ target }) {
    const minCharacter = 2;
    const { value } = target;
    if (value.length >= minCharacter) {
      this.setState({ disabled: false, valueInput: value });
    } else this.setState({ disabled: true });
  }

  onClickSearchButton() {
    const { valueInput } = this.state;
    // limpe o valor do input e faça uma requisição
    const inputValue = document.querySelector('#search-artist-input');
    inputValue.value = '';
    this.setState({ awaitingResponse: true }, async () => {
      const result = await searchAlbumsAPI(valueInput);
      this.setState({ searchResult: result, awaitingResponse: false });
    });
  }

  render() {
    const { disabled, awaitingResponse, searchResult, valueInput } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {awaitingResponse === true ? <Loading />
          : (
            <form>
              <input
                data-testid="search-artist-input"
                id="search-artist-input"
                type="text"
                placeholder="Nome da banda ou artista"
                onChange={ this.onChange }
              />
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ disabled }
                onClick={ this.onClickSearchButton }
              >
                Pesquisar
              </button>
            </form>
          )}
        {searchResult.length !== 0 ? (
          <div>
            <h3>
              { `Resultado de álbuns de: ${valueInput}` }
            </h3>
            <CardsMusic searchResult={ searchResult } />
          </div>
        )
          : (<h3>Nenhum álbum foi encontrado</h3>)}
        {/* Eu não estava conseguindo passar no requisito por causa desse erro e descobri que só precisava escrever em uma única linha */}
        {/*  expect(screen.queryByText('Nenhum álbum foi encontrado')).not.toBeInTheDocument(); */}
        {/* {notFind === true && (<h3>Nenhum álbum foi encontrado</h3>)}  */}
      </div>
    );
  }
}

export default Search;
