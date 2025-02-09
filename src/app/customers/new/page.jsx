"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateCustomer() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    contact_person: "",
    address: "",
    pin_code: "",
    contact: "",
    email: "",
    whatsapp: "",
    country: "",
    state: "",
    city: "",
    gst: "",
    transport: "",
    payment_type: "",
    discount: "",
    scheme: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure pincode is null if empty
    const sanitizedData = { 
      ...formData, 
      pin_code: formData.pin_code.trim() === "" ? null : parseInt(formData.pin_code, 10) || null
    };

    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sanitizedData),
    });

    if (res.ok) {
      router.push("/customers"); // Redirect to customers list
    } else {
      alert("Error creating customer");
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto mt-8 p-6">
      <CardHeader>
        <CardTitle>Add New Customer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <Label>Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Contact Person</Label>
              <Input name="contact_person" value={formData.contact_person} onChange={handleChange} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Contact</Label>
              <Input name="contact" value={formData.contact} onChange={handleChange} />
            </div>
            <div>
              <Label>WhatsApp</Label>
              <Input name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
            </div>
          </div>
          <div>
            <Label>Address</Label>
            <Input name="address" value={formData.address} onChange={handleChange} />
          </div>
          {/* ✅ Pincode field added */}
          <div>
            <Label>Pin Code</Label>
            <Input type="number" name="pin_code" value={formData.pin_code} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>City</Label>
              <Input name="city" value={formData.city} onChange={handleChange} />
            </div>
            <div>
              <Label>State</Label>
              <Input name="state" value={formData.state} onChange={handleChange} />
            </div>
            <div>
              <Label>Country</Label>
              <Input name="country" value={formData.country} onChange={handleChange} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>GST</Label>
              <Input name="gst" value={formData.gst} onChange={handleChange} />
            </div>
            <div>
              <Label>Payment Type</Label>
              <Input name="payment_type" value={formData.payment_type} onChange={handleChange} />
            </div>
            <div>
              <Label>Transport</Label>
              <Input name="transport" value={formData.transport} onChange={handleChange} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Discount</Label>
              <Input name="discount" value={formData.discount} onChange={handleChange} />
            </div>
            <div>
              <Label>Scheme</Label>
              <Input name="scheme" value={formData.scheme} onChange={handleChange} />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={() => router.push("/customers")}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
