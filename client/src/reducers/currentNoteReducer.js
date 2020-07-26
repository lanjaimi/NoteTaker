const initState = {
  title: '',
  content: '',
  timeStamp: '',
};

export default (state = initState, action) => {
  if (action.type === 'CHANGE_CURRENT') {
    const newState = action.payload.note;

    return newState;
  }
  return state;
};
