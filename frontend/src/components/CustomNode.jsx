import { memo } from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => {
  const { nodeType, label, value, path } = data;

  // Define colors based on node type
  const getNodeStyle = () => {
    switch (nodeType) {
      case 'object':
        return {
          bg: 'bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700',
          border: 'border-blue-400 dark:border-blue-500',
          text: 'text-white',
        };
      case 'array':
        return {
          bg: 'bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700',
          border: 'border-green-400 dark:border-green-500',
          text: 'text-white',
        };
      case 'primitive':
        return {
          bg: 'bg-gradient-to-br from-orange-400 to-yellow-500 dark:from-orange-500 dark:to-yellow-600',
          border: 'border-orange-400 dark:border-orange-500',
          text: 'text-white',
        };
      default:
        return {
          bg: 'bg-gray-200 dark:bg-gray-700',
          border: 'border-gray-300 dark:border-gray-600',
          text: 'text-gray-900 dark:text-gray-100',
        };
    }
  };

  const style = getNodeStyle();

  // Tooltip content
  const tooltipContent = `Path: ${path}\nType: ${nodeType}\nValue: ${
    typeof value === 'object' ? JSON.stringify(value, null, 2).slice(0, 100) + '...' : value
  }`;

  return (
    <div
      className={`
        px-4 py-3 rounded-lg shadow-lg border-2 
        ${style.bg} ${style.border} ${style.text}
        min-w-[120px] max-w-[250px]
        transition-all duration-200
        hover:shadow-xl hover:scale-105
        cursor-pointer
      `}
      title={tooltipContent}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-gray-300 dark:!bg-gray-600 border-2 border-white"
      />
      
      <div className="text-sm font-semibold break-words">
        {label}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-gray-300 dark:!bg-gray-600 border-2 border-white"
      />
    </div>
  );
};

export default memo(CustomNode);
