import React from 'react';
var friendEndpoints={
  accept:'/api/confirmFriend',
  decline:'/api/rejectFriend'
}

var FriendModel = ({item}) => {
  console.log('you should see a friend!')
  return (
  <div>
     {item.requestor}
    <button onClick={function(){accept(item.requestor)}}>Accept</button>
    <button onClick={function(){decline(item.requestor)}}>Decline</button>
  </div>
);

};
 function accept(person){
  console.log('should accept '+ person);
$.post(friendEndpoints.accept,{ friendname:person },function(a,b){
  console.log('accept request!!',a,b);
});

 }

 function decline(person){
  console.log('should decline '+ person);

$.post(friendEndpoints.decline,{ friendname:person },function(a,b){
  console.log('decline request!!',a,b);
});

 }

export default FriendModel;
