import React, { useState } from "react";
import './App.css';

const initialData = [
  { id: 1, lastName: "Lim", firstName: "Joash", course: "IT", birthdate: "2000/04/15" },
  { id: 2, lastName: "Natividad", firstName: "Karl", course: "CS", birthdate: "1998/02/22" },
  { id: 3, lastName: "Arapoc", firstName: "Beatrice", course: "IS", birthdate: "1999/11/30" },
  { id: 4, lastName: "Alcaide", firstName: "Hannah", course: "DS", birthdate: "2001/06/18" },
];

const studCourses = ["IT", "IS", "CS", "DS"];

// Function to calculate age based on birthdate
const ageCalculation = (birthdate) => {
  const birthdayDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthdayDate.getFullYear();
  const monthDifference = today.getMonth() - birthdayDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdayDate.getDate())) {
    age--;
  }
  return age;
};

// Function to format date to YYYY/MM/DD for display
const formatDate = (dateString) => {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
};

function App() {
  const [query, setQuery] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const filteredData = initialData.filter((person) => {
    const personAge = ageCalculation(person.birthdate);

    // Match the search query
    const matchesQuery =
      person.lastName.toLowerCase().includes(query.toLowerCase()) ||
      person.firstName.toLowerCase().includes(query.toLowerCase()) ||
      person.course.toLowerCase().includes(query.toLowerCase()) ||
      personAge.toString().includes(query);

    const birthdayDate = new Date(person.birthdate);
    
    // Apply date filtering if min and max dates are provided
    const matchesDateRange =
      (!minDate || birthdayDate >= new Date(minDate)) &&
      (!maxDate || birthdayDate <= new Date(maxDate));

    return matchesQuery && matchesDateRange;
  });

  return (
    <div className="app-container">
      <h2>Student Management Table</h2>

      <div className="search-section">
        <label>Search: </label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Last Name, First Name, Age, Course"
        />
      </div>

      <div className="date-filter-section">
        <label>Min Birthdate: </label>
        <input
          type="date"
          value={minDate}
          onChange={(e) => setMinDate(e.target.value)}
        />
        <label>Max Birthdate: </label>
        <input
          type="date"
          value={maxDate}
          onChange={(e) => setMaxDate(e.target.value)}
        />
      </div>

      <table className="student-table">
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
              <td>{studCourses.includes(person.course) ? person.course : "N/A"}</td>
              <td>{formatDate(person.birthdate)}</td>
              <td>{ageCalculation(person.birthdate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
