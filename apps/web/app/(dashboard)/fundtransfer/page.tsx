import { FundTranser } from "../../../components/FundTransfer";

export default function() {
    return <div className="w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div className="w-full">
                <FundTranser></FundTranser>
            </div>
        </div>
    </div>
}