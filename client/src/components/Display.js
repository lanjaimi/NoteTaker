import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/display.css';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import changeCurrent from '../actions/changeCurrentNote';
import updateNotes from '../actions/updateNotes';
import changeToEdit from '../actions/changeToEdit';
import { bindActionCreators } from 'redux';
import axios from 'axios';

class Display extends Component {
  createNote = () => {
    this.props.changeToEdit(null);
    this.props.history.push('/editor');
  };

  delete = () => {
    axios
      .delete('/notes/' + this.props.currentNote._id, {
        headers: {
          'x-auth-token': localStorage.getItem('x-auth-token'),
        },
      })
      .then((res) => {
        this.props.updateNotes(res.data);
        if (res.data[0] === undefined) {
          this.props.changeCurrent({
            title: '',
            content: '',
            date: '',
          });
        } else {
          this.props.changeCurrent(res.data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  edit = () => {
    this.props.history.push('/editor');
  };

  render() {
    if (this.props.notes.length === 0)
      return (
        <div display col-lg-8 col-md-12>
          <h1 className='no_notes_msg'>
            You don't have any notes, click the button bellow to add some!!!
          </h1>
          <div className='btn_wrapper'>
            <span onClick={this.createNote} className='addnew_btn'>
              New Note +
            </span>
          </div>
        </div>
      );

    const { title, content, date, id } = this.props.currentNote;

    return (
      <div className='display col-lg-8 col-md-12'>
        <div className='title'>
          <div className='icons'>
            <span
              onClick={() => {
                this.delete(id);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </span>
            <Link to='/editor'>
              <span>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </Link>
          </div>

          <h1>{title}</h1>
          <span className='timeStamp'>{date}</span>
        </div>
        <div className='content'>{parse(content)}</div>
        <div className='btn_wrapper'>
          <span onClick={this.createNote} className='addnew_btn'>
            New Note +
          </span>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeToEdit: changeToEdit,
      changeCurrent: changeCurrent,
      updateNotes: updateNotes,
    },
    dispatch
  );
}

function mapStateToProps(store) {
  return {
    notes: store.notes,
    currentNote: store.currentNote,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);
