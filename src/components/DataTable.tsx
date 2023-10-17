import React, { useState } from "react";

/**
 * Props for the DataTable component.
 */
interface DataTableProps {
  data: string[][];
}

/**
 * A component for rendering a simple data table.
 *
 * @param {DataTableProps} props - The properties for the DataTable component.
 * @returns {JSX.Element} - A table element containing the provided data.
 */
function DataTable(props: DataTableProps) {
  let heading = props.data[0];
  let data = props.data.slice(1);
  return (
    <table>
      <tr>
        {heading.map((head: string, headID: number) => (
          <th aria-label={"header" + headID} key={headID}>
            {head}
          </th>
        ))}
      </tr>
      {data.map((row: string[], rowID: number) => (
        <tr key={rowID}>
          {row.map((elt: string, eltID) => (
            <td aria-label={"row" + rowID + " element" + eltID} key={eltID}>
              {elt}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
}

export default DataTable;
