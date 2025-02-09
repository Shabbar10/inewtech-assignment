"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateTransaction() {
  const searchParams = useSearchParams();
  const customer_id = searchParams.get("customer_id")

  const router = useRouter();
  const [txnData, setTxnData] = useState({
    customer_id: customer_id,
    item: "",
    quantity: "",
    transaction_date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setTxnData({ ...txnData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedData = {
      ...txnData,
      quantity:
        txnData.quantity.trim() === ""
          ? null
          : parseInt(txnData.quantity, 10) || null,
    };

    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sanitizedData),
    });

    if (res.ok) {
      router.push(`/customers/${customer_id}`);
    } else {
      alert("Error creating transaction");
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto mt-8 p-6">
      <CardHeader>
        <CardTitle>Add New Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="flex flex-col gap-3">
            <Label>Customer ID</Label>
            <Label className="font-extrabold text-2xl">{customer_id}</Label>
          </div>
          <div className="mt-5">
            <Label>Item</Label>
            <Input
              name="item"
              value={txnData.item}
              onChange={handleChange}
              required
            />
          </div>
          <div className="">
            <Label>Quantity</Label>
            <Input
              type="number"
              name="quantity"
              value={txnData.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/customers")}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
