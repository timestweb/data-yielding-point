/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  caption?: string;
  // New prop to render the expanded details view
  renderDetails?: (row: any) => React.ReactNode;
}

export default function DataTable({
  columns,
  data,
  caption,
  renderDetails,
}: DataTableProps) {
  // State to keep track of the index of the expanded row
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);

  const handleRowClick = (rowIndex: number) => {
    // If the clicked row is already open, close it. Otherwise, open it.
    setExpandedRowIndex(expandedRowIndex === rowIndex ? null : rowIndex);
  };

  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.key}>{col.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            // Use React.Fragment to group the main row and the optional details row
            <React.Fragment key={rowIndex}>
              <TableRow
                // Add onClick handler only if renderDetails is provided
                onClick={renderDetails ? () => handleRowClick(rowIndex) : undefined}
                // Add styling to indicate the row is clickable
                className={renderDetails ? "cursor-pointer hover:bg-muted/50" : ""}
              >
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
              {/* Conditionally render the details row */}
              {renderDetails && expandedRowIndex === rowIndex && (
                <TableRow>
                  {/* This cell spans all columns */}
                  <TableCell colSpan={columns.length} className="p-0">
                    {renderDetails(row)}
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}