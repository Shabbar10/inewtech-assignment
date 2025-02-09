"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EditCustomer() {
  const router = useRouter();
  const { id } = useParams(); 
  const customerId = parseInt(id, 10); // Convert id to a number

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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchCustomer() {
      if (!customerId) return;

      try {
        const res = await fetch(`/api/customers/${customerId}`);

        if (!res.ok) {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();
        setFormData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customer:", error);
        setLoading(false);
      }
    }

    fetchCustomer();
  }, [customerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const sanitizedData = {
      ...formData,
      pin_code:
        formData.pin_code && !isNaN(formData.pin_code)
          ? parseInt(formData.pin_code, 10)
          : null,
    };

    try {
      const res = await fetch(`/api/customers/${customerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update customer");
      }

      alert("Customer updated successfully");
      router.push("/customers");
    } catch (error) {
      console.error("Error updating customer:", error);
      alert(error.message || "Failed to update customer");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading customer data...</p>;

return (
    <div className="p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">Edit Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Single column fields */}
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>

              {/* Contact Info Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Contact Person</Label>
                  <Input
                    name="contact_person"
                    value={formData.contact_person}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Contact</Label>
                  <Input
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>WhatsApp</Label>
                  <Input
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Address Section */}
              <div>
                <Label>Address</Label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Pin Code</Label>
                <Input
                  type="number"
                  name="pin_code"
                  value={formData.pin_code}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              {/* Location Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>City</Label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Business Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>GST</Label>
                  <Input
                    name="gst"
                    value={formData.gst}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Payment Type</Label>
                  <Input
                    name="payment_type"
                    value={formData.payment_type}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Transport</Label>
                  <Input
                    name="transport"
                    value={formData.transport}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Discount</Label>
                  <Input
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Scheme</Label>
                  <Input
                    name="scheme"
                    value={formData.scheme}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/customers")}
                className="w-full sm:w-auto order-2 sm:order-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto order-1 sm:order-2"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}