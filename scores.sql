DROP DATABASE IF EXISTS scores;
CREATE DATABASE scores;

\c scores;

CREATE TABLE userScores (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  points INTEGER
);

INSERT INTO userScores (username, points)
  VALUES ('First User', 3);
