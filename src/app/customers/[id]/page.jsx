"use client";

import CustomerDetails from "@/components/customer-details";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Filter, Search } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

function CustomerView({ params }) {
  const { id } = params;
  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const resCustomer = await fetch(`/api/customers/${id}`);
        const resTransactions = await fetch(
          `/api/transactions?customer_id=${id}`
        );

        if (!resCustomer.ok || !resTransactions.ok) {
          throw new Error("Failed to fetch data");
        }

        const customerData = await resCustomer.json();
        const transactionsData = await resTransactions.json();

        // If customerData is an array, take the first item
        const customerObj = Array.isArray(customerData)
          ? customerData[0]
          : customerData;

        console.log("Transactions data:", transactionsData); // Debug log
        console.log("Customer data:", customerObj); // Debug log

        setCustomer(customerObj);
        setTransactions(
          Array.isArray(transactionsData) ? transactionsData : []
        );
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchCustomer();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!customer) return <p>No customer found</p>;

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/transactions`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete customers");

      setTransactions((prev) => prev.filter((c) => c.id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting customers:", error);
      alert("Error deleting customers");
    }
  };

  return (
    <>
      <div className="text-5xl m-8">Customer Information</div>
      <div>
        <CustomerDetails customer={customer} />
      </div>
      <div className="flex flex-col w-2/3">
        <h2 className="text-3xl font-bold mt-20 text-left">
          Transaction History
        </h2>
        <div className="flex flex-row items-center gap-6 my-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Filter />
          <Button
            variant="outline"
            onClick={() =>
              router.push(`/customers/${id}/newTxn?customer_id=${id}`)
            }
          >
            + Add
          </Button>
          <Button variant="outline" onClick={() => alert("WIP")}>
            Download to Excel
          </Button>
        </div>
      </div>
      {transactions && transactions.length > 0 ? (
        <div className="flex w-2/3">
          <Table className="border rounded-lg shadow-md mt-2">
            <TableHeader>
              <TableRow className="bg-gray-300">
                <TableHead>Date</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx, index) => (
                <TableRow
                  key={tx.id || index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <TableCell>{formatDate(tx.transaction_date)}</TableCell>
                  <TableCell>{tx.item}</TableCell>
                  <TableCell>{tx.quantity}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete(tx.id)}>
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>No transactions found.</p>
      )}
      <div className="flex mt-20 w-2/3 justify-end">
        <Button asChild>
          <Link href="/customers">Back</Link>
        </Button>
      </div>
    </>
  );
}

export default CustomerView;
