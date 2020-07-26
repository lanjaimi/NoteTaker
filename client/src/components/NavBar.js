import React, { Component } from 'react';
import '../styles/navBar.css';
import logo from '../images/logo.png';

import auth from '../auth';

class NavBar extends Component {
  logout = () => {
    auth.logout();
    this.props.history.push('/');
  };

  render() {
    return (
      <div className='navBar col-12'>
        <img src={logo} alt='logo' />
        <span onClick={this.logout} className='logout'>
          Logout
        </span>
      </div>
    );
  }
}

export default NavBar;
