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
  	deuda decimal,p
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

--VIEWS

--Esta view devuelve todos los usuarios con informacion sobre su tipo
CREATE VIEW usuarios AS
SELECT usuario.id, nombre_usuario, usuario.nombre, apellido, tipo_usuario, gimnasio.nombre AS gimnasio
FROM usuario 
INNER JOIN gimnasio ON gimnasio.id = gimnasio_id;

--Devuelve informacion sobre los administrativos
CREATE VIEW administrativos AS
SELECT administrativo.id AS admin_id, usuario.id AS usuario_id, usuario.nombre_usuario, usuario.nombre, usuario.apellido, administrativo.area, gimnasio.nombre AS gimnasio
FROM administrativo
INNER JOIN usuario ON usuario_id = usuario.id
INNER JOIN gimnasio on usuario.gimnasio_id = gimnasio.id;

--Devuelve informacion sobre los profesores
CREATE VIEW profesores AS
SELECT profesor.id AS prof_id, usuario.id AS usuario_id, usuario.nombre_usuario, usuario.nombre, usuario.apellido, profesor.area, profesor.calificado, gimnasio.nombre AS gimnasio
FROM profesor
INNER JOIN usuario ON usuario_id = usuario.id
INNER JOIN gimnasio on usuario.gimnasio_id = gimnasio.id;

--Devuelve informacion sobre los clientes
CREATE VIEW clientes AS
SELECT cliente.id AS clilente_id, usuario.id AS usuario_id, usuario.nombre_usuario, usuario.nombre, usuario.apellido, cliente.pago_mensual, cliente.deuda, cliente.peso_actual, cliente.imc, gimnasio.nombre AS gimnasio
FROM cliente
INNER JOIN usuario ON usuario_id = usuario.id
INNER JOIN gimnasio on usuario.gimnasio_id = gimnasio.id;

--Devuelve todas las clases, con sus clientes y profesores
CREATE VIEW clases_view AS
SELECT 
	clases.id AS clase_id,
	clases.nombre AS nombre_clase,
	clases.descripcion,
	clases.lunes,
	clases.martes,
	clases.miercoles,
	clases.jueves,
	clases.viernes,
	clases.sabado,
	clases.domingo,
	usuario.nombre_usuario AS profesor,
	usuario.nombre,
	usuario.apellido,
	gimnasio.nombre AS gimnasio
FROM clases
INNER JOIN profesor ON profesor_id = profesor.id
INNER JOIN usuario ON profesor.usuario_id = usuario.id
INNER JOIN gimnasio ON usuario.gimnasio_id = igimnasio.id;

--Devuelve todos los pagos, con informacion sobre sus clientes
CREATE VIEW pagos AS
SELECT 
	pago.id AS pago_id,
	pago.estado_pago,
	pago.fecha_pago,
	pago.cantidad,
	usuario.nombre_usuario AS nombre_cliente,
	usuario.nombre,
	usuario.apellido,
	gimnasio.nombre AS gimnasio
FROM pago
INNER JOIN cliente ON cliente_id = cliente.id
INNER JOIN usuario ON cliente.usuario_id = usuario.id
INNER JOIN gimnasio ON usuario.gimnasio_id = gimnasio.id;
