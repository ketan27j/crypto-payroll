"use client"

import AddSchedule from "../../../components/scheduling/AddSchedule"
import { EventList } from "../../../components/scheduling/EventList"


export default async function SchedulingPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="w-full">
                    <AddSchedule />
                </div>
                <div className="w-full">
                    <EventList />
                </div>
            </div>
        </div>
    )
}