export default (notes) => {
  return {
    type: 'UPDATE_NOTES',
    payload: {
      notes,
    },
  };
};
