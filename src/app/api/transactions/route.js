import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const customer_id = searchParams.get("customer_id");

  if (!customer_id) {
    return NextResponse.json(
      { error: "Missing ID parameter" },
      { status: 400 }
    );
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM transactions WHERE customer_id = ?",
      [customer_id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { customer_id, item, quantity, transaction_date } = await req.json();

    const query = `
      INSERT INTO transactions 
      (customer_id, item, quantity, transaction_date)
      VALUES (?, ?, ?, ?)`;

    const values = [customer_id, item, quantity, transaction_date];

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
    const { id } = await req.json();

    const [result] = await pool.query("DELETE FROM transactions WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "No matching transaction found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Transaction deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}