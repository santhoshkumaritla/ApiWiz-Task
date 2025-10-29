import { memo } from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => {
  const { nodeType, label, value, path } = data;

  // Define colors based on node type - Humanized color palette
  const getNodeStyle = () => {
    switch (nodeType) {
      case 'object':
        return {
          bg: 'bg-gradient-to-br from-indigo-400 to-blue-500 dark:from-indigo-500 dark:to-blue-600',
          border: 'border-indigo-300 dark:border-indigo-400',
          text: 'text-white',
        };
      case 'array':
        return {
          bg: 'bg-gradient-to-br from-teal-400 to-cyan-500 dark:from-teal-500 dark:to-cyan-600',
          border: 'border-teal-300 dark:border-teal-400',
          text: 'text-white',
        };
      case 'primitive':
        return {
          bg: 'bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600',
          border: 'border-amber-300 dark:border-amber-400',
          text: 'text-white',
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800',
          border: 'border-slate-300 dark:border-slate-600',
          text: 'text-slate-800 dark:text-slate-100',
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
