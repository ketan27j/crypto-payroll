import React, { useEffect, useState } from 'react'
import { EmployeeInfo, getAllEmployees } from '../../app/lib/actions/employee';
import { employeeAddState } from '../../app/store/clientAddState';
import { Table } from '@repo/ui/table';
import { Card } from '@repo/ui/card';
import { ColumnDef } from '@tanstack/react-table';
import { useRecoilState } from 'recoil';

export const EmployeeList = () => {

    const [employeeList, setEmployeeList] = useState<EmployeeInfo[]>([]);
    const [employeeState, setEmployeeState] = useRecoilState(employeeAddState);

    useEffect(() => {
        getAllEmployees().then((res) => {
          const data = res as EmployeeInfo[];
          console.log(data);
          setEmployeeList(data);
        });
      }, [employeeState]);


  const handleEdit = async (id: number) => {
    
  };

  const handleDelete = async (id: number) => {
    
  };
      const columns: ColumnDef<EmployeeInfo>[] = [
        {
          header: 'Id',
          accessorKey: 'id',
        },
        {
          header: 'Name',
          accessorKey: 'name',
        },
        {
          header: 'Email',
          accessorKey: 'email',
        },
        {
          header: 'Phone',
          accessorKey: 'number',
        },
        {
          header: 'Designation',
          accessorKey: 'designation',
        },
        {
          header: 'Wallet',
          accessorKey: 'wallet',
        },
        {
          header: 'Salary',
          accessorKey: 'salary',
        },
        {
          header: 'Allowances',
          accessorKey: 'allowances',
        },
        {
          header: 'Actions',
          cell: ({ row }) => (
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(row.original.id)}>Edit</button>
              <button onClick={() => handleDelete(row.original.id)}>Delete</button>
            </div>
          ),
        }
      ];
    
      return (
        <Card title="Employees">
            <div>
              <Table data={employeeList} columns={columns} />
            </div>
        </Card>

      )
      
    // return (
    //     <>
    //     <div className="overflow-x-auto bg-white shadow-md rounded-lg">
    //       <table className="min-w-full leading-normal">
    //         <thead>
    //           <tr>
    //             <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
    //               Name
    //             </th>
    //             <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
    //               Email
    //             </th>
    //             <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
    //               Designation
    //             </th>
    //             <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
    //               Salary
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {employeeList && employeeList.map((employee) => (
    //             <tr key={employee.id}>
    //               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    //                 <div className="flex items-center">
    //                   <div className="ml-3">
    //                     <p className="text-gray-900 whitespace-no-wrap">
    //                       {employee.name}
    //                     </p>
    //                   </div>
    //                 </div>
    //               </td>
    //               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    //                 <p className="text-gray-900 whitespace-no-wrap">{employee.email}</p>
    //               </td>
    //               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    //                 <p className="text-gray-900 whitespace-no-wrap">{employee.designation}</p>
    //               </td>
    //               <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    //                 <p className="text-gray-900 whitespace-no-wrap">${employee.salary}</p>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
        
    //     </>
}