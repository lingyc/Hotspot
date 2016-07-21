import React from 'react';

var CollectionModel = (props) => (
  <div className='restaurant'>
    <div className='restaurantInfo'>
      {props.restaurant.name}
      {props.restaurant.address}
      {props.restaurant.phoneNumber}
    </div>
    <div className='restaurantDescription'>
      {props.restaurant.type}
      {props.restaurant.rating}
      {props.restaurant.image}
    </div>

  </div>
);

export default CollectionModel;
