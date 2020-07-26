export default (note) => {
  return {
    type: 'EDIT',
    payload: {
      note,
    },
  };
};
