import React, { Component, Fragment } from 'react';
//import { Link, Redirect } from 'react-router-dom';
import '../styles/login.css';
import logo from '../images/login_logo.png';
import { Link } from 'react-router-dom';
import auth from '../auth';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: 'hide',
      errorMessage: '',
    };
  }

  login = (e) => {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post('/auth', user)
      .then((res) => {
        if (res.data.errors) {
          this.setState({
            error: 'show',
            errorMessage: res.data.errors[0].msg,
          });
        } else {
          auth.login(res.data);
          this.props.history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

        <h1>Sign in</h1>
        <span className={this.state.error}>Invalid email or password</span>
        <form>
          <div className='form-row'>
            <input
              placeholder='Email Address *'
              className='form-textbox'
              type='email'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              required
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

          <span className='btn' onClick={this.login}>
            Login
          </span>
          <Link to='/register'>
            <span className='msg'>Don't have an account? Sign up</span>
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
