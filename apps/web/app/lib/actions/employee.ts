"use server";
import prisma from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

import nodemailer from 'nodemailer';
import { sendNotification } from "./notification";
// var SibApiV3Sdk = require('sib-api-v3-sdk');

export interface EmployeeInfo {
    id: number,
    email: string | null,
    name: string | null,
    designation: string | null,
    functionalTitle: string | null,
    wallet: string | null,
    salary: number,
    allowances: number,
    isActive: Boolean | null,
    clientId: number,
    addressLine1: string | null,
    addressLine2: string | null,
    city: string | null,
    state: string | null,
    country: string | null,
    taxJurisdiction: string | null,
}

export async function addEmployee(employeeInfo: EmployeeInfo) {
  console.log('Adding new employee in lib function')
    try{
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return null;
        }
        const userId = Number(session.user.id); 
        console.log('userId', userId);
        const client = await prisma.client.findUnique({
            where: {
                userId: userId,
            },
        });
        console.log('client', client);
        if (!client) {
            return null;
        }
        const newUser = await prisma.user.create({
          data: {
              email: employeeInfo.email,
              password: 'test',
              name: employeeInfo.name,
              role: 'Employee',
              createdBy: client.userId
          }
        });
        const employee = await prisma.employee.create({
          data: {
              designation: employeeInfo.designation,
              functionalTitle: employeeInfo.functionalTitle,
              salary: Number(employeeInfo.salary),
              allowances: Number(employeeInfo.allowances),
              clientId: client.id,
              createdBy: client.userId,
              userId: newUser.id,
          }
        });
        console.log('employeed created', employee);
        let to = employeeInfo.email || 'decentralizedappengineering@gmail.com';
        let receiverName = employeeInfo.name || 'There';
        let subject = "Welcome to Dapp - Complete Onboarding";
        let body = "<h1> Congratulations!! You are just one step away from onboarding to DApp!! </h1>";
        let redirect_url = `${(process.env.APP_URL || 'http://localhost:3000')}/profile`;

        let htmlContent = `
        <html>
          <body>
            ${body}
            <br><br>
            <a href="${redirect_url}" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Click Here</a>
          </body>
        </html>
      `;
        // sendEmail(to, "Dapp Admin", "Welcome to Dapp - Complete Onboarding", "<h1> Congratulations!! You are just one step away from onboarding to DApp!! </h1>", 
        //   app_url);
        sendNotification(to, receiverName, subject, htmlContent);
        console.log('Email sent to', to);
        return employee;
        } catch (error) {
            console.log(error);
            return null;
        }
}    




export async function getAllEmployees(): Promise<EmployeeInfo[]> {
  try {
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
    let whereClause = {};
    if (userInfo && userInfo.role !== 'Admin') {
      whereClause = {
        client: {
          userId: userId,
        },
      };
    }
    const employees = await prisma.employee.findMany({
      where: whereClause,
      include: {
        client: {
          include: {
            user: true,
          },
        },
        user: true
      },
    });
    console.log('employees', employees);
    const transformedEmployees: EmployeeInfo[] = employees.map(employee => ({
      id: employee.id,
      email: employee.user.email,
      name: employee.user.name,
      designation: employee.designation,
      functionalTitle: employee.functionalTitle,
      wallet: employee.wallet,
      salary: employee.salary,
      allowances: employee.allowances || 0,
      isActive: employee.isActive,
      clientId: employee.clientId,
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      taxJurisdiction: '',
    }));

    return transformedEmployees;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
}
/*
export async function sendViaBrevo() {
  var defaultClient = SibApiV3Sdk.ApiClient.instance;

  // Configure API key authorization: api-key
  var apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  // Uncomment below two lines to configure authorization using: partner-key
  // var partnerKey = defaultClient.authentications['partner-key'];
  // partnerKey.apiKey = 'YOUR API KEY';

  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
  let to = 'decentralizedappengineering@gmail.com';

  sendSmtpEmail = {
    to: [{
      email: to,
      name: 'Decentralized App'
    }],
    templateId: 59,
    params: {
      name: 'Decentralized',
      surname: 'App'
    },
    headers: {
      'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
    }
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data: any) {
    console.log('API called successfully. Returned data: ');
  }, function(error: any) {
    console.error("error occurred");
    // console.error(error);
  });
}
*/

export async function sendEmail(to: string, from: string, subject: string, body: string, buttonUrl: string) {
  console.log(`Sending email from: ${process.env.GMAIL_APP_USER}, to: ${to}`);
  const transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    // port: 587,
    // secure: false,
    // auth: {
    //   user: process.env.GMAIL_APP_USER,
    //   pass: process.env.GMAIL_APP_PASSWORD // Use an app password for better security
    // }
    host: 'smtp-relay.brevo.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_APP_USER,
      pass: process.env.GMAIL_APP_PASSWORD // Use an app password for better security
    }
  });
  const htmlContent = `
    <html>
      <body>
        ${body}
        <br><br>
        <a href="${buttonUrl}" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Click Here</a>
      </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.GMAIL_APP_USER,
    to: to,
    subject: subject,
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// const result = await sendEmail(
//   'recipient@example.com',
//   'sender@example.com',
//   'Test Subject',
//   'This is the email body content.',
//   'http://localhost:3000/some-path'
// );

// if (result) {
//   console.log('Email sent successfully');
// } else {
//   console.log('Failed to send email');
// }
