import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infokanal - Dashboard",
  description: "Infokanal Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full py-28 flex flex-col items-center">
          <div className="max-w-screen-xl w-full">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
