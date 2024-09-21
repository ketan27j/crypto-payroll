"use client";
import React, { useEffect, useState } from 'react';
import { Table } from '@repo/ui/table';
import { ColumnDef } from '@tanstack/react-table';
import { deleteClient, getClientDetails } from "../app/lib/actions/client";
import {type Client} from "@prisma/client";
import { Card } from '@repo/ui/card';
import { useRecoilState } from 'recoil';
import { clientAddState } from '../app/store/clientAddState';
import toast from 'react-hot-toast';

export const ClientDetails = () => {
  const [ClientDetails, setClientDetails] = useState<Client[]>([]);
  const [clientState, setClientState] = useRecoilState(clientAddState);
  const columns: ColumnDef<Client>[] = [
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
      header: 'KYC status',
      accessorKey: 'kycok',
    },
    {
      header: 'wallet',
      accessorKey: 'wallet',
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button onClick={() => handleDelete(row.original.id)}>Delete</button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getClientDetails().then((res) => {
      const data = res as Client[];
      console.log(data);
      setClientDetails(data);
    });
  }, [clientState]);

  const handleDelete = async (id: number) => {
    const success = await deleteClient(id);
    if (success) {
      toast.success("Client deleted successfully");
      setClientState(clientState+1);
    }
  };

  return (
    <Card title="Client Details">
        <div>
          <Table data={ClientDetails} columns={columns} />
        </div>
    </Card>
  );
};


