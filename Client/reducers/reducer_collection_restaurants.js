var collectionRestaurants = function(state = [], action) {
  switch (action.type) {
  case COLLECTION_RESTAURANTS:
    return state.concat([ action.payload ]);
  }
};

export default collectionRestaurants;
