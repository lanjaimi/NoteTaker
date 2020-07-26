import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import currentNoteReducer from './currentNoteReducer';
import ToEditReducer from './ToEditReducer';

const rootreducer = combineReducers({
  notes: notesReducer,
  currentNote: currentNoteReducer,
  noteToEdit: ToEditReducer,
});

export default rootreducer;
