import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const UploadExcel = () => {
  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(jsonData); // Preview or manipulate data
    };

    reader.readAsArrayBuffer(file);
  };

  const handleUpload = async () => {
    console.log(excelData);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <button onClick={handleUpload}>Upload to Backend</button>
    </div>
  );
};

export default UploadExcel;
