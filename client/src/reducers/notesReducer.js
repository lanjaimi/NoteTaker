export default (state = [], action) => {
  let newState = [...state];

  switch (action.type) {
    case 'UPDATE_NOTES':
      newState = action.payload.notes;

      return newState;

    default:
      return state;
  }
};
