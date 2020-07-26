import React, { Component } from 'react';

class auth extends Component {
  login = (token) => {
    localStorage.setItem('x-auth-token', token);
  };

  logout = () => {
    localStorage.clear();
  };

  isAuthenticated = () => {
    const token = localStorage.getItem('x-auth-token');

    if (token) return true;

    return false;
  };
}

export default new auth();
