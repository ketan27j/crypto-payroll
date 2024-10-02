"use client"
import React, { useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { TextInput } from "@repo/ui/textInput";
import { Button } from "@repo/ui/button";
import { WalletInfo } from './WalletInfo';
import { BasicInfo } from './BasicInfo';
import { Settings } from './Settings';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ProfileTabs() {
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
        <TabList className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {['Settings', 'Basic Info', 'Wallet Info'].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="mt-2">
          <TabPanel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            <Settings />
          </TabPanel>
          <TabPanel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            <BasicInfo />
          </TabPanel>
          <TabPanel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            <WalletInfo />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
