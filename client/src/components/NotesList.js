import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../styles/notes-list.css';
import changeCurrent from '../actions/changeCurrentNote';
import changeToEdit from '../actions/changeToEdit';
import updateNotes from '../actions/updateNotes';
import axios from 'axios';

class TitlesList extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      notes: null,
    };
  }

  search = (e) => {
    this.setState({
      searchInput: e.target.value,
    });
  };

  componentDidMount() {
    axios
      .get('/notes', {
        headers: {
          'x-auth-token': localStorage.getItem('x-auth-token'),
        },
      })
      .then((res) => {
        this.props.updateNotes(res.data);
        this.props.changeCurrent(res.data[0]);
        this.props.changeToEdit(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  display = (note) => {
    this.props.changeCurrent(note);
    this.props.changeToEdit(note);
  };

  render() {
    const titles = this.props.notes.map((note, index) => {
      if (this.searchInput !== '') {
        if (
          note.title
            .toLocaleLowerCase()
            .includes(this.state.searchInput.toLocaleLowerCase())
        ) {
          return (
            <div key={index} className='listItem'>
              <li
                onClick={() => {
                  this.display(note);
                }}
              >
                {note.title}
              </li>
            </div>
          );
        }
      } else {
        return (
          <div key={index} className='listItem'>
            <li
              onClick={() => {
                this.display(note);
              }}
            >
              {note.title}
            </li>
          </div>
        );
      }
    });

    return (
      <div className='notesList col-lg-4 col-md-12'>
        <div className='searchBox'>
          <input
            type='text'
            value={this.state.searchInput}
            onChange={this.search}
            placeholder='Search ...'
          />
        </div>

        <ul>{titles}</ul>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateNotes: updateNotes,
      changeCurrent: changeCurrent,
      changeToEdit: changeToEdit,
    },
    dispatch
  );
}

function mapStateToProps(store) {
  return {
    notes: store.notes,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TitlesList);
