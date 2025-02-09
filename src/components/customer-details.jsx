import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@radix-ui/react-separator";
import { useState, useEffect } from "react";

function CustomerDetails({ customer }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="space-y-4">
        {/* General Information */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-3 font-semibold text-center">
            General Information
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="font-medium text-sm">ID</div>
                <div>{customer.id}</div>
              </div>
              <div>
                <div className="font-medium text-sm">Name</div>
                <div>{customer.name}</div>
              </div>
            </div>
            <div>
              <div className="font-medium text-sm">Contact</div>
              <div>{customer.contact}</div>
            </div>
            <div>
              <div className="font-medium text-sm">Email</div>
              <div>{customer.email}</div>
            </div>
            <div>
              <div className="font-medium text-sm">Address</div>
              <div>{customer.address}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="font-medium text-sm">City</div>
                <div>{customer.city}</div>
              </div>
              <div>
                <div className="font-medium text-sm">State</div>
                <div>{customer.state}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="font-medium text-sm">Pin Code</div>
                <div>{customer.pin_code}</div>
              </div>
              <div>
                <div className="font-medium text-sm">GST No.</div>
                <div>{customer.gst}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Type */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-3 font-semibold text-center">
            Customer Type
          </div>
          <div className="p-4 space-y-4">
            <div>
              <div className="font-medium text-sm">Transport/Courier</div>
              <div>{customer.transport}</div>
            </div>
            <div>
              <div className="font-medium text-sm">Payment Type</div>
              <div>{customer.payment_type}</div>
            </div>
            <div>
              <div className="font-medium text-sm">Discount</div>
              <div>{customer.discount}</div>
            </div>
            <div>
              <div className="font-medium text-sm">Scheme</div>
              <div>{customer.scheme}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Table className="border border-gray-300 shadow-md rounded-lg">
      <TableBody>
        <TableRow className="bg-gray-100">
          <TableCell
            colSpan={8}
            className="text-lg font-semibold py-3 text-center"
          >
            General Information
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-gray-300">
          <TableHead className="font-medium px-4 py-2">ID</TableHead>
          <TableCell className="px-4 py-2">{customer.id}</TableCell>
          <TableHead className="font-medium px-4 py-2">Name</TableHead>
          <TableCell className="px-4 py-2">{customer.name}</TableCell>
          <TableHead className="font-medium px-4 py-2">Contact</TableHead>
          <TableCell className="px-4 py-2">{customer.contact}</TableCell>
          <TableHead className="font-medium px-4 py-2">Email</TableHead>
          <TableCell className="px-4 py-2">{customer.email}</TableCell>
        </TableRow>

        <TableRow className="border-b border-gray-300">
          <TableHead className="font-medium px-4 py-2">
            Contact Person
          </TableHead>
          <TableCell className="px-4 py-2">{customer.contact_person}</TableCell>
          <TableHead className="font-medium px-4 py-2">Whatsapp</TableHead>
          <TableCell className="px-4 py-2">{customer.whatsapp}</TableCell>
          <TableHead className="font-medium px-4 py-2">Address</TableHead>
          <TableCell className="px-4 py-2">{customer.address}</TableCell>
        </TableRow>

        <TableRow className="border-b border-gray-300">
          <TableHead className="font-medium px-4 py-2">City</TableHead>
          <TableCell className="px-4 py-2">{customer.city}</TableCell>
          <TableHead className="font-medium px-4 py-2">State</TableHead>
          <TableCell className="px-4 py-2">{customer.state}</TableCell>
          <TableHead className="font-medium px-4 py-2">Pin Code</TableHead>
          <TableCell className="px-4 py-2">{customer.pin_code}</TableCell>
          <TableHead className="font-medium px-4 py-2">GST No.</TableHead>
          <TableCell className="px-4 py-2">{customer.gst}</TableCell>
        </TableRow>

        <TableRow className="bg-gray-100">
          <TableCell
            colSpan={8}
            className="text-lg font-semibold py-3 text-center"
          >
            Customer Type
          </TableCell>
        </TableRow>

        <TableRow>
          <TableHead className="font-medium px-4 py-2">
            Transport/Courier Name
          </TableHead>
          <TableCell className="px-4 py-2">{customer.transport}</TableCell>
          <TableHead className="font-medium px-4 py-2">Payment Type</TableHead>
          <TableCell className="px-4 py-2">{customer.payment_type}</TableCell>
          <TableHead className="font-medium px-4 py-2">
            Discount Structure
          </TableHead>
          <TableCell className="px-4 py-2">{customer.discount}</TableCell>
          <TableHead className="font-medium px-4 py-2">Scheme</TableHead>
          <TableCell className="px-4 py-2">{customer.scheme}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default CustomerDetails;
