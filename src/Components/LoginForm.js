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
          <div className="login-form-container">
            <form className="login-form" onSubmit={this.onSubmitForm}>
              <label className="login-form-label">Email</label>
              <input
                className="login-form-input"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onInputchange}
                required
              />
              <label className="login-form-label">Password</label>
              <input
                className="login-form-input"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onInputchange}
                required
              />
              <button className="login-form-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        );
      }
      
}

export default LoginForm;