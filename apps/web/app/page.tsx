import React from 'react';
import Head from 'next/head';

const features = [
  {
    title: "User Authentication and Onboarding",
    description: "Allow businesses and freelancers to create accounts, integrate identity verification, and enhance security with 2FA."
  },
  {
    title: "Dashboard",
    description: "Display a summary of account balances, recent transactions, and pending tasks with different views for administrators, employees, and freelancers."
  },
  {
    title: "Payroll Management",
    description: "Add, edit, and remove employees or freelancers, set up salary details, and automate payroll processing."
  },
  {
    title: "Invoicing",
    description: "Generate and send invoices in cryptocurrency, track the status of invoices, and send automated reminders for unpaid invoices."
  },
  {
    title: "Payments",
    description: "Support payments in various cryptocurrencies, enable instant cross-border payments, and maintain a detailed history of all transactions."
  },
  {
    title: "Tax and Compliance",
    description: "Automatically calculate taxes based on jurisdiction and generate reports for regulatory compliance."
  },
  {
    title: "Notifications",
    description: "Notify users about important events via email, SMS, and in-app notifications."
  },
  {
    title: "Security",
    description: "Ensure all data is encrypted and integrate with secure crypto wallets for storing and managing funds."
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800">
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <section className="text-gray-700 body-font">
                <div className="container px-5 py-24 mx-auto">
                  <div className="flex flex-wrap w-full mb-20">
                    <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                      <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Features</h1>
                      <div className="h-1 w-20 bg-blue-500 rounded"></div>
                    </div>
                    <p className="lg:w-1/2 w-full leading-relaxed text-gray-600">
                      Explore the powerful features of our Crypto Payroll Solution designed to simplify financial operations for businesses and freelancers.
                    </p>
                  </div>
                  <div className="flex flex-wrap -m-4">
                    {features.map((feature, index) => (
                      <div key={index} className="xl:w-1/3 md:w-1/2 p-4">
                        <div className="bg-gray-100 p-6 rounded-lg">
                          <h3 className="tracking-widest text-blue-500 text-xs font-medium title-font">{feature.title}</h3>
                          <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{feature.title}</h2>
                          <p className="leading-relaxed text-base text-gray-700">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;