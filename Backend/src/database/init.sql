CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(10) UNIQUE NOT NULL,
    address VARCHAR(150) NOT NULL,
    birthdate DATE NOT NULL,
    semester INTEGER NOT NULL CHECK (semester BETWEEN 1 AND 10),
    status BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    credits INTEGER NOT NULL CHECK (credits BETWEEN 1 AND 10),
    semester INTEGER NOT NULL CHECK (semester BETWEEN 1 AND 10),
    status BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS calificaciones (
    id INT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    grade NUMERIC(3, 2) NOT NULL,
    comments VARCHAR(255),
    status BOOLEAN DEFAULT TRUE,
)

-- horarios
CREATE TABLE horarios(
    id SERIAL PRIMARY KEY,
    dia VARCHAR(20) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL
    asignatura VARCHAR(100) NOT NULL
);
    status BOOLEAN DEFAULT TRUE

