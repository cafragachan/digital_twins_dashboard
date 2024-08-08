"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table"
   
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Unit } from "@/units"

  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }
   
  export function UnitsDataTable<TData, TValue>({
    columns,
    data,
    onPriceChange,
    onAvailabilityChange,
  }: DataTableProps<TData, TValue> & {
    onPriceChange: (id: number, newPrice: number) => void;
    onAvailabilityChange: (id: number, isAvailable: boolean) => void;
  }) {


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      })

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
                    )
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
                       {cell.column.id === 'price' ? (
                         <input
                           type="text"
                           value={cell.getValue() as number}
                           onChange={(e) => onPriceChange((row.original as Unit).id, Number(e.target.value))}
                         />
                       ) : cell.column.id === 'is_available' ? (
                         <input
                           type="checkbox"
                           checked={cell.getValue() as boolean}
                           onChange={(e) => onAvailabilityChange((row.original as Unit).id, e.target.checked)}
                         />
                       ) : (
                         flexRender(cell.column.columnDef.cell, cell.getContext())
                       )}
                     </TableCell>
                    ))}
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
      )
  }