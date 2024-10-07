"use client"
import React, { useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { TextInput } from "@repo/ui/textInput";
import { Button } from "@repo/ui/button";
import FundTransfer from '../FundTransfer';
import SalaryPayment from '../client/SalaryPayment';
import { Transaction } from '@solana/web3.js';
import { TransactionHistory } from '../client/TransactionHistory';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function PaymentsTab() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [walletKey, setWalletKey] = useState('');

  const userInfo = {
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Main St, City, Country'
  };

  return (
    <div className="w-full px-2 py-16 sm:px-4 md:px-6 lg:px-8">
      <TabGroup>
        <TabList className="flex space-x-1 rounded-xl bg-[#91629b] p-1">
          {['Send SOL', 'Pay Salary', 'Transaction History'].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-lg font-medium ',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-[#541263] text-white shadow text-lg'
                    : 'text-white hover:bg-purple-700/[0.12] hover:text-purple-100'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="mt-2">
          <TabPanel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2">
            <FundTransfer></FundTransfer>
          </TabPanel>
          <TabPanel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2">
            <SalaryPayment></SalaryPayment>
          </TabPanel>
          <TabPanel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2">
            <TransactionHistory></TransactionHistory>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
