/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import DashboardLayout from "../layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

// ✅ Zod schema for form validation
const depositSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => {
      const num = Number(val);
      return !isNaN(num) && num >= 5000 && num <= 500000000;
    }, "Amount must be between XAF 5,000 and XAF 500,000,000"),
});

export default function DepositView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: "",
    },
  });
  const router = useRouter();

  const onSubmit = (data: { amount: any }) => {
    console.log("Form submitted:", data);
    router.push(`/user/deposit/confirm-deposit?amount=${data.amount}`);
    alert(`Depositing ${data.amount} XAF`);
  };

  const amountValue = watch("amount") || 0;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Deposit Funds</h1>
        <p className="text-gray-500">
          Add funds using our systems gateway. The deposited amount will be
          credited to the deposit wallet. You will make investments from this
          wallet.
        </p>

        <div>
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold mb-4">Bank Transfer</h1>
            <Button
              onClick={() => router.push("/user/deposit/history")}
              className="rounded-none"
            >
              Deposit History
            </Button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white w-[30rem] rounded-xl shadow-sm p-6 space-y-4 border"
          >
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <Input
                type="text"
                className="p-4 rounded-xs"
                placeholder="XAF 0.00"
                {...register("amount")}
              />
              {errors.amount && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* Limits */}
            <div className="text-sm text-gray-600">
              Limit: XAF 5,000.00 - XAF 500,000,000.00
            </div>

            {/* Processing Charge */}
            <div className="flex justify-between text-sm">
              <span>Processing Charge</span>
              <span>0.00 XAF</span>
            </div>

            {/* Total */}
            <div className="flex justify-between text-sm font-semibold">
              <span>Total</span>
              <span>{amountValue ? `${amountValue} XAF` : "0.00 XAF"}</span>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full rounded-sm bg-red-500 hover:bg-red-600"
            >
              Confirm Deposit
            </Button>

            {/* Note */}
            <p className="text-xs text-gray-500">
              Ensuring your funds grow safely through our secure deposit process
              with world-class payment options.
            </p>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
