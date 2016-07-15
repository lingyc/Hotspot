### Schema ###

Spots currently have the following properties:
  * id
  * name
  * rating
  * latitude
  * longitude
  * image


  ### End Points ###
  ### `GET /api/spots` ###
  Returns an array of all of the spots.

  [{spot1}, {spot2}]

  ### `GET /api/spots/:id` ###
  Returns a single spot.

  {spot}

  ### `POST /api/spots` ###
  Sends a spot to the database

  {spot}

  ### `PUT /api/spots/:id` ###
  Updates a spot with the current id.
  <em> Requires the full spot to be sent in the body </em>

  {spot}

  ### `DELETE /api/spots/:id` ###
  Deletes the spot at that id

  {spot}
