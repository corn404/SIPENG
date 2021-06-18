import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Downloads extends React.Component {
  render() {
    return (
      <ExcelFile
        filename="Data Mahasiswa"
        element={
          <button className="btn btn-outline-primary btn-sm">disini!</button>
        }
      >
        <ExcelSheet data={[]} name="Sheet1">
          <ExcelColumn label="NIM" value="nim" />
          <ExcelColumn label="NAMA_LENGKAP" value="nama_lengkap" />
          <ExcelColumn label="KELAMIN" value="kelamin" />
          <ExcelColumn label="ALAMAT" value="alamat" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}

export default Downloads;
