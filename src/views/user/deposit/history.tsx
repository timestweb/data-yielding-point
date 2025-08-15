/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import DashboardLayout from "../layout";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import DataTable from "@/components/ui/data_table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// A simple badge component for status (you can use one from your UI library)
const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses =
    "px-2 py-0.5 text-xs font-medium rounded-full  w-24 flex items-center justify-center";
  if (status === "success") {
    return (
      <span className={`${baseClasses} bg-green-100 text-green-800`}>
        Approved
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className={`${baseClasses} bg-red-100 text-red-800`}>Failed</span>
    );
  }
  return (
    <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
      Pending
    </span>
  );
};

// Component to render the details of a transaction
const DepositDetails = ({ deposit }: { deposit: any }) => {
  return (
    <div className="bg-gray-50/50 dark:bg-gray-800/20 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div className="flex flex-col">
          <span className="text-gray-500">Charge</span>
          <span className="font-medium">
            {(deposit.charge ?? 0).toLocaleString()} {deposit.currency}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Amount With Charge</span>
          <span className="font-medium">
            {(deposit.amount + (deposit.charge ?? 0)).toLocaleString()}{" "}
            {deposit.currency}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Status</span>
          <StatusBadge status={deposit.status} />
        </div>
      </div>
    </div>
  );
};

export default function DepositHistory() {
  const router = useRouter();
  // Added more details to the data for the expanded view
  const deposits = [
    {
      status: "failed",
      method: "Bank Transfer",
      date: "2025-08-15T14:02:00Z",
      txnId: "IVM1GOUB5NNQ",
      amount: 10000,
      currency: "XAF",
      charge: 100,
    },
    {
      status: "success",
      method: "Bank Transfer",
      date: "2025-08-13T13:59:00Z",
      txnId: "TEC4IU3M66Y7",
      amount: 50000,
      currency: "XAF",
      charge: 250,
    },
    {
      status: "pending",
      method: "Bank Transfer",
      date: "2025-08-10T09:15:00Z",
      txnId: "PEND123456",
      amount: 25000,
      currency: "XAF",
      charge: 150,
    },
    {
      status: "failed",
      method: "Bank Transfer",
      date: "2025-07-07T15:22:00Z",
      txnId: "ZT7ZU777WGOH",
      amount: 50000,
      currency: "XAF",
      charge: 250,
    },
    {
      status: "success",
      method: "Bank Transfer",
      date: "2025-05-30T22:39:00Z",
      txnId: "LWEA9X6NZJAY",
      amount: 5000,
      currency: "XAF",
      charge: 50,
    },
  ];

  const columns = [
    {
      key: "status",
      label: "",
      render: (value: string) => {
        if (value === "success") {
          return <CheckCircle className="text-green-500 w-5 h-5" />;
        }
        if (value === "failed") {
          return <XCircle className="text-red-500 w-5 h-5" />;
        }
        if (value === "pending") {
          return <Clock className="text-yellow-500 w-5 h-5" />;
        }
        return null;
      },
    },
    {
      key: "method",
      label: "Method",
      render: (value: string) => <div className="font-medium">{value}</div>,
    },
    {
      key: "date",
      label: "Date",
      render: (value: string) => {
        const dateObj = new Date(value);
        return (
          <span>
            {dateObj.toLocaleDateString("en-GB", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
            @
            {dateObj.toLocaleTimeString("en-GB", {
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
        );
      },
    },
    {
      key: "txnId",
      label: "Transaction ID",
      render: (value: string) => (
        <span className="text-blue-600">#{value}</span>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      render: (value: number, row: any) => (
        <span className="font-semibold">
          {value.toLocaleString()} {row.currency}
        </span>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Deposit History</h1>
        <Button
          onClick={() => router.push("/user/deposit")}
          className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Deposit Now →
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={deposits}
        // Pass the new prop here
        renderDetails={(row) => <DepositDetails deposit={row} />}
      />
    </DashboardLayout>
  );
}
