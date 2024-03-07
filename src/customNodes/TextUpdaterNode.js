import { useState } from "react";
import { useDispatch } from "react-redux";
import { Handle, Position } from "reactflow";
import { addItem } from "../utils/csvDataSlice";

function TextUpdaterNode({ data, isConnectable }) {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const onChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "text/csv") {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          const parsedData = parseCsv(reader.result);
          dispatch(addItem(parsedData));
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
    <div className="text-updater-node">
      <div>
        <label htmlFor="text">File: </label>
        <input
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag"
          type="file"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
