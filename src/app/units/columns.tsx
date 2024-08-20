import { Unit } from "@/units"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Unit>[] = [
    {
        header: "ID",
        accessorKey: "tag"
    },
    {
        header: "Level",
        accessorKey: "level"
    },
    {
        header: "Unit Type",
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
        header: "Name",
        accessorKey: "name"
    },
    {
        header: "Description",
        accessorKey: "description"
    },

]