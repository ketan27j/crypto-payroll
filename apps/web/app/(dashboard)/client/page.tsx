"use client"
import { useState } from "react";
import { AddClient } from "../../../components/client/AddClient";
import { ClientDetails } from "../../../components/client/ClientDetails";

export default function ClientPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="w-full">
            <div className="text-3xl text-black pt-8 mb-8 font-bold">
                Client Information
            </div>
            <button 
                onClick={openModal}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Add New Client
            </button>
            {isModalOpen && (                
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-3/4 max-w-4xl shadow-lg rounded-md bg-white">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Add New Client</h3>
                            <button onClick={closeModal} className="text-black close-modal">×</button>
                        </div>
                        <div className="mt-2">
                            <AddClient onClose={closeModal} />
                        </div>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 p-4">
                <div className="w-full">
                    <ClientDetails />
                </div>
            </div>
        </div>
    );
}