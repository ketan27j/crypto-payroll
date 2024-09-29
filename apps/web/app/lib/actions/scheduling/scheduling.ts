"use server";
import prisma from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { sendNotification } from "../notification";
const schedule = require('node-schedule');

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

  const session = await getServerSession(authOptions);
  console.log('session', session);
  if (!session?.user) {
    return [];
  }

  const userId = Number(session.user.id);
  console.log('userId', userId);
  let userInfo = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if(userInfo) {

    let newEvent = await prisma.event.upsert({
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
  
      await scheduleEvent(newEvent.id, title, date, time, userInfo);
    
  }
}

export async function scheduleEvent(eventId: number, title: string, scheduleDate: Date, time: string, eventOwner: any) {
  const [hours, minutes] = time.split(':');
  const cronExpression = `${minutes} ${hours} ${scheduleDate.getDate()} ${scheduleDate.getMonth() + 1} *`;

  console.log('cronExpression', cronExpression);
    schedule.scheduleJob(cronExpression, function(){
        console.log(`Starting as scheduled: Event eventId: ${eventId}, title: ${title} scheduled for: ${scheduleDate.toDateString()} at ${time}`);
        // sendEmail(eventOwner.email, eventOwner.name, `Scheduled Event Triggered: ${title}`, `Event: ${title} scheduled for: ${scheduleDate.toDateString()} at ${time}`, '');
        let body = `Event: ${title} scheduled for: ${scheduleDate.toDateString()} at ${time}`;
        let redirect_url = `${(process.env.APP_URL || 'http://localhost:3000')}/profile`;

        let htmlContent = `
            <html>
              <body>
                <h2>${body}</h2>
                <br><br>
                <a href="${redirect_url}" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Click Here</a>
              </body>
            </html>
          `;
        sendNotification('decentralizedappengineering@gmail.com', eventOwner.name, `Scheduled Event Triggered: ${title}`, htmlContent , '');
    });
    
  console.log(`Event owner: ${eventOwner.name} eventId: ${eventId}, title: ${title} scheduled for: ${scheduleDate.toDateString()} at ${time}`);
}


export async function getEventsForYearRange(): Promise<EventInfo[]> {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  const events = await prisma.event.findMany({
    where: {
      date: {
        gte: oneYearAgo,
        lte: oneYearFromNow,
      },
    },
  });

  return events.map(event => ({
    id: event.id,
    type: event.type,
    title: event.title,
    description: event.description || '',
    date: event.date,
    time: event.time,
    createdAt: event.createdAt,
    createdBy: event.createdBy,
  }));
}
