import { TransactionHistory } from "../../../components/client/TransactionHistory";
import Link from 'next/link';

export default function() {
    return <div className="w-full">
        <div className="text-3xl text-black pt-8 mb-8 font-bold">
        </div>
        <div className="mb-8 flex justify-center space-x-6">
            <Link href="/payments">
                <button className="btn-primary hover:bg-[#6d1a80] text-white font-bold py-4 px-8 text-lg rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                    SEND SOL
                </button>
            </Link>
            <Link href="/scheduling">
                <button className="btn-primary hover:bg-[#a778b4] text-white font-bold py-4 px-8 text-lg rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                    SCHEDULE SALARY PAYMENT
                </button>
            </Link>
        </div>
        <div className="w-full">
            <TransactionHistory cardTitle="Recent Transactions"></TransactionHistory>
        </div>
    </div>
}