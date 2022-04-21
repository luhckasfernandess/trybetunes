import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.awaitingReply = this.awaitingReply.bind(this);

    this.state = {
      userName: '',
      loading: '',
    };
  }

  // Source: https://app.betrybe.com/course/front-end/ciclo-de-vida-de-componentes-e-react-router/ciclo-de-vida-de-componentes/36f2a45f-a7c0-4f6f-ae29-119286c4dce9/conteudos/57bf6a8b-f9d4-4fa3-880f-e909767b259f/o-ciclo-de-vida-de-um-componente-react/07a091b3-cbc6-42e4-b137-129ea53ae514?use_case=side_bar
  // Acabei de colocar um componente na tela e quero rodar uma lógica antes de fazer outras coisas acontecerem?
  // Bota no componentDidMount
  componentDidMount() { // Source: Course da Trybe>Modulo Front End>Bloco 12.1 - Lifecycle
    this.awaitingReply();
  }

  awaitingReply() {
    this.setState({ loading: true }, async () => {
      const { name } = await getUser();
      this.setState({ userName: name, loading: false });
    });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        {loading === true ? <Loading />
          : (<p data-testid="header-user-name">{userName}</p>)}
      </header>
    );
  }
}

export default Header;
