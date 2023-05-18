export function getStudents() {
  return fetch("http://localhost:3000/students").then((response) => {
    if (!response.ok) {
      throw new Error(
        `Error making request! Received ${response.status}: ${response.statusText}`
      );
    }

    return response.json();
  });
}

export function getProjects() {
  return fetch("http://localhost:3000/projects").then((response) => {
    if (!response.ok) {
      throw new Error(
        `Error making request! Received ${response.status}: ${response.statusText}`
      );
    }

    return response.json();
  });
}
