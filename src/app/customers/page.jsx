"use client";

import React, { useEffect, useState } from "react";
import {
  Star,
  CircleHelp,
  Settings,
  RotateCcw,
  Bell,
  Search,
  Filter,
} from "lucide-react";
import CustomerTable from "@/components/customer-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Customers() {
const router = useRouter();

  return (
    <>
      <div className="flex justify-between items-center w-full p-4 gap-4 border-b border-gray-400">
        <div className="flex items-center pl-6 py-4">
          <Star />
          <p className="pl-6 opacity-50">Customers</p>
        </div>

        <div className="flex items-center justify-end gap-10 py-4">
          <div className="flex flex-col items-end">
            <div className="text-xl">Sept 24</div>
            <div className="text-xs">2024</div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <CircleHelp />
          <Settings />
          <RotateCcw />
          <Bell />
        </div>
      </div>
      <div className="w-full p-8 flex flex-col">
        <div className="text-4xl mb-5">Customers</div>
        <div className="flex flex-row items-center gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Filter />
          <Button variant="outline" onClick={() => router.push("/customers/new")}>+ Add</Button>
          <Button variant="outline">Download to Excel</Button>
        </div>
      </div>
      <CustomerTable />
    </>
  );
}

export default Customers;
