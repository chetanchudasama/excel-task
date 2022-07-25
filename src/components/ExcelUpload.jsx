/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import * as XLSX from "xlsx";
import xls from "../assets/xls.png";
import Table from "./Table";

function ExcelUpload() {
  const [isFileUploaded, setisFileUploaded] = useState(false);
  const [colDefs, setColDefs] = useState();
  const [data, setData] = useState();
  const [dropDataTitle, setdropDataTitle] = useState([]);

  const importExcel = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      //parse data
      const bufferArray = event.target.result;
      const workBook = XLSX.read(bufferArray, { type: "buffer" });

      //get first sheet
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet);
      console.log(" File Data => ", fileData);
      setData(fileData);
      setColDefs(Object.keys(fileData[0]));
    };

    if (file) {
      const fileNameArr = file.name.split(".");

      const extension = fileNameArr[fileNameArr.length - 1];
      if (extension === "xlsx" || extension === "xls") {
        reader.readAsArrayBuffer(file);
      } else {
        setisFileUploaded(false);
        alert("Invalid file input, Select Excel, CSV file");
      }
    } else {
      setData([]);
      setColDefs([]);
    }
  };

  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const drop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("colIdx");
    console.log("data => ", data);
    setdropDataTitle([
      ...dropDataTitle,
      document.getElementById(colDefs[data]).textContent,
    ]);
  };

  return (
    <div className="main">
      <div>
        <div>
          {isFileUploaded && (
            <img src={xls} alt="Excel File" height={50} width={50} />
          )}
        </div>
        <input type="file" onChange={(e) => importExcel(e)} />
        <div>{data && <Table colDefs={colDefs} data={data} />}</div>
      </div>

      <div className="second" onDrop={drop} onDragOver={allowDrop}>
        drop
        {dropDataTitle && data && (
          <table>
            <tr>
              {dropDataTitle.map((col) => (
                <th>{col}</th>
              ))}

              {data.map((row) => (
                <>
                  {Object.entries(row).map(([k, v], idx) => {
                    return <td key={v}>{row[dropDataTitle[idx]]}</td>;
                  })}
                </>
              ))}
            </tr>
          </table>
        )}
        <div className="third">
          <h1>chart</h1>
        </div>
      </div>
    </div>
  );
}

export default ExcelUpload;
