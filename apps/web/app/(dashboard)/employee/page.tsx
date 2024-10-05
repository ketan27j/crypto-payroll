"use client"
import { useState } from "react";
import { AddEmployee } from "../../../components/employee/AddEmployee";
import { EmployeeList } from "../../../components/employee/EmployeeList";

export default function EmployeePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={openModal}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add New Employee
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-3/4 max-w-4xl shadow-lg rounded-md bg-white">
              <div className="flex justify-end items-center">
                <button onClick={closeModal} className="text-black close-modal">Close</button>
              </div>
              <div className="mt-2">
                <AddEmployee onClose={closeModal} />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <EmployeeList />
        </div>
      </div>
    );
}