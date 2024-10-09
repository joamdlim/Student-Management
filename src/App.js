import React, { useState } from "react";
import './App.css';

const initialData = [
  { id: 1, lastName: "Lim", firstName: "Joash", course: "IT", birthdate: "2000/04/15" },
  { id: 2, lastName: "Natividad", firstName: "Karl", course: "CS", birthdate: "1998/02/22" },
  { id: 3, lastName: "Arapoc", firstName: "Beatrice", course: "IS", birthdate: "1999/11/30" },
  { id: 4, lastName: "Alcaide", firstName: "Hannah", course: "DS", birthdate: "2001/06/18" },
];

const allowedCourses = ["IT", "IS", "CS", "DS"];

const calculateAge = (birthdate) => {
  const birthDateObj = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDifference = today.getMonth() - birthDateObj.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age;
};

function App() {
  const [query, setQuery] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const filteredData = initialData.filter((person) => {
    const personAge = calculateAge(person.birthdate);

    const matchesQuery =
      person.lastName.toLowerCase().includes(query.toLowerCase()) ||
      person.firstName.toLowerCase().includes(query.toLowerCase()) ||
      person.course.toLowerCase().includes(query.toLowerCase()) ||
      personAge.toString().includes(query);

    const birthDateObj = new Date(person.birthdate);
    const matchesDateRange =
      (!minDate || birthDateObj >= new Date(minDate)) &&
      (!maxDate || birthDateObj <= new Date(maxDate));

    return matchesQuery && matchesDateRange;
  });

  return (
    <div>
      <h2>Student Management Table</h2>

      <div>
        <label>Search: </label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Last Name, First Name, Age, Course"
        />
      </div>

      <div>
        <label>Min Birthdate (YYYY/MM/DD): </label>
        <input
          type="text"
          value={minDate}
          onChange={(e) => setMinDate(e.target.value)}
          placeholder="YYYY/MM/DD"
        />
        <label>Max Birthdate (YYYY/MM/DD): </label>
        <input
          type="text"
          value={maxDate}
          onChange={(e) => setMaxDate(e.target.value)}
          placeholder="YYYY/MM/DD"
        />
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Course</th>
            <th>Birthdate</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((person) => (
            <tr key={person.id}>
              <td>{person.lastName}</td>
              <td>{person.firstName}</td>
              <td>{allowedCourses.includes(person.course) ? person.course : "N/A"}</td>
              <td>{person.birthdate}</td>
              <td>{calculateAge(person.birthdate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
