INSERT INTO students (
    id,
    name,
    email,
    phone,
    address,
    birthdate,
    semester,
    status
) VALUES
(1001, 'Juan Perez', 'juan.perez@gmail.com', '3001234567', 'Calle 10 # 15-20', '2002-05-15', 3, TRUE),

(1002, 'Maria Gomez', 'maria.gomez@gmail.com', '3012345678', 'Carrera 20 # 10-30', '2001-08-22', 5, TRUE),

(1003, 'Carlos Rodriguez', 'carlos.rodriguez@gmail.com', '3023456789', 'Calle 25 # 12-40', '2003-01-10', 2, TRUE),

(1004, 'Laura Martinez', 'laura.martinez@gmail.com', '3034567890', 'Carrera 15 # 8-25', '2000-11-30', 7, TRUE),

(1005, 'Andres Lopez', 'andres.lopez@gmail.com', '3045678901', 'Calle 30 # 20-15', '2002-03-18', 4, TRUE),

(1006, 'Daniela Ramirez', 'daniela.ramirez@gmail.com', '3056789012', 'Carrera 12 # 5-18', '2001-06-25', 6, TRUE),

(1007, 'Santiago Torres', 'santiago.torres@gmail.com', '3107890123', 'Calle 18 # 22-10', '2003-09-12', 1, TRUE),

(1008, 'Valentina Hernandez', 'valentina.hernandez@gmail.com', '3118901234', 'Carrera 8 # 14-32', '2002-12-05', 8, TRUE),

(1009, 'Sebastian Castro', 'sebastian.castro@gmail.com', '3129012345', 'Calle 40 # 18-22', '2001-04-14', 9, TRUE),

(1010, 'Camila Moreno', 'camila.moreno@gmail.com', '3130123456', 'Carrera 25 # 30-12', '2000-07-20', 10, TRUE);

INSERT INTO courses (
    name,
    description,
    credits,
    semester,
    status
) VALUES
('Programación I', 'Fundamentos de programación, algoritmos y lógica computacional.', 3, 1, TRUE),

('Matemáticas I', 'Fundamentos de álgebra, ecuaciones, funciones y operaciones matemáticas.', 4, 1, TRUE),

('Bases de Datos', 'Modelado de datos, lenguaje SQL y sistemas gestores de bases de datos.', 3, 3, TRUE),

('Programación Web I', 'Desarrollo de aplicaciones web utilizando HTML, CSS, JavaScript y TypeScript.', 3, 4, TRUE),

('Arquitectura de Software', 'Principios, patrones y estilos arquitectónicos para el desarrollo de software.', 3, 6, TRUE),

('Ingeniería de Software', 'Procesos, metodologías ágiles y buenas prácticas para el desarrollo de software.', 3, 5, TRUE),

('Redes de Computadores', 'Fundamentos de redes, protocolos de comunicación y modelos de referencia.', 3, 4, TRUE),

('Sistemas Operativos', 'Administración de procesos, gestión de memoria y sistemas de archivos.', 3, 3, TRUE),

('Desarrollo de Aplicaciones Móviles', 'Fundamentos y desarrollo de aplicaciones para dispositivos móviles.', 3, 7, TRUE),

('Inteligencia Artificial', 'Fundamentos de inteligencia artificial, aprendizaje automático y algoritmos inteligentes.', 4, 8, TRUE);

INSERT INTO calificaciones (
    id,
    student_id,
    course_id,
    grade,
    comments,
    status
) VALUES
(1, 1001, 1, 4.5, 'Buen desempeño en el curso.', TRUE),

(2, 1002, 2, 3.8, 'Necesita mejorar en algunos conceptos.', TRUE),

(3, 1003, 3, 4.2, 'Excelente participación en clase.', TRUE),

(4, 1004, 4, 2.9, 'Requiere más práctica en programación.', TRUE),

(5, 1005, 5, 4.7, 'Muy buen trabajo en proyectos.', TRUE),

(6, 1006, 6, 3.5, 'Debe reforzar los conceptos de ingeniería de software.', TRUE),

(7, 1007, 7, 4.0, 'Buen desempeño en redes de computadores.', TRUE),

(8, 1008, 8, 3.2, 'Necesita mejorar en sistemas operativos.', TRUE),

(9, 1009, 9, 4.8, 'Excelente desarrollo de aplicaciones móviles.', TRUE),

(10, 1010, 10, 4.1, 'Buen desempeño en inteligencia artificial.', TRUE);

INSERT INTO horarios(
    dia,
    hora_inicio,
    hora_fin,
    asignatura
) VALUES
('Lunes', '08:00', '10:00', 'Programación I'),
('Lunes', '10:00', '12:00', 'Matemáticas I'),

('Martes', '08:00', '10:00', 'Bases de Datos'),
('Martes', '10:00', '12:00', 'Programación Web I'),

('Miércoles', '08:00', '10:00', 'Arquitectura de Software'),
('Miércoles', '10:00', '12:00', 'Ingeniería de Software'),

('Jueves', '08:00', '10:00', 'Redes de Computadores'),
('Jueves', '10:00', '12:00', 'Sistemas Operativos'),

('Viernes', '08:00', '10:00', 'Desarrollo de Aplicaciones'),
('Viernes', '10:00', '12:00', 'Inteligencia Artificial');
