// CustomerTable.js
"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

function CustomerTable({ customers }) {
  const router = useRouter();

  const handleDelete = async (name, contactPerson, router) => {
    try {
      const res = await fetch(`/api/customers`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact_person: contactPerson }),
      });
      if (!res.ok) throw new Error("Failed to delete customers");
      setCustomers((prev) =>
        prev.filter(
          (c) => c.name !== name || c.contact_person !== contactPerson
        )
      );
    } catch (error) {
      console.error("Error deleting customers:", error);
      alert("Error deleting customers");
    }
  };

  // Mobile card view for small screens
  const MobileCard = ({ customer, index }) => (
    <div
      className="bg-white p-4 rounded-lg shadow mb-4 border sm:hidden"
      onClick={() => router.push(`/customers/${customer.id}`)}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-bold">{customer.name}</div>
          <div className="text-sm text-gray-600">ID: {customer.id}</div>
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <span className="text-gray-500">Contact Person:</span>{" "}
          {customer.contact_person}
        </div>
        <div>
          <span className="text-gray-500">Contact:</span> {customer.contact}
        </div>
        <div>
          <span className="text-gray-500">Email:</span> {customer.email}
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button
          className="flex-1 bg-yellow-500"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/customers/${customer.id}/edit`);
          }}
        >
          Edit
        </Button>
        <Button
          className="flex-1 bg-red-600"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(customer.name, customer.contact_person, router);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Cards */}
      <div className="sm:hidden">
        {customers.map((customer, index) => (
          <MobileCard key={customer.id} customer={customer} index={index} />
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>CONTACT PERSON</TableHead>
              <TableHead>CONTACT</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow
                key={customer.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-200" : "bg-white"
                } cursor-pointer`}
                onClick={() => router.push(`/customers/${customer.id}`)}
              >
                <TableCell className="font-medium">{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.contact_person}</TableCell>
                <TableCell>{customer.contact}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <Button
                    className="bg-yellow-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/customers/${customer.id}/edit`);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    className="bg-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(
                        customer.name,
                        customer.contact_person,
                        router
                      );
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default CustomerTable;
