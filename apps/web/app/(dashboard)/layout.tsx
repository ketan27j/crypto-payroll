import { getServerSession } from "next-auth";
import { SidebarItem } from "../../components/SidebarItem";
import { authOptions } from "../lib/auth";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log(`Session: ${JSON.stringify(session)}`);
  if(session?.user){
    return (
      <div className="flex">
          <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
              <div>
                  <SidebarItem href={"/dashboard"} icon={<HomeIcon />} title="Home" />
                  <SidebarItem href={"/employee"} icon={<TransferIcon />} title="Employee Information" />
                  <SidebarItem href={"/transactions"} icon={<TransactionsIcon />} title="Transactions" />
              </div>
          </div>
              {children}
      </div>
    );
  }else {
    return (
      <div className="flex min-h-screen w-full items-center justify-center gap-4 p-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Access Denied</h1>
              <p className="text-sm text-gray-500 md:text-base dark:text-gray-400">
                You do not have permission to access this page.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="/"
            >
              Return to the homepage
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

// Icons Fetched from https://heroicons.com/
function HomeIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
}
function TransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
}

function TransactionsIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
  
}