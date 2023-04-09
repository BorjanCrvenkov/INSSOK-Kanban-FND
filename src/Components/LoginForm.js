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
      <div className="container d-flex justify-content-center align-items-center h-100">
        <div className="card p-4">
          <h2 className="mb-4">Login Page</h2>
          <form onSubmit={this.onSubmitForm}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.onInputchange} required/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.onInputchange} required/>
            </div>
            <br></br>
            <button type='submit' className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm;
