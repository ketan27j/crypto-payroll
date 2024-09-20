"use client"
import { Button } from "@repo/ui/button";
import { useState } from "react";
import { EmployeeInfo, addEmployee } from "../../lib/actions/addEmployee";

export default function AddEmployee() {
    const [isLoading, setIsLoading] = useState(false);
    const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo>({
        email: '',
        name: '',
        designation: '',
        functionalTitle: '',
        salary: 0,
        allowances: 0,
        id: 0,
        wallet: '',
        isActive: true,
        clientId: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEmployeeInfo(prev => ({
            ...prev,
            [name]: name === 'salary' || name === 'allowances' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await addEmployee(employeeInfo);
            if (result) {
                // Handle successful addition (e.g., show success message, reset form)
                console.log('Employee added successfully');
            } else {
                // Handle error (e.g., show error message)
                console.error('Failed to add employee');
            }
        } catch (error) {
            console.error('Error adding employee:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Add New Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" id="name" name="name" value={employeeInfo.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" id="email" name="email" value={employeeInfo.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
                    </div>
                    <div>
                        <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
                        <input type="text" id="designation" name="designation" value={employeeInfo.designation} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
                    </div>
                    <div>
                        <label htmlFor="functionalTitle" className="block text-sm font-medium text-gray-700">Functional Title</label>
                        <input type="text" id="functionalTitle" name="functionalTitle" value={employeeInfo.functionalTitle} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
                    </div>
                    <div>
                        <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
                        <input type="number" id="salary" name="salary" value={employeeInfo.salary} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
                    </div>
                    <div>
                        <label htmlFor="allowances" className="block text-sm font-medium text-gray-700">Allowances</label>
                        <input type="number" id="allowances" name="allowances" value={employeeInfo.allowances} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
                    </div>
                </div>
                <div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Adding...' : 'Add Employee'}
                    </Button>
                </div>
            </form>
        </div>
    );
}