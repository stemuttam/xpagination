import React, { useEffect, useState } from "react";
import "./EmployeeTable.css"; // Importing CSS for styling

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10; // 10 employees per page

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employee data:", error));
  }, []);

  // Calculate indexes for pagination
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Calculate total pages
  const totalPages = Math.ceil(employees.length / employeesPerPage);

  // Handle Next and Previous
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="container">
      <h2>Employee Data Table</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="page-btn"
        >
          Previous
        </button>
        <span className="page-number">{currentPage}</span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="page-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;
