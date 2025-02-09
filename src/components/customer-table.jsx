"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch("/api/customers");
        const data = await res.json();
        console.log(data);
        setCustomers(data);
      } catch (error) {
        console.log("Error fetching customers:", error);
      }
    }

    fetchCustomers();
  }, []);

  // const filteredCustomers = customers.filter((customer) =>
  //   customer.name.toLowerCase().includes(search.toLowerCase())
  // );

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
      ); // Update state
    } catch (error) {
      console.error("Error deleting customers:", error);
      alert("Error deleting customers");
    }
  };

  return (
    <Table>
      {/* <TableCaption>A list of your recent customers.</TableCaption> */}
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
            <TableCell>{customer.id}</TableCell>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.contact_person}</TableCell>
            <TableCell>{customer.contact}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>
              <Button
                className="bg-yellow-500"
                onClick={(e) => e.stopPropagation()}
              >
                <Link href={`/customers/${customer.id}/edit`}>Edit</Link>
              </Button>
            </TableCell>
            <TableCell>
              <Button
                className="bg-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(customer.name, customer.contact_person, router);
                  console.log("Clicked delete");
                }}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CustomerTable;
