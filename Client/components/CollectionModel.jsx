import React from 'react';

// The contets will be dependant on the form the information takes
var CollectionModel = ({item}) => (
  <div className='restaurant'>
    <div className='restaurantName' onClick={ () => { viewCollectionItem(item) }}>
    {item.name}
    </div>
  </div>
);

export default CollectionModel;
