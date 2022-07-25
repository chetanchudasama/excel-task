import React, { useState } from "react";
import "./table.css";

function Table({ colDefs, data }) {
  const [cols] = useState(colDefs);
  const [rows] = useState(data);
  const [dragOver] = useState("");

  const handleDragStart = (e) => {
    const { id } = e.target;

    const idx = cols.indexOf(id);
    e.dataTransfer.setData("colIdx", idx);
  };

  return (
    <div className="tableMain">
      <div>
        <ul>
          {cols.map((col) => (
            <li
              id={col}
              key={col}
              draggable
              onDragStart={handleDragStart}
              // dragOver={col === dragOver}
            >
              {col}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              {cols.map((col) => (
                <th>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {Object.entries(row).map(([k, v], idx) => {
                  return (
                    <td key={v} dragOver={cols[idx] === dragOver}>
                      {row[cols[idx]]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
