import axios from "axios";
// Promise Review

// Why promises? Avoid nested callbacks which are difficult to read.

// Promises represent a future value. They have three states:
// pending
// rejected
// fulfilled

// Creating Promises
// Promise.resolve
// const b = Promise.resolve(8);
// b.then((val) => {
//   console.log(val);
// });
// console.log("hello");
// Promise.reject
// const a = Promise.reject(new Error("Something bad happend"));
// a.catch((err) => {
//   console.log("blah", err);
// });
// new Promise
// const promise = new Promise((resolve, reject) => {
//   reject(4);
// });

// Handling promises
// .then - Attach a handler to run when a promise resolves.
// .catch - Attach a handler to run whena  promise rejects.
// .finally - Attachs a handler which runs when a promise settles.
// Promise.all - Runs multiple promises, and resolves to an array of values of those promises.
// Promise.allSettled
// Promise.any
// Promise.race

// Promise Exercises

// Exercise 1: Given a delay, return a promise which resolves after that period
// of time.
function wait(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

// Exercise 2: Return a promise which resolves to a list of students.
async function getStudents() {
  const response = await axios.get("http://localhost:3000/students");

  return response.data;
}

// Exercise 3: Return a promise which resolves to a list of projects.
async function getProjects() {
  const response = await axios.get("http://localhost:3000/projects");

  return response.data;
}

// Exercise 4: Given a student email, return a list of their grades.
async function emailToId(email) {
  const students = await getStudents();
  return students.find((el) => el.email === email).id;
}

async function projectsForEmail(email) {
  const studentId = await emailToId(email);
  const projects = await getProjects();

  return projects.filter((project) => project.student_id === studentId);
}

// Exercise 5: Given a student email and project name, return their grade on
// that project.
async function studentGradeOnProject(email, projectName) {
  const projects = await projectsForEmail(email);
  const project = projects.find((project) => project.name === projectName);

  return project.score;
}

studentGradeOnProject("jc@gmail.com", "SQL Injection").then((data) => {
  console.log(data);
});

// Exercise 6: Given a project name, dump the student names and grades on that
// project to a file.
