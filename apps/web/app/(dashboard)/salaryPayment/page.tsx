"use client"
import SalaryPayment from "../../../components/client/SalaryPayment";
import { TransactionHistory } from "../../../components/client/TransactionHistory";

export default function() {
    return (

    <div className="w-full">
            <SalaryPayment></SalaryPayment>
            <TransactionHistory></TransactionHistory>
    </div>
    )
}