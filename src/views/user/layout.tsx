import Image from "next/image";
import React, { ReactNode } from "react";
import logo from "../../../public/images/logo.png";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usa from "../../../public/images/usa.png"
import uk from "../../../public/images/uk.png"

interface DashboardLayoutProps {
  children: ReactNode;
}

const menuItems = [
  {
    section: "OVERVIEW",
    items: [
      { label: "Dashboard", color: "bg-blue-500", href: "/dashboard" },
      { label: "Deposits", color: "bg-green-500", href: "user/deposit" },
      { label: "Withdrawals", color: "bg-yellow-500", href: "/withdrawals" },
      { label: "Redeem Data", color: "bg-purple-500", href: "/redeem-data" },
    ],
  },
  {
    section: "ACCOUNT",
    items: [
      { label: "Profile", color: "bg-gray-700", href: "/profile" },
      { label: "Referrals", color: "bg-gray-700", href: "/referrals" },
      { label: "Settings", color: "bg-gray-700", href: "/settings" },
    ],
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main>
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-100 h-20 p-3 flex justify-between px-8">
        <div className="flex gap-32">
          <Image width={140} height={140} src={logo} alt="Logo" />
          <Input placeholder="Search" className="w-[30rem] bg-gray-100" />
        </div>
        <section>
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">
                <div className="flex items-center gap-2">
                  <Image
                    src={uk}
                    width={20}
                    height={20}
                    alt="English"
                  />
                  English
                </div>
              </SelectItem>
              <SelectItem value="fr">
                <div className="flex items-center gap-2">
                  <Image
                    src={usa}
                    width={20}
                    height={20}
                    alt="Français"
                  />
                  Français
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </section>
        <section className="flex gap-4">
          <div className="bg-gray-100 w-10 h-10 rounded-full flex justify-center items-center">
            🔔
          </div>
          <div className="bg-blue-200 w-10 h-10 rounded-full flex justify-center items-center font-bold">
            AP
          </div>
        </section>
      </nav>

      {/* Main Content */}
      <section className="flex">
        {/* Sidebar */}
        <aside className="bg-white border-r border-gray-100 w-64 p-6 h-screen">
          {menuItems.map((menu, idx) => (
            <div key={idx} className="mb-8">
              <p className="text-xs font-semibold text-gray-500 mb-4">
                {menu.section}
              </p>
              <ul className="space-y-3">
                {menu.items.map((item, i) => (
                  <Link
                    href={item.href}
                    key={i}
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                  >
                    <span
                      className={cn("w-3 h-3 rounded-full", item.color)}
                    ></span>
                    <span className="text-gray-700">{item.label}</span>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Page Content */}
        <div className="flex-1 p-8">{children}</div>
      </section>
    </main>
  );
}
