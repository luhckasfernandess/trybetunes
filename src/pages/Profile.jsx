import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.userInfo = this.userInfo.bind(this);

    this.state = {
      loading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.userInfo();
  }

  async userInfo() {
    this.setState({ loading: true }, async () => {
      this.setState({ user: await getUser(), loading: false });
    });
  }

  render() {
    const { user, loading } = this.state;
    const { name, email, description, image } = user;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading === true ? <Loading />
          : (
            <section>
              <img src={ image } alt={ name } data-testid="profile-image" />
              <p>{ name }</p>
              <p>{ email }</p>
              <p>{ description }</p>
              <section>
                <Link to="/profile/edit">Editar perfil</Link>
              </section>
            </section>
          )}
      </div>
    );
  }
}

export default Profile;
