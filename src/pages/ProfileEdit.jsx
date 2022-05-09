import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.recoverUserInfo = this.recoverUserInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.clicked = this.clicked.bind(this);

    this.state = {
      user: {},
      loading: false,
      disabled: true,
      redirect: false,
    };
  }

  componentDidMount() {
    this.recoverUserInfo();
  }

  handleChange({ target }) {
    const { id, value } = target;
    // Consegui esta parte consultando a fonte abaixo
    // Source: https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [id]: value, // Show de bola!
      },
    }));
    this.isDisabled();
    /* const { user } = this.state;
    console.log(user); */
  }

  recoverUserInfo() {
    this.setState({ loading: true }, async () => {
      this.setState({ user: await getUser(), loading: false });
    });
  }

  // Source: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
  validateEmail(email) {
    const verify = /\S+@\S+\.\S+/;
    return verify.test(email);
  }

  isDisabled() {
    const { user } = this.state;
    const { name, email, description, image } = user;
    if (
      name !== ''
      && email !== ''
      && this.validateEmail(email)
      && description !== ''
      && image !== ''
    ) this.setState({ disabled: false });
    else this.setState({ disabled: true });
  }

  async clicked() {
    const { user } = this.state;
    await updateUser(user);
    this.setState({ redirect: true });
  }

  render() {
    const { loading, user, disabled, redirect } = this.state;
    const { name, email, description, image } = user;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading === true ? <Loading />
          : (
            <div>
              <div>
                <label htmlFor="name">
                  Nome de usuário
                  <input
                    id="name"
                    type="text"
                    defaultValue={ name }
                    onChange={ this.handleChange }
                    data-testid="edit-input-name"
                  />
                </label>
              </div>
              <div>
                <label htmlFor="email">
                  Email
                  <input
                    id="email"
                    type="email"
                    defaultValue={ email }
                    onChange={ this.handleChange }
                    data-testid="edit-input-email"
                  />
                </label>
              </div>
              <div>
                <label htmlFor="description">
                  Descrição
                  <input
                    id="description"
                    type="text"
                    defaultValue={ description }
                    onChange={ this.handleChange }
                    data-testid="edit-input-description"
                  />
                </label>
              </div>
              <div>
                <label htmlFor="image">
                  Mudar foto
                  <input
                    id="image"
                    type="text"
                    defaultValue={ image }
                    onChange={ this.handleChange }
                    data-testid="edit-input-image"
                  />
                </label>
              </div>
              <div>
                <button
                  type="button"
                  disabled={ disabled }
                  data-testid="edit-button-save"
                  onClick={ this.clicked }
                >
                  Salvar
                </button>
              </div>
            </div>
          )}
        {redirect === true && <Redirect exact to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
