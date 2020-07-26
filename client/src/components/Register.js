import React, { Component } from 'react';
import '../styles/register.css';
import logo from '../images/login_logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password2: '',
      error: 'hide',
      errorMessage: '',
    };
  }
  register = () => {
    if (this.passwordMatch()) {
      let user = {
        email: this.state.email,
        password: this.state.password,
      };

      //  JSON.stringify
      axios
        .post('/users', user)
        .then((res) => {
          if (res.data.errors) {
            this.setState({
              error: 'show',
              errorMessage: res.data.errors[0].msg,
            });
          } else {
            this.props.history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  passwordMatch = () => {
    if (this.state.password !== this.state.password2) {
      this.setState({
        error: 'show',
        errorMessage: "* The passwords you entered don't match",
      });
      return false;
    }

    return true;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value].toString(),
    });
  };

  render() {
    return (
      <div className='login col-12'>
        <div className='icon_container'>
          <div className='icon'>
            <img src={logo} alt='Logo' />
          </div>
        </div>
        <h1>Sign up</h1>
        <span className={this.state.error}>{this.state.errorMessage}</span>

        <form>
          <div className='form-row'>
            <input
              placeholder='Email address *'
              className='form-textbox'
              type='email'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className='form-row'>
            <input
              placeholder='Password *'
              className='form-textbox'
              type='password'
              name='password'
              onChange={this.handleChange}
              value={this.state.password}
            />
          </div>
          <div className='form-row'>
            <input
              placeholder='Repeat Password *'
              className='form-textbox'
              type='password'
              name='password2'
              onChange={this.handleChange}
              value={this.state.password2}
            />
          </div>

          <span className='btn' onClick={this.register}>
            Register
          </span>
          <Link to='/'>
            <span className='msg'>Already a user? Log in</span>
          </Link>
        </form>
      </div>
    );
  }
}

export default Register;
