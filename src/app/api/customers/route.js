import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.query(`SELECT * FROM customers ORDER BY last_purchase_date DESC`);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const {
      name,
      contact_person,
      address,
      pin_code,
      contact,
      email,
      whatsapp,
      country,
      state,
      city,
      gst,
      last_purchase_date,
      transport,
      payment_type,
      discount,
      scheme,
    } = await req.json();

    const query = `
      INSERT INTO customers 
      (name, contact_person, address, pin_code, contact, email, whatsapp, country, state, city, gst, transport, payment_type, discount, scheme) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      name,
      contact_person,
      address,
      pin_code,
      contact,
      email,
      whatsapp,
      country,
      state,
      city,
      gst,
      transport,
      payment_type,
      discount,
      scheme,
    ];

    await pool.query(query, values);

    return NextResponse.json(
      { message: "Customer added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("DB Insert Error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { name, contact_person } = await req.json();

    const [result] = await pool.query(
      "DELETE FROM customers WHERE name = ? AND contact_person = ?",
      [name, contact_person]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "No matching customers found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Customers deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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