import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@radix-ui/react-separator";

function CustomerDetails({ customer }) {
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
