"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PendingApprovals } from "./columns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedRowData, setSelectedRowData] =
    useState<PendingApprovals | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDetailsClick = (row: TData) => {
    setSelectedRowData(row as PendingApprovals);
  };

  function formatKey(key: string): string {
    return key
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .replace(/([0-9]+)/g, " $1") // Add space before numbers
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                {isMounted && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => handleDetailsClick(row.original)}>
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[900px]">
                      <DialogHeader>
                        <DialogTitle>Requester Details</DialogTitle>
                        <DialogDescription>
                          <div>
                            {/* Display all row data in the dialog */}
                            {selectedRowData && (
                              <div className="w-full h-[400px] space-y-4 overflow-auto">
                                <div>
                                  <h3 className="text-lg font-semibold">
                                    Requester Details
                                  </h3>
                                  <div className="grid grid-cols-2 gap-4 mt-2">
                                    {Object.entries(selectedRowData).map(
                                      ([key, value]) => (
                                        <div key={key} className="flex">
                                          <div className="font-medium text-gray-700 capitalize w-40">
                                            {formatKey(key)}:
                                          </div>
                                          <div className="text-gray-900">
                                            {value instanceof Date
                                              ? value.toLocaleDateString()
                                              : value.toString()}
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button>Approve</Button>
                            <Button variant="destructive">Reject</Button>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
