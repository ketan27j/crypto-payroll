"use client"

import AddSchedule from "../../../components/scheduling/AddSchedule"


export default async function SchedulingPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mt-8">
                <AddSchedule></AddSchedule>
            </div>
            <div className="mt-8">
                {/* <ScheduleSummary></ScheduleSummary> */}
            </div>
        </div>
    )
}