import { useEffect, useRef } from "react";
import { DataTable } from "simple-datatables";
import "simple-datatables/dist/style.css";
import { useTheme } from "../hooks/useTheme"; 

export default function DataTableWrapper({ data, columns, title }) {
  const tableRef = useRef();
  const wrapperRef = useRef();
  const { theme } = useTheme();

  useEffect(() => {
    if (!tableRef.current) return;

    // Initialize DataTable
    new DataTable(tableRef.current, {
      searchable: true,
      perPage: 5,
      perPageSelect: [5, 10, 15],
      responsive: true,
      sortable: true,
    });

    const styleTable = () => {
      const table = tableRef.current;

      // Table header
      table.querySelectorAll("thead th").forEach((th) => {
        th.style.textAlign = "center";
        th.style.fontWeight = "600";
        th.style.padding = "0.5rem 1rem";
        th.style.borderBottom = "2px solid rgba(0,0,0,0.1)";
        th.style.backgroundColor = theme === "dark" ? "#4C1D95" : "#7C3AED";
        th.style.color = "#FFFFFF";
      });

      // Table body
      table.querySelectorAll("tbody td").forEach((td) => {
        td.style.textAlign = "center";
        td.style.verticalAlign = "middle";
        td.style.padding = "0.5rem 1rem";
        td.style.backgroundColor = theme === "dark" ? "#1F2937" : "#FFFFFF";
        td.style.color = theme === "dark" ? "#E5E7EB" : "#111827";
        td.style.border = "1px solid rgba(0,0,0,0.1)";
      });

      // Row hover
      table.querySelectorAll("tbody tr").forEach((tr) => {
        tr.addEventListener("mouseenter", () => {
          tr.style.backgroundColor = theme === "dark" ? "#374151" : "#EDE9FE";
        });
        tr.addEventListener("mouseleave", () => {
          tr.style.backgroundColor = theme === "dark" ? "#1F2937" : "#FFFFFF";
        });
      });

      // Top controls
      const topControls = wrapperRef.current.querySelector(".datatable-top");
      if (topControls) {
        topControls.style.color = theme === "dark" ? "#FFFFFF" : "#111827";

        const searchInput = topControls.querySelector(".datatable-input");
        if (searchInput) {
          searchInput.style.color = theme === "dark" ? "#FFFFFF" : "#111827";
          searchInput.style.backgroundColor = theme === "dark" ? "#374151" : "#F3F4F6";
          searchInput.style.border = theme === "dark" ? "1px solid #555" : "1px solid #D1D5DB";
          searchInput.style.padding = "0.25rem 0.5rem";
          searchInput.style.borderRadius = "0.375rem";
          searchInput.style.caretColor = theme === "dark" ? "#FFFFFF" : "#111827";
          searchInput.placeholder && (searchInput.placeholder = "Search...");
          searchInput.style.setProperty("color-scheme", theme === "dark" ? "dark" : "light");
        }

        const select = topControls.querySelector(".datatable-selector");
        if (select) {
          select.style.color = theme === "dark" ? "#FFFFFF" : "#111827";
        }
      }

      // Bottom controls
      const bottomControls = wrapperRef.current.querySelector(".datatable-bottom");
      if (bottomControls) {
        bottomControls.style.color = theme === "dark" ? "#FFFFFF" : "#111827";
      }

      // Responsive adjustments
      if (window.innerWidth < 640) {
        if (topControls) topControls.style.fontSize = "0.75rem";
        const select = wrapperRef.current.querySelector(".datatable-selector");
        if (select) select.style.fontSize = "0.65rem";
        if (bottomControls) bottomControls.style.fontSize = "0.75rem";
      }
    };

    styleTable();
    const handleResize = () => styleTable();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [theme, data]);

  const safeColumns = columns.map(col => String(col));

  return (
    <div className="p-4 w-full">
      <h2 className={`text-2xl font-bold mb-4 ${theme === "light" ? "text-purple-900" : "text-gray-100"}`}>
        {title}
      </h2>
      <div
        ref={wrapperRef}
        className={`w-full overflow-x-auto rounded-lg shadow-lg border ${
          theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"
        }`}
      >
        <table ref={tableRef} className="w-full border-collapse table-auto text-center">
          <thead>
            <tr>
              {safeColumns.map(col => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {safeColumns.map((col) => (
                  <td key={col}>{row[col.toLowerCase()] ?? row[col] ?? "-"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
