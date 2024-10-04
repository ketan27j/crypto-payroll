
"use client"

import React from 'react';
import { useSession } from 'next-auth/react';
import { Card } from '@repo/ui/card';
import { TextInput } from '@repo/ui/textInput';

export const BasicInfo: React.FC = () => {
    const { data: session } = useSession();

    return (
        <Card title="Basic Information">
            <div className="space-y-4">
                <TextInput
                    label="Name"
                    value={session?.user?.name || ''}
                    onChange={() => { } }
                    placeholder="Name"
                    type="text" 
                    readonly={true}                />
                <TextInput
                    label="Email Address"
                    value={session?.user?.email || ''}
                    onChange={() => {}}
                    placeholder="Email Address"
                    type="email" 
                    readonly={true}
                />
                <TextInput
                    label="Address"
                    value={''}
                    onChange={() => {}}
                    placeholder="Address"
                    type="text" 
                    readonly={true}
                />
            </div>
        </Card>
    );
};
