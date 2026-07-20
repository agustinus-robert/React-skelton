"use client";

import React, { useState, useEffect } from "react";

import { useAuth } from "@/app/(admin)/providers/auth-provider";
import { can } from "@/lib/permission";
import Link from "next/link";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRefresh?: () => void;
  isLoading?: boolean;
  extraFilters?: React.ReactNode;
  title?: string;
  page?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRefresh,
  isLoading = false,
  extraFilters,
  title,
  page,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const user = useAuth();
  const canCreate = can(user, "can_create", page ?? "");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center bg-base-100 p-2 rounded-lg">
        <h2 className="text-xl font-bold">{title}</h2>
        {onRefresh && (
          <button
            onClick={() => {
              setGlobalFilter("");
              setStartDate("");
              setEndDate("");
              onRefresh();
            }}
            disabled={isLoading}
            className="btn btn-primary btn-sm"
          >
            {isLoading && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
            Refresh
          </button>
        )}
        {canCreate && (
          <Link href={`/${page}/create`} className="btn btn-sm btn-primary">
            Tambah
          </Link>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-base-100 p-4 border border-base-200 rounded-box shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <div className="form-control">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input input-bordered input-sm text-xs"
              placeholder="Mulai"
            />
          </div>
          <span className="text-base-content/50 text-sm">s/d</span>
          <div className="form-control">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input input-bordered input-sm text-xs"
              placeholder="Selesai"
            />
          </div>
          {(startDate || endDate) && (
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
              className="btn btn-ghost btn-xs text-error"
            >
              Reset Tgl
            </button>
          )}
        </div>

        {extraFilters && (
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {extraFilters}
          </div>
        )}

        <div className="form-control w-full md:w-auto md:max-w-xs ml-auto">
          <div className="relative">
            <input
              type="text"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Cari data..."
              className="input input-bordered input-sm w-full pl-8"
            />
            <svg
              className="w-4 h-4 absolute left-2.5 top-2.5 text-base-content/40"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border border-base-200 rounded-box bg-base-100 shadow">
        <table className="table table-zebra w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-10">
                  <span className="loading loading-dots loading-md text-primary"></span>
                </td>
              </tr>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-10 text-base-content/50"
                >
                  Tidak ada data yang cocok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {table.getPrePaginationRowModel().rows.length > 10 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <div className="text-sm text-base-content/75">
            Menampilkan Halaman{" "}
            <span className="font-semibold">
              {table.getState().pagination.pageIndex + 1}
            </span>{" "}
            dari <span className="font-semibold">{table.getPageCount()}</span>
          </div>

          <div className="join">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="join-item btn btn-outline btn-sm"
            >
              « Prev
            </button>
            <button className="join-item btn btn-outline btn-sm no-animation bg-base-200 border-base-300">
              Page {table.getState().pagination.pageIndex + 1}
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="join-item btn btn-outline btn-sm"
            >
              Next »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
