import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import pool from "@/lib/db";

export async function GET(req) {
  try {
    const connection = await pool.getConnection();

    const [rows] = await connection.execute("SELECT * FROM customers");

    connection.release();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Customers");
    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 30 },
      { header: "Contact Person", key: "contact_person", width: 30 },
      { header: "Address", key: "address", width: 30 },
      { header: "Contact", key: "contact", width: 20 },
      { header: "Whatsapp", key: "whatsapp", width: 25 },
      { header: "Email", key: "email", width: 30 },
    ];
    worksheet.addRows(rows);

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Disposition": "attachment; filename=customers.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json({ error: "Failed to generate Excel file" }, { status: 500 });
  }
}
