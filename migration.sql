DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS student;

CREATE TABLE student (
  id SERIAL PRIMARY KEY,
  email TEXT,
  name TEXT
);

CREATE TABLE project (
  id SERIAL,
  name TEXT,
  score NUMERIC(3, 2),
  student_id INTEGER REFERENCES student(id) ON DELETE SET NULL
);

INSERT INTO student (email, name) VALUES ('jc@gmail.com', 'JC Denton');
INSERT INTO student (email, name) VALUES ('david@gmail.com', 'David Sarif');
INSERT INTO student (email, name) VALUES ('anna@gmail.com', 'Anna Navarre');

INSERT INTO project (name, score, student_id) VALUES ('Machine Learning 101', .98, 1);
INSERT INTO project (name, score, student_id) VALUES ('Pixel Art Breaker', .8, 1);
INSERT INTO project (name, score, student_id) VALUES ('SQL Injection', .73, 1);

INSERT INTO project (name, score, student_id) VALUES ('Machine Learning 101', .63, 2);
INSERT INTO project (name, score, student_id) VALUES ('Pixel Art Breaker', .93, 2);
INSERT INTO project (name, score, student_id) VALUES ('SQL Injection', .48, 2);

INSERT INTO project (name, score, student_id) VALUES ('Machine Learning 101', .87, 3);
INSERT INTO project (name, score, student_id) VALUES ('Pixel Art Breaker', .19, 3);
INSERT INTO project (name, score, student_id) VALUES ('SQL Injection', 1.0, 3);
