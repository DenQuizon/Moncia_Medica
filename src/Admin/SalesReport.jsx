import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseSecureAxios from "../CUstomHooks/UseSecureAxios";
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Helmet } from "react-helmet";

const SalesReport = () => {
  const axiosSecure = UseSecureAxios();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch sales report data
  const { data: sales = [], isLoading } = useQuery({
    queryKey: ["salesReport", startDate, endDate],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/sales-report", {
        params: { startDate, endDate },
      });
      return res.data;
    },
  });

  // Columns for DataTable
  const columns = [
    {
      name: "Medicine Name",
      selector: (row) => row.medicines.map((med) => med.itemName).join(", "),
      sortable: true,
    },
    {
      name: "Seller Email",
      selector: (row) => row.medicines[0]?.sellerEmail,
      sortable: true,
    },
    { name: "Buyer Email", selector: (row) => row.buyerEmail, sortable: true },
    {
      name: "Total Price",
      selector: (row) => `$${row.totalPrice}`,
      sortable: true,
    },
    {
      name: "Transaction ID",
      selector: (row) => row.transactionId,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
    { name: "Status", selector: (row) => row.status, sortable: true },
  ];

  // Export as CSV
  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(sales);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
    XLSX.writeFile(wb, "SalesReport.xlsx");
  };

  // Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Sales Report", 20, 10);
    const tableData = sales.map((row) => [
      row.medicines.map((med) => med.itemName).join(", "),
      row.medicines[0]?.sellerEmail,
      row.buyerEmail,
      `$${row.totalPrice}`,
      row.transactionId,
      new Date(row.date).toLocaleDateString(),
      row.status,
    ]);
    doc.autoTable({
      head: [
        [
          "Medicine Name",
          "Seller Email",
          "Buyer Email",
          "Total Price",
          "Transaction ID",
          "Date",
          "Status",
        ],
      ],
      body: tableData,
    });
    doc.save("SalesReport.pdf");
  };

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen p-5 bg-gray-100">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Medistore||Salesreport</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-gray-700 mb-5">Sales Report</h1>

      {/* Date Filter */}
      <div className="mb-4 flex gap-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={sales}
        pagination
        highlightOnHover
        striped
        responsive
      />

      {/* Export Buttons */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Export to Excel
        </button>
        <button
          onClick={exportPDF}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
};

export default SalesReport;
