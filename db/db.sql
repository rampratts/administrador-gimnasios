CREATE DATABASE administrador_gimnasios

CREATE TABLE gimnasio (
	id UUID PRIMARY KEY NOT NULL UNIQUE,
    nombre varchar NOT NULL,
    direccion varchar NOT NULL
);

CREATE TABLE usuario (
	id UUID PRIMARY KEY NOT NULL UNIQUE,
  	nombre varchar NOT NULL,
  	apellido varchar NOT NULL,
    email varchar NOT NULL,
  	contrasena varchar NOT NULL,
  	fecha_nacimiento date NOT NULL,
  	documento_identidad varchar NOT NULL,
  	telefono varchar NOT NULL,
    fecha_inicio date NOT NULL,
  	tipo_usuario varchar NOT NULL,
  	gimnasio_id UUID REFERENCES gimnasio(id) NOT NULL
);

CREATE TABLE profesor (
	id UUID PRIMARY KEY NOT NULL UNIQUE,
  	area varchar NOT NULL,
    calificado boolean NOT NULL,
    usuario_id UUID REFERENCES usuario(id) NOT NULL 
);

CREATE TABLE administrativo (
	id UUID PRIMARY KEY NOT NULL UNIQUE,
  	area varchar NOT NULL,
    usuario_id UUID REFERENCES usuario(id) NOT NULL 
);

CREATE TABLE cliente (
	id UUID PRIMARY KEY NOT NULL UNIQUE,
	pago_mensual decimal NOT NULL,
  	deuda decimal,
  	peso_actual decimal,
  	imc decimal,
  	usuario_id UUID REFERENCES usuario(id) NOT NULL 
);