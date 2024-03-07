import { useDispatch } from "react-redux";
import { Handle, Position } from "reactflow";

function SortNode({ isConnectable }) {
  const onChange = () => {};
  return (
    <div>
      <Handle
        type="target"
        position={Position.top}
        isConnectable={isConnectable}
      />
      <div>
        <label>
          Column name :
          <input onChange={onChange} className="nodrag" type="text" />
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default SortNode;
