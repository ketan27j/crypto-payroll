import { AddClient } from "../../../components/AddClient";
import { ClientDetails } from "../../../components/ClientDetails";

export default function() {
    return <div className="w-full">
        <div className="text-3xl text-black pt-8 mb-8 font-bold">
            Client Information
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 p-4">
            <div className="w-1/2">
                <AddClient></AddClient>
            </div>
            <div className="w-full">
                <ClientDetails></ClientDetails>
            </div>
        </div>
    </div>
}