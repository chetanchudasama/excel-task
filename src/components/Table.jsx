import React, { useState } from "react";
import "./table.css";

function Table({ colDefs, data }) {
  const [cols] = useState(colDefs);

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
            >
              {col}
            </li>
          ))}
        </ul>
      </div>
      <div></div>
    </div>
  );
}

export default Table;
