import React, { Component } from 'react';
import './App.css';
import Display from './components/Display';
import NotesList from './components/NotesList';
import Editor from './components/Editor';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import changeCurrent from './actions/changeCurrentNote';
import { bindActionCreators } from 'redux';
import ProtectedRoute from './components/ProtectedRoute';
import UnprotectedRoute from './components/UnprotectedRoute';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <div className='row'>
            <ProtectedRoute exact path='/' component={NavBar} />
            <ProtectedRoute exact path='/' component={NotesList} />
            <ProtectedRoute exact path='/' component={Display} />
            <ProtectedRoute exact path='/editor' component={Editor} />
            <UnprotectedRoute exact path='/login' component={Login} />
            <UnprotectedRoute exact path='/register' component={Register} />
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.user,
    notes: store.notes,
    currentNote: store.currentNote,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeCurrent: changeCurrent,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
