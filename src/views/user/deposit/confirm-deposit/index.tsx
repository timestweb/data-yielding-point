"use client";

import React, { Suspense } from "react";
import DashboardLayout from "../../layout";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ConfirmDepositContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "0";

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Deposit Confirmation</h1>
        <p className="text-gray-500">
          Please transfer the exact amount below and upload proof of payment.
          Once verified, your wallet will be credited.
        </p>

        <div className="border w-[45rem] rounded-lg p-6 shadow-sm bg-white">
          <h2 className="text-lg font-semibold mb-4">Bank Transfer Payment</h2>
          <div className="bg-gray-50 border p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-700">
              You are requesting <span className="font-bold">{amount} XAF</span> to deposit.
              Please pay exactly <span className="font-bold">{amount} XAF</span> for successful processing.
            </p>
          </div>

          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Account Name:</span> DATA YIELDING POINTS</p>
            <p><span className="font-medium">Account Number:</span> 1234567890</p>
            <p><span className="font-medium">Bank:</span> ABC BANK</p>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">
              Upload Proof of Payment <span className="text-red-500">*</span>
            </label>
            <Input type="file" accept=".jpg,.jpeg,.png,.pdf" />
            <p className="text-xs text-gray-400 mt-1">
              Supported formats: JPG, JPEG, PNG, PDF
            </p>
          </div>

          <div className="mt-6">
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
              Upload Proof & Confirm
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function ConfirmDeposit() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmDepositContent />
    </Suspense>
  );
}
