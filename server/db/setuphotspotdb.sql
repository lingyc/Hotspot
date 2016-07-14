DROP DATABASE IF EXISTS hotspots;
CREATE DATABASE hotspots;

-- connect to the db (\c)
\c hotspots;

CREATE TABLE spots (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  rating VARCHAR,
  city VARCHAR,
  latitude REAL,
  longitude REAL,
  image VARCHAR,
  spots_users_id INT references spots_users_id(id)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR,
  password VARCHAR,
  spots_users_id INT references spots_users_id(id)
);

CREATE TABLE spots_users (
  id SERIAL PRIMARY KEY,
  userId INT,
  spotId INT
);

INSERT INTO spots (name, description, city, latitude, longitude, image)
  VALUES ('Dads Deck', 'Nice, homey, and outdoors', 'San Leandro', '37.5', '-112', '/boston.jpg', 1);
INSERT INTO spots (name, description, city, latitude, longitude, image)
  VALUES ('Spot 2', 'Rad', 'San Leandro', '100', '-50', '/library.jpg', 1);
INSERT INTO spots (name, description, city, latitude, longitude, image)
  VALUES ('Spot 3', 'Sick...and tight', 'Paris', '37.5', '30',  '/study2.jpg', 1);
