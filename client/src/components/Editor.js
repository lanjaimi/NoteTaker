import React, { Component } from 'react';
import '../styles/editor.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import updateNote from '../actions/updateNotes';
import axios from 'axios';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      error: 'hide',
      errorMessage: '',
    };
  }

  changeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  changeText = (e) => {
    this.setState({
      content: e,
    });
  };

  cancel = () => {
    this.props.history.push('/');
  };

  save = () => {
    if (this.props.noteToEdit === null) {
      this.add();
    } else {
      this.edit();
    }
  };

  edit = () => {
    if (!this.validateInput()) return;
    axios
      .patch(
        '/notes/' + this.props.noteToEdit._id,
        {
          title: this.state.title,
          content: this.state.content,
        },

        {
          headers: {
            'x-auth-token': localStorage.getItem('x-auth-token'),
          },
        }
      )
      .then((res) => {
        this.props.updateNote(res.data);
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  add = () => {
    if (!this.validateInput()) return;
    axios
      .post(
        '/notes',
        {
          title: this.state.title,
          content: this.state.content,
          date: moment().format('MMMM Do YYYY, h:mm a'),
        },
        {
          headers: {
            'x-auth-token': localStorage.getItem('x-auth-token'),
          },
        }
      )
      .then((res) => {
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  validateInput = () => {
    if (this.state.title.length < 3 || this.state.content.length < 3) {
      this.setState({
        errorMessage:
          '* The title and body of the note be at least 3 charachters',
        error: 'show',
      });

      return false;
    }

    return true;
  };

  componentDidMount() {
    if (this.props.noteToEdit !== null) {
      const { title, content } = this.props.noteToEdit;

      this.setState({
        title,
        content,
      });
    }
  }

  render() {
    return (
      <div className='editor col-12'>
        <div className={`error ${this.state.error}`}>
          {this.state.errorMessage}
        </div>
        <div>
          <input
            placeholder='Title'
            type='text'
            value={this.state.title}
            onChange={this.changeTitle}
          />
          <div className='editor_container'>
            <ReactQuill
              theme='snow'
              onChange={this.changeText}
              value={this.state.content}
            />
          </div>
          <span
            className='editor-btn'
            onClick={() => {
              this.save(this.props.currentNote);
            }}
          >
            Save
          </span>
          <span className='editor-btn' onClick={this.cancel}>
            Cancel
          </span>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateNote: updateNote,
    },
    dispatch
  );
}

function mapStateToProps(store) {
  return {
    noteToEdit: store.noteToEdit,
    notes: store.notes,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
