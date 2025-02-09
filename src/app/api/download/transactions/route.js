export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import pool from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const { searchParams } = new URL(req.url);
    const customer_id = searchParams.get("customer_id");
    
    const connection = await pool.getConnection();

    const [rows] = await connection.execute(
      "SELECT * FROM transactions WHERE customer_id = ?",
      [customer_id]
    );

    connection.release();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`Transactions - ${customer_id}`);
    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Customer ID", key: "customer_id", width: 30 },
      { header: "Item", key: "item", width: 30 },
      { header: "Quantity", key: "quantity", width: 30 },
      { header: "Transaction Date", key: "transaction_date", width: 30 },
    ];
    worksheet.addRows(rows);

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Disposition": `attachment; filename=transactions-${customer_id}.xlsx`,
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json(
      { error: "Failed to generate Excel file" },
      { status: 500 }
    );
  }
}
