import React, { useState, useEffect } from "react";
import "./EmployeeTable.css"; // Import CSS file

const API_URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]); // Stores employee data
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 10; // Number of employees per page

    // Fetch employee data from API
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error(error);
                alert("failed to fetch data"); // ✅ Alert message on API failure
            }
        };

        fetchEmployees();
    }, []);

    // Calculate total pages
    const totalPages = Math.ceil(employees.length / employeesPerPage);

    // Get current page data
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    // Handle Next page
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Handle Previous page
    const prevPage = () => {
    if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1); // ✅ Ensure it properly updates the state
    }
};

    return (
        <div className="container">
            <h2>Employee Data</h2>
            <table>
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

            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default EmployeeTable;
