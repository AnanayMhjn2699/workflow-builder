import React, { useState } from "react";
import ReactFlow, { Handle } from "react-flow-renderer";

const CsvNode = ({ data }) => {
  const [csvData, setCsvData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "text/csv") {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          const parsedData = parseCsv(reader.result);
          setCsvData(parsedData);
          setError(null);
        };
        reader.onerror = () => {
          setError("Error reading the file.");
        };
      } else {
        setError("Please select a CSV file.");
      }
    }
  };

  const parseCsv = (csvString) => {
    const lines = csvString.split("\n");
    const headers = lines[0].split(",");
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",");
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index];
      });
      data.push(obj);
    }
    return data;
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "5px",
        background: "#f9f9f9",
      }}
    >
      <Handle type="target" position="top" style={{ background: "#555" }} />
      <div>
        <input type="file" onChange={handleFileChange} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {csvData && (
          <div>
            <h3>CSV Data:</h3>
            <pre>{JSON.stringify(csvData, null, 2)}</pre>
          </div>
        )}
      </div>
      <Handle type="source" position="bottom" style={{ background: "#555" }} />
    </div>
  );
};

export default CsvNode;
