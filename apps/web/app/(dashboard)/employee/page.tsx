"use client"
import { AddEmployee } from "../../../components/employee/AddEmployee";
import { EmployeeList } from "../../../components/employee/EmployeeList";

export default async function EmployeePage() {

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mt-8">
          <AddEmployee></AddEmployee>
        </div>
        <div className="mt-8">
          <EmployeeList></EmployeeList>
        </div>
      </div>
    );
}