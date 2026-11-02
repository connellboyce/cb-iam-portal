import type { ReactNode } from "react";

export interface Column<T> {
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  caption: string;
  rows: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string;
  actions?: (row: T) => ReactNode;
}

const cellClasses =
  "border-t border-foreground/10 px-3 py-3 align-middle transition-colors group-first:border-t-0 group-hover:bg-foreground/5";

export default function DataTable<T>({
  caption,
  rows,
  columns,
  rowKey,
  actions,
}: DataTableProps<T>) {
  return (
    <div className="rounded-3xl bg-foreground/[0.03] p-3">
      <table className="w-full table-fixed border-separate border-spacing-0 text-left">
        <caption className="sr-only">{caption}</caption>
        <thead className="text-xs tracking-wide text-muted uppercase">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                scope="col"
                className={`px-3 pt-1 pb-3 font-normal ${column.className ?? ""}`}
              >
                {column.header}
              </th>
            ))}
            {actions && (
              <th scope="col" className="w-36 px-3 pt-1 pb-3">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="group">
              {columns.map((column) => (
                <td
                  key={column.header}
                  className={`${cellClasses} ${column.className ?? ""}`}
                >
                  {column.cell(row)}
                </td>
              ))}
              {actions && (
                <td className={cellClasses}>
                  <div className="flex justify-end gap-1">{actions(row)}</div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
