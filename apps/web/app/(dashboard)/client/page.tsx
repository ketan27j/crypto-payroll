"use client"
import { useState } from "react";
import { AddClient } from "../../../components/client/AddClient";
import { ClientDetails } from "../../../components/client/ClientDetails";

export default function ClientPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="container mx-auto px-4 py-8 w-full">
            <button 
                onClick={openModal}
                className="btn-secondary hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Add New Client
            </button>
            {isModalOpen && (                
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-3/4 max-w-4xl shadow-lg rounded-md bg-white">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Add New Client</h3>
                            <button onClick={closeModal} className="text-black close-modal">Close</button>
                        </div>
                        <div className="mt-2">
                            <AddClient onClose={closeModal} />
                        </div>
                    </div>
                </div>
            )}
                <div className="mt-8">
                    <ClientDetails />
                </div>
        </div>
    );
}