CREATE DATABASE pern_stack_db
//esto es un cambio de prueba
mas cosas
CREATE TABLE users (
  	id uuid PRIMARY KEY NOT NULL UNIQUE,
	username varchar NOT NULL,
  	email varchar NOT NULL UNIQUE,
  	password varchar NOT NULL
);