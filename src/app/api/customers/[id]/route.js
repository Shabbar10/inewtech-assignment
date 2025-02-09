import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM customers WHERE id = ?", [id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const data = await req.json();
    
    const query = `
      UPDATE customers SET 
      address = ?, pin_code = ?, contact = ?, email = ?, whatsapp = ?, 
      country = ?, state = ?, city = ?, gst = ?, transport = ?, 
      payment_type = ?, discount = ?, scheme = ?
      WHERE name = ? AND contact_person = ?`;

    const values = [
      data.address, data.pin_code, data.contact, data.email, data.whatsapp,
      data.country, data.state, data.city, data.gst, data.transport,
      data.payment_type, data.discount, data.scheme,
      data.name, data.contact_person
    ];

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "No matching customers found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Customers updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}