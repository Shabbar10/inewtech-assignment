// Customers.js
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
  Menu,
} from "lucide-react";
import CustomerTable from "@/components/customer-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Customers() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const res = await fetch(`/api/customers/`);
        if (!res.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    fetchCustomer();
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full p-2 sm:p-4 gap-2 sm:gap-4 border-b border-gray-400">
        <div className="flex items-center pl-2 sm:pl-6 py-2 sm:py-4">
          <Star className="h-5 w-5" />
          <p className="pl-2 sm:pl-6 opacity-50">Customers</p>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="sm:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Header Actions */}
        <div className={`
          flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-10 py-2 sm:py-4 w-full sm:w-auto
          ${showMobileMenu ? 'flex' : 'hidden sm:flex'}
        `}>
          <div className="flex flex-col items-start sm:items-end">
            <div className="text-lg sm:text-xl">Sept 24</div>
            <div className="text-xs">2024</div>
          </div>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full sm:w-auto pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-4 sm:gap-10">
            <CircleHelp className="h-5 w-5" />
            <Settings className="h-5 w-5" />
            <RotateCcw className="h-5 w-5" />
            <Bell className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full p-4 sm:p-8 flex flex-col">
        <div className="text-2xl sm:text-4xl mb-3 sm:mb-5">Customers</div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full sm:w-auto pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Filter className="h-5 w-5" />
            <Button
              variant="outline"
              className="flex-1 sm:flex-none"
              onClick={() => router.push("/customers/new")}
            >
              + Add
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none">
              Download to Excel
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 w-full overflow-x-auto">
        <CustomerTable customers={filteredCustomers} />
      </div>
    </>
  );
}

export default Customers;