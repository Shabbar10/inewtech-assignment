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
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const resCustomer = await fetch(`/api/customers/${id}`);
        const resTransactions = await fetch(
          `/api/transactions?customer_id=${id}`
        );

        // if (!resCustomer.ok || !resTransactions.ok) {
        //   throw new Error("Failed to fetch data");
        // }

        const customerData = await resCustomer.json();
        const transactionsData = await resTransactions.json();

        const customerObj = Array.isArray(customerData)
          ? customerData[0]
          : customerData;

        console.log("Transactions data:", transactionsData); // Debug log

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

  const filteredTransactions = transactions.filter((txn) =>
    txn.item.toLowerCase().includes(search.toLocaleLowerCase())
  );

  if (isMobile) {
    return (
      <div className="p-4">
        <h1 className="text-2xl mb-4">Customer Information</h1>
        <CustomerDetails customer={customer} />

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Transaction History</h2>

          <div className="flex flex-col gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border rounded-md"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                variant="outline"
                onClick={() =>
                  router.push(`/customers/${id}/newTxn?customer_id=${id}`)
                }
              >
                Add
              </Button>
              <Button
                className="flex-1"
                variant="outline"
                onClick={() => {
                  window.location.href = `/api/download/transactions?customer_id=${customer.id}`;
                }}
              >
                Download
              </Button>
            </div>
          </div>

          {filteredTransactions.length > 0 ? (
            <div className="space-y-4">
              {filteredTransactions.map((tx) => (
                <div key={tx.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold">{tx.item}</div>
                      <div className="text-sm text-gray-500">
                        {formatDate(tx.transaction_date)}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(tx.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>Quantity: {tx.quantity}</div>
                </div>
              ))}
            </div>
          ) : (
            <p>No transactions found.</p>
          )}
        </div>

        <div className="mt-8">
          <Button asChild className="w-full">
            <Link href="/customers">Back</Link>
          </Button>
        </div>
      </div>
    );
  }

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
              onChange={(e) => setSearch(e.target.value)}
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
          <Button
            variant="outline"
            onClick={() => {
              window.location.href = `/api/download/transactions?customer_id=${customer.id}`;
            }}
          >
            Download to Excel
          </Button>
        </div>
      </div>
      {transactions && transactions.length > 0 ? (
        <div className="flex">
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
              {filteredTransactions.map((tx, index) => (
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
