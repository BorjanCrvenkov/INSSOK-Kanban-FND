import React from 'react';
import BaseRepository from "./Repository/BaseRepository";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      repository: new BaseRepository(),
    };
    this.onInputchange = this.onInputchange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  };

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async onSubmitForm(e) {
    e.preventDefault()

    const data = {
      'email': this.state.email,
      'password': this.state.password,
    };

    await this.state.repository.login(data);

    window.location.href = 'http://localhost:3000/workspaces'
  }


  render() {
    return (
      <div class="w-25 mx-auto">
        <form>
          <div class="form-outline mt-4">
            <input type="email" id="id_email" class="form-control" />
            <label class="form-label" for="id_email">Email address</label>
          </div>

          <div class="form-outline mt-4">
            <input type="password" id="id_password" class="form-control" />
            <label class="form-label" for="id_password">Password</label>
          </div>

          <button type="button" class="btn btn-primary btn-block mt-4">Sign in</button>
        </form>
      </div>
    );
  }

}

export default LoginForm;