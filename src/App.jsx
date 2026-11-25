
import React, { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "John", course: "React JS" },
    { id: 2, name: "Rahul", course: "Next JS" }
  ]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  // Add and Update Student
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !course.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (editId !== null) {
      setStudents(
        students.map((student) =>
          student.id === editId
            ? { ...student, name, course }
            : student
        )
      );

      setEditId(null);
    } else {
      const newStudent = {
        id: Date.now(),
        name: name,
        course: course
      };

      setStudents([...students, newStudent]);
    }

    setName("");
    setCourse("");
  };

  // Edit Student
  const handleEdit = (student) => {
    setName(student.name);
    setCourse(student.course);
    setEditId(student.id);
  };

  // Delete Student
  const handleDelete = (id) => {
    setStudents(
      students.filter((student) => student.id !== id)
    );

    if (editId === id) {
      setEditId(null);
      setName("");
      setCourse("");
    }
  };

  // Search Student
  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.course}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <h1>Student Management System</h1>

      <p className="total">
        Total Students: {students.length}
      </p>

      <form onSubmit={handleSubmit}>

        <label>Student Name</label>

        <input
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Course</label>

        <input
          type="text"
          placeholder="Enter course name"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <button type="submit" className="add-btn">
          {editId !== null
            ? "Update Student"
            : "Add Student"}
        </button>

      </form>

      <input
        className="search"
        type="text"
        placeholder="Search students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-wrapper">
        <table>

          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredStudents.map((student, index) => (
              <tr key={student.id}>

                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.course}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="4">
                  No students found
                </td>
              </tr>
            )}

          </tbody>

        </table>
      </div>

    </div>
  );
}

export default App;
