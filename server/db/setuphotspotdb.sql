DROP DATABASE IF EXISTS hotspots;
CREATE DATABASE hotspots;

-- connect to the db (\c)
\c hotspots;

CREATE TABLE spots_users (
  id SERIAL PRIMARY KEY,
  userId INT,
  spotId INT
);

CREATE TABLE spots (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  rating VARCHAR,
  latitude REAL,
  longitude REAL,
  image VARCHAR,
  spots_users_id INT REFERENCES spots_users(id)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR,
  password VARCHAR,
  spots_users_id INT REFERENCES spots_users(id)
);

INSERT INTO spots_users (userId, spotId)
  VALUES (1, 1);

INSERT INTO users (username, password, spots_users_id)
  VALUES ('alex', 'password', 1);

INSERT INTO spots (name, description, latitude, longitude, image, spots_users_id)
  VALUES ('Dads Deck', 'Nice, homey, and outdoors', '37.5', '-112', '/boston.jpg', '1');

INSERT INTO spots (name, description, latitude, longitude, image, spots_users_id)
  VALUES ('Spot 2', 'Rad', '100', '-50', '/library.jpg', '1');

INSERT INTO spots (name, description, latitude, longitude, image, spots_users_id)
  VALUES ('Spot 3', 'Sick...and tight', '37.5', '30',  '/study2.jpg', '1');
