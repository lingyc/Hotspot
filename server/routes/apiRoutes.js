import Spot from '../db/Spots';
import SpotsUsers from '../db/spotsUsersJoin';
import { sendBackJSON } from '../db/queryHelpers';
import {requestMultipleYelp, generateYelpNewBusParam, requestYelp} from '../yelp/yelpQuery';
import Promise from 'bluebird';
import _ from 'lodash';
import Friends from '../db/Friends';
import FriendRequests from '../db/FriendRequests';
import Wishes from '../db/Wishes';
import Users from '../db/Users';

export default function(app) {
  // RESTFUl API for retrieving spots from the db
  app.get('/api/spots', (req, res) => {
    let spotsReturn;
    if (!req.user) {
      req.user = {
        id: Math.random() * 1000,
        username: 'defaultUser'
      };
    }
    console.log('user', req.user);
    Spot.getAllForUser(req.user)
      .then((spots) => {
        if (spots.length === 0) {
          spotsReturn = [];
          // return sendBackJSON(res, [], 'no spots');
          return [];
        }
        spotsReturn = spots;
        return requestMultipleYelp(spots.map((spot) => {
          return generateYelpNewBusParam(spot.name, spot.longitude, spot.latitude);
        }));
      })
      .then((yelpResults) => {
        console.log('yelpresults looking for busid location', yelpResults);
        if (yelpResults.length === 0) {
          return [];
        }
        return spotsReturn.map((spot) => {
          // console.log('spotssssss', spot)
          let match = yelpResults.filter((result) => {
            let lowerLength = Math.min([spot.length, result.length]);
            return result.name.indexOf(spot.name.slice(lowerLength)) !== -1;
          });
          console.log('yelp stuff', match);
          if (match.length === 0) {
            spot.yelpData = {
              cuisine: null,
              image: null
            };
          } else {
            spot.yelpData = match[0];
          }
          return spot;
        });
      })
      .then((augmentedSpots) => sendBackJSON(res, augmentedSpots, 'got all spots'))
      .catch((err) => console.log(err));
  });

  app.get('/api/spots/:id', (req, res) => {
    Spot.getOne(req.params.id)
      .then((spot) => sendBackJSON(res, spot, 'got one spot'))
      .catch((err) => console.log(err));
  });

  app.post('/api/spots', (req, res) => {
    console.log('req.user', req.user);
    // console.log('/api/spots req.body', req.body);
    Spot.find({name: req.body.name, latitude: req.body.latitude, longitude: req.body.longitude})
    .then((spot) => {
      // console.log('found spot', spot);
      if (spot.length > 0) {
        return SpotsUsers.find({userid: req.user.id, spotid: spot[0].id})
        .then((spotuser) => {
          if (spotuser.length > 0) {
            return spotuser;
          } else {
            return SpotsUsers.create({userid: req.user.id, spotid: spot[0].id});
          }
        })
      } else {
        // console.log('creating spot');
        return Spot.create(req.body)
        .then((spot) => {
          // console.log('insert spot ', spot[0], 'with user id', req.user);
          return SpotsUsers.create({userid: req.user.id, spotid: spot[0].id});
        })
      }
    })
    .then((spotuser) => {
      console.log('created new spot', spotuser);
      sendBackJSON(res, req.body, 'created new spot')
    })
    .catch((err) => {
      console.log(err);
      return sendBackJSON(res, err, 'error');
    });
  });

  app.put('/api/spots/:id', (req, res) => {
    Spot.update(req.body)
      .then((result) => sendBackJSON(res, result, 'updated a spot'))
      .catch((err) => sendBackJSON(res, err, 'error'));
  });

  app.delete('/api/spots/:id', (req, res) => {
    Spot.update(req.body)
      .then((result) => sendBackJSON(res, result, 'updated a spot'))
      .catch((err) => sendBackJSON(res, err, 'error'));
  });

  app.post('/api/yelp', (req, res) => {
    // console.log('req.body', req.body);
    requestYelp(req.body, null, true)
    .then(function(data){
      // console.log('yelp data', data);
      sendBackJSON(res, data, 'got all spots')
    })
    .catch(function(err){
      console.log(err);
      res.send(err);
    })
  });

  //sent friend request
  app.post('/api/friendRequest', (req, res) => {
    // Friends.find({username: req.user.username})
    // console.log('req.body', req.body);
    var friendQuery = 
      `SELECT * FROM friends 
      INNER JOIN users 
      ON friends.username=users.username
      WHERE users.username = '${req.user.username}'
      AND friends.friendname = '${req.body.requestee}';`;
    
    Users.find({username: req.body.requestee})
    .then(foundFriend => {
      if (foundFriend.length === 0) {
        res.send('the friend you entered does not exist');
      } else {
        return Friends.rawQuery(friendQuery)
        .then(friend => {
          console.log('friend',friend);
          if (friend.length === 0) {
            //another query to see if friend request already exists
            return FriendRequests.find({requestor: req.user.username, requestee: req.body.requestee})
            .then((request) => {
              if (request.length === 0) {
                return FriendRequests.create({requestor: req.user.username, requestee: req.body.requestee, response: 'pending'})
                .then((request) => {
                  console.log('request stored', request)
                  res.send('friend request sent');
                })
              } else {
                res.send('you have already send a friend request to ' + req.body.requestee);
              }
            });
          } else {
            res.send(req.body.requestee, ' is already a friend');
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      sendBackJSON(res, err, 'error');
    });
  });

  //get friend
  app.get('/api/friends', (req, res) => {
    Friends.find({username: req.user.username})
    .then((friends) => {
      console.log('found friends', friends)
      sendBackJSON(res, friends, 'sending a list of friends')
    })
    .catch((err) => {
      console.log(err);
      sendBackJSON(res, err, 'error')
    });
  });

  //get friend request to you
  app.get('/api/friendRequest', (req, res) => {
    FriendRequests.find({requestor: req.user.username})
    .then((friendRequest) => {
      console.log('pending!!!!!!!!!!',friendRequest);
      sendBackJSON(res, friendRequest, 'sending a list of friendRequest')
    })
    .catch((err) => {
      console.log(err);
      sendBackJSON(res, err, 'error')
    });
  });

  //get friend request to others
  app.get('/api/pendingFriendRequest', (req, res) => {
    FriendRequests.find({requestee: req.user.username})
    .then((pendingFriendRequest) => {
            sendBackJSON(res, pendingFriendRequest, 'sending a list of pendingFriendRequest')
    })
    .catch((err) => {
      console.log(err);
      sendBackJSON(res, err, 'error')
    });
  });

  //accept friend request
  app.post('/api/confirmFriend', (req, res) => {
    console.log('req.body', req.body);
    FriendRequests.find({requestee: req.user.username, requestor: req.body.friendname})
    .then((request) => {
      if (request.length > 0 && request[0].response !== 'accepted') {
        var acceptQuery = 
        `UPDATE friendrequests 
        SET response = 'accepted'
        WHERE requestor = '${req.body.friendname}'
        AND requestee = '${req.user.username}';`;

        return Friends.rawQuery(acceptQuery)
        .then((acceptedRequest) => {
          console.log('acceptedRequest', acceptedRequest);
          return Friends.create({username: req.body.friendname, friendname: req.user.username})
          .then((newfriend) => {
            console.log('newfriend', newfriend);
            return Friends.create({username: req.user.username, friendname: req.body.friendname})
          })
        }) 
      } else {
        console.log('friend request does not exists', request);
        res.send('friend request does not exists');
        return request;
      }
    })
    .then((newfriend) => {
      if (newfriend.length > 0) {
        console.log('friend created', newfriend);
        sendBackJSON(res, newfriend, 'sending new friend');
      }
    })
    .catch((err) => {
      console.log(err);
      sendBackJSON(res, err, 'error')
    });
  });

  //reject friend request
  app.post('/api/rejectFriend', (req, res) => {
    console.log('rejectFriend', req.body);
    FriendRequests.find({requestee: req.user.username, requestor: req.body.friendname})
    .then((request) => {
      if (request.length > 0  && request[0].response !== 'rejected') {
        var rejectQuery = 
        `UPDATE friendrequests 
        SET response = 'rejected'
        WHERE requestor = '${req.body.friendname}'
        AND requestee = '${req.user.username}';`;

        return Friends.rawQuery(rejectQuery)
        .then(rejectedRequest => {
          console.log('rejectedRequest', rejectedRequest);
          sendBackJSON(res, rejectedRequest, 'sending rejected request');
          return rejectedRequest;
        })
      } else {
        console.log('friend request does not exists', request);
        res.send('friend request does not exists');
        return request;
      }
    })
    .catch((err) => {
      console.log(err);
      sendBackJSON(res, err, 'error')
    });
  });

  //clear friend request
  app.post('/api/clearFriendRequest', (req, res) => {
    var deleteQuery = 
      `DELETE FROM friendrequests 
      WHERE requestor = '${req.body.friendname}'
      AND requestee = '${req.body.username}';`;

    Friends.rawQuery(deleteQuery)
    .then((deletedRequest) => {
      res.send('friend request deleted');
    })
    .catch((err) => {
      console.log(err);
      sendBackJSON(res, err, 'error')
    });
  });

  //get friend wishes
    //an array of friend wishes with friendname
    //allow user to send request to fullfill wishes to friend
  app.get('/api/spots/friendWishes', (req, res) => {
    
  });

  //add your own wishes
    //findOrCreate spot then findOrCreate wish
  app.post('/api/spots/wishes', (req, res) => {

  });

  //saved spots should attach wishe boolean
    //send [wishes, not wishes]
    //


}
