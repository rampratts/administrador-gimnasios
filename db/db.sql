--DATABASE
CREATE DATABASE administrador_gimnasios

--TABLES
CREATE TABLE gimnasio (
	id UUID PRIMARY KEY NOT NULL UNIQUE,
    nombre varchar NOT NULL,
    direccion varchar NOT NULL
);

CREATE TABLE usuario (
	id UUID PRIMARY KEY NOT NULL UNIQUE,
	nombre_usuario varchar NOT NULL UNIQUE,
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

CREATE TABLE clases (
	id UUID PRIMARY KEY NOT NULL UNIQUE,
	nombre varchar NOT NULL,
	descripcion varchar,
	horario time,
	lunes boolean DEFAULT false,
	martes boolean DEFAULT false,
	miercoles boolean DEFAULT false,
	jueves boolean DEFAULT false,
	viernes boolean DEFAULT false,
	sabado boolean DEFAULT false,
	domingo boolean DEFAULT false,
	profesor_id UUID REFERENCES profesor(id) NOT NULL
);

CREATE TABLE cliente_clases (
	id UUID PRIMARY KEY NOT NULL UNIQUE,
	cliente_id UUID REFERENCES usuario(id) NOT NULL,
	clases_id UUID REFERENCES clases(id) NOT NULL
);

CREATE TABLE pago (
	id UUID PRIMARY KEY NOT NULL UNIQUE,
	estado_pago boolean NOT NULL,
	fecha_pago DATE,
	cliente_id UUID REFERENCES cliente(id) NOT NULL,
	cantidad DECIMAL(50) NOT NULL
);

CREATE TABLE rutina (
	id UUID PRIMARY KEY NOT NULL UNIQUE,
	nombre VARCHAR NOT NULL,
	descripcion VARCHAR NOT NULL,
	frecuencia INTEGER,
	duracion TIME,
	profesor_id UUID REFERENCES profesor(id) NOT NULL
);

CREATE TABLE rutina_cliente(
	id UUID PRIMARY KEY NOT NULL UNIQUE,
	cliente_id UUID REFERENCES cliente(id) NOT NULL,
	rutina_id UUID REFERENCES rutina(id) NOT NULL

);

CREATE TABLE planAlimentacion (
	id UUID PRIMARY KEY NOT NULL UNIQUE,
	nombre VARCHAR NOT NULL,
	descripcion VARCHAR NOT NULL,
	profesor_id UUID REFERENCES profesor(id) NOT NULL
);

CREATE TABLE planAlimentacion_cliente(
	id UUID PRIMARY KEY NOT NULL UNIQUE,
	cliente_id UUID REFERENCES cliente(id) NOT NULL,
	planAlimentacion_id UUID REFERENCES planAlimentacion(id) NOT NULL
);

CREATE TABLE progreso(
	id UUID PRIMARY KEY NOT NULL UNIQUE,
	descripcion VARCHAR NOT NULL,
	fecha date NOT NULL,
	profesor_id UUID REFERENCES profesor(id) NOT NULL,
    cliente_id UUID REFERENCES cliente(id) NOT NULL
);

CREATE TABLE sugerencia(
	id UUID PRIMARY KEY NOT NULL UNIQUE,
	descripcion VARCHAR NOT NULL,
    usuario_id UUID REFERENCES usuario(id) NOT NULL
);
