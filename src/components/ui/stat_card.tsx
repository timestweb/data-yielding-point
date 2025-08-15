import React from "react";
import { Button } from "@/components/ui/button";

interface StatCardProps {
  title: string;
  value: string;
  buttonLabel: string;
  buttonColor: string;
  onClick?: () => void;
}

export default function StatCard({
  title,
  value,
  buttonLabel,
  buttonColor,
  onClick,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
      <Button className={`mt-4 ${buttonColor}`} onClick={onClick}>
        {buttonLabel}
      </Button>
    </div>
  );
}
