import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// Quando ñ tem export default preciso desestruturar como fiz abaixo -> credits by Muca in the Mentoring Project
import { createUser } from '../services/userAPI'; // Consegui fazer graças a explicação do Muca na mentoria de projeto
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.loginButton = this.loginButton.bind(this);
    this.state = {
      userName: '',
      disabledButton: true,
      clickedButton: false,
      loading: '',
    };
  }

  onChange({ target }) {
    const minCharacter = 3;
    const { value } = target;
    if (value.length >= minCharacter) {
      this.setState({ disabledButton: false, userName: value });
    } else this.setState({ disabledButton: true });
  }

  loginButton() {
    const { userName } = this.state;
    // Consegui fazer essa parte graças a ajuda do Lucas Dalbo que me explicou sobre callbacks e funções assíncronas
    // Só vai chamar a callback depois que a 1ª parte resolvida
    this.setState({ loading: true }, async () => {
      await createUser({ name: userName });
      this.setState({ clickedButton: true, loading: false });
    });
  }

  render() {
    const { disabledButton, clickedButton, loading } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login-name-input">
            <input
              data-testid="login-name-input"
              type="text"
              placeholder="Digite seu nome"
              onChange={ this.onChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ disabledButton }
            onClick={ this.loginButton }
          >
            Entrar
          </button>
          {/* Consegui o último subrequisito graças a ajuda do meu chará Lucas Dalbo */}
          { loading === true && <Loading /> }
          {/* Só volta quando for true se usar '&&' não precisa dos ':' para pensar no caso de falso */}
          { clickedButton === true && <Redirect to="/search" /> }
        </form>
      </div>
    );
  }
}

export default Login;
