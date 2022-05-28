insert into usuarios (nombre,username,password,enabled) values('carlos','olakase@gmail.com','$2a$10$9GRKZgK48VvEelEnLg.q3uJPr3P6S6zp7CUpVSbBlG2sJHqG5v7fy',1);
insert into usuarios (nombre,username,password,enabled) values('salome','olakase2@gmail.com','$2a$10$9GRKZgK48VvEelEnLg.q3uJPr3P6S6zp7CUpVSbBlG2sJHqG5v7fy',1);

insert into roles(nombre) values('ROLE_USER');
insert into usuarios_roles(usuario_id,role_id) values(1,1);
insert into usuarios_roles(usuario_id,role_id) values(2,1);

insert into rutinas (nombre_rutina, series,usuario_id) values('piernas martes',3,1);
insert into usuarios_rutinas (usuario_id,rutinas_id) values(1,1);
insert into ejercicios (duracion, nombre,rutina_id) values(2,'pierna',1);
insert into rutinas_ejercicios (ejercicios_id,rutina_id) values(1,1);

insert into rutinas (nombre_rutina, series,usuario_id) values('piernas miercoles',3,1);
insert into usuarios_rutinas (usuario_id,rutinas_id) values(1,2);
insert into ejercicios (duracion, nombre,rutina_id) values(2,'pierna',2);
insert into rutinas_ejercicios (ejercicios_id,rutina_id) values(2,2);