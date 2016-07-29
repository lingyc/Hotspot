DROP DATABASE IF EXISTS hotspots;
CREATE DATABASE hotspots;

-- connect to the db (\c)
\c hotspots;

CREATE TABLE spots_users (
  id SERIAL PRIMARY KEY,
  userid INT,
  spotid INT
);

CREATE TABLE spots (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  rating REAL,
  latitude REAL,
  longitude REAL,
  yelp_id VARCHAR
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  username VARCHAR,
  password VARCHAR,
  facebookId BIGINT,
  facebookAccessToken VARCHAR
);

CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  username VARCHAR,
  friendname VARCHAR
);

CREATE TABLE wishes (
  id SERIAL PRIMARY KEY,
  username VARCHAR,
  spotid REAL
);

CREATE TABLE friendrequests (
  id SERIAL PRIMARY KEY,
  requestor VARCHAR,
  requestee VARCHAR,
  response VARCHAR
);