var filteredRestaurants = function(state = [], action) {
  switch (action.type) {
  case FILTERED_RESTAURANTS:
    return state.concat([action.payload]);
  }
};

export default filteredRestaurants;
