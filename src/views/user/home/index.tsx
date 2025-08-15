"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "../layout";
import StatCard from "@/components/ui/stat_card";
import DataTable from "@/components/ui/data_table";


export default function HomeDashboard() {
  const columns = [
    { key: "date", label: "Date" },
    { key: "type", label: "Type" },
    { key: "amount", label: "Amount", render: (value: string) => <span className={value.startsWith("+") ? "text-green-600 font-semibold" : value.startsWith("-") ? "text-red-600 font-semibold" : ""}>{value}</span> },
    { 
      key: "status", 
      label: "Status", 
      render: (value: string) => {
        const colors: Record<string, string> = {
          Completed: "bg-green-100 text-green-700",
          Pending: "bg-yellow-100 text-yellow-700",
          Credited: "bg-yellow-100 text-yellow-700",
          Processing: "bg-blue-100 text-blue-700",
        };
        return (
          <span className={`${colors[value] || ""} px-2 py-1 rounded-full text-xs`}>
            {value}
          </span>
        );
      }
    },
  ];

  const data = [
    { date: "2025-08-10", type: "Yield Credit", amount: "+ XAF 15,000", status: "Completed" },
    { date: "2025-08-09", type: "Deposit Approved", amount: "XAF 500,000", status: "Completed" },
    { date: "2025-08-08", type: "Data Reward", amount: "+ 2000 MB", status: "Credited" },
    { date: "2025-08-08", type: "Withdrawal", amount: "- XAF 20,000", status: "Pending" },
    { date: "2025-08-07", type: "Liquidation", amount: "XAF 500,000 → Avail", status: "Processing" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome back, Timest <span className="wave">👋</span>
          </h1>
          <p className="text-gray-500">
            Here’s an overview of your wallets and recent activity.
          </p>
        </div>

        {/* Wallet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Free Data Wallet" value="2.50 GB" buttonLabel="Redeem Data" buttonColor="bg-blue-500 hover:bg-blue-600" onClick={() => console.log("Redeem Data clicked")} />
          <StatCard title="Available Balance" value="XAF 125,400" buttonLabel="Withdraw" buttonColor="bg-green-500 hover:bg-green-600" onClick={() => console.log("Withdraw clicked")} />
          <StatCard title="Yielding Wallet 🔒" value="XAF 500,000" buttonLabel="Liquidate" buttonColor="bg-yellow-500 hover:bg-yellow-600 text-black" onClick={() => console.log("Liquidate clicked")} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button className="bg-blue-500 hover:bg-blue-600">Deposit Funds</Button>
          <Button className="bg-green-500 hover:bg-green-600">Withdraw Funds</Button>
          <Button className="bg-purple-500 hover:bg-purple-600">Redeem Data</Button>
          <Button className="bg-gray-700 hover:bg-gray-800">Invite Friends</Button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </DashboardLayout>
  );
}
