import { Unit } from "@/units"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Unit>[] = [
    {
        header: "ID",
        accessorKey: "name"
    },
    {
        header: "Level",
        accessorKey: "level"
    },
    {
        header: "Room Type",
        accessorKey: "type"
    },
    {
        header: "Available",
        accessorKey: "is_available",
        cell: ({ row }) => (
            <input
              type="checkbox"
              checked={row.original.is_available}
            />
          ),
    },
    {
        header: "Price",
        accessorKey: "price"
    },
    {
        header: "Description",
        accessorKey: "description"
    },

]