export default (note) => {
  return {
    type: 'CHANGE_CURRENT',
    payload: {
      note,
    },
  };
};
