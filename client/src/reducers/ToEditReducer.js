const initState = {
  title: '',
  content: '',
  timeStamp: '',
};

export default (state = initState, action) => {
  if (action.type === 'EDIT') {
    const newState = action.payload.note;

    return newState;
  }
  return state;
};
