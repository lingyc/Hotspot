# Data Flow Summary #

## Contents ##
* [User Loads Map Initially](#initial-load-of-application)
* [User Adds New Point](#user-adds-new-location)

### Initial Load of Application ###
*Start Client Side*
1. Client sends off a get request to fetchCollection function included as part of index.jsx. This is initiated through the Panel component. Endpoint is `/api/spots`.

*Switch to Server Side*
2. The server routes the request through apiRoutes.js.
3. The database information is grabbed through Spot.getAll.
4. Successful response from the database triggers a Yelp get request to gather additional data including; image URL and cuisine.
5. Upon successful request the database object and Yelp data are merged together and sent back to the client side.

*Switch to Client Side*
6. Client renders points layer utilizing response object.

* * *
### User Adds New Location ###
*Start Client side*
1. Search bar in Mapbox provides a geoJSON point. This causes a new point to render on the map through the foundRestaurant function. Included on this point is a Popup with a rating question and a submit button.
2. Clicking the submit button in (1.) triggers the clickLocationSubmit function included in index.jsx. This function sends a post request to the server endpoint `/api/spots`. Included in the point request is the following data; latitude, longitude, name of restaurant, and rating.

*Switch to Server Side*
3. The server routes the request through apiRoutes.js. This routes to the database through Spots.js in the db section. Upon successful post,
4. Send data back to user including the database object and a message saying 'created new spot'.

*Switch to Client Side*
5. Client side renders all spots including new restaurant. Please see [above](#initial-load-of-application).
