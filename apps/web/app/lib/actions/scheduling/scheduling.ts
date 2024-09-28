"use server";
import prisma from "@repo/db";

export interface EventInfo {
    id?: number;
    type: string;
    title: string
    description: string;
    date: Date;
    time: string;
    createdAt: Date;
    createdBy: number;
}


export async function addOrUpdateEvent(eventInfo: EventInfo) {
  const { id, type, title, description, date, time, createdBy } = eventInfo;
  return await prisma.event.upsert({
    where: {
      id: id || -1, // Use -1 if id is not provided (for new events)
    },
    update: {
      type,
      title,
      description,
      date,
      time,
      createdBy,
    },
    create: {
      type,
      title,
      description,
      date,
      time,
      createdBy,
    },
  });
}
