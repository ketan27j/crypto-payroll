
"use client"
import React, { useState } from 'react';
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { changeUserPassword } from '../../app/lib/actions/user';
import { useSession } from 'next-auth/react';

const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters long"),
  confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const session = useSession();

  const handlePasswordChange = async () => {
    if(!session.data?.user?.email) {
      return;
    }
    try {
      passwordChangeSchema.parse({ currentPassword, newPassword, confirmPassword });
      
      let isChanged = await changeUserPassword(session.data?.user?.email, currentPassword, newPassword);
      if(isChanged) {
        toast.success("Password changed successfully");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
      else {
        toast.error("Password could not be changed");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error("An error occurred while changing the password");
      }
    }
  };

  return (
    <Card title='Change Password'>
      <TextInput
        label="Current Password"
        type="password"
        value={currentPassword}
        onChange={setCurrentPassword}
        placeholder="Enter current password"
        readOnly={false}
      />
      <TextInput
        label="New Password"
        type="password"
        value={newPassword}
        onChange={setNewPassword}
        placeholder="Enter new password"
        readOnly={false}
      />
      <TextInput
        label="Confirm New Password"
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="Confirm new password"
        readOnly={false}
      />
      <br />
      <Button onClick={handlePasswordChange}>
        Change Password
      </Button>
    </Card>
  );
};