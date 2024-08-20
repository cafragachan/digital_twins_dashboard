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
  onRoomTypeChange,
  onDescriptionChange,
}: DataTableProps<TData, TValue> & {
  onPriceChange: (id: number, newPrice: number) => void;
  onAvailabilityChange: (id: number, isAvailable: boolean) => void;
  onRoomTypeChange: (id: number, roomType: string) => void;
  onDescriptionChange: (id: number, description: string) => void;
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
                    ) : cell.column.id === 'name' ? (
                      <input
                        type="text"
                        value={cell.getValue() as string}
                        onChange={(e) => onRoomTypeChange((row.original as Unit).id, e.target.value)}
                      />
                    ) : cell.column.id === 'description' ? (
                      <textarea
                        value={cell.getValue() as string}
                        onChange={(e) =>
                          onDescriptionChange((row.original as Unit).id, e.target.value)
                        }
                        style={{ width: '100%', resize: 'none', overflow: 'hidden' }}
                        rows={1}
                        ref={(el) => {
                          if (el) {
                            el.style.height = 'auto';
                            el.style.height = `${el.scrollHeight}px`;
                          }
                        }}
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = 'auto';
                          target.style.height = `${target.scrollHeight}px`;
                        }}
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