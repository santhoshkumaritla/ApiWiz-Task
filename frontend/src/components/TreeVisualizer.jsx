import { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import { copyToClipboard } from '../utils/helpers';
import toast from 'react-hot-toast';

const nodeTypes = {
  custom: CustomNode,
};

const TreeVisualizer = ({ nodes, edges, highlightedNodeId, onInit }) => {
  const { fitView, zoomIn, zoomOut, setCenter } = useReactFlow();
  const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges);

  // Update nodes when props change
  useMemo(() => {
    const updatedNodes = nodes.map((node) => ({
      ...node,
      style: {
        ...node.style,
        border: node.id === highlightedNodeId ? '3px solid #ef4444' : undefined,
        boxShadow: node.id === highlightedNodeId ? '0 0 20px rgba(239, 68, 68, 0.6)' : undefined,
      },
    }));
    setNodes(updatedNodes);
  }, [nodes, highlightedNodeId, setNodes]);

  useMemo(() => {
    setEdges(edges);
  }, [edges, setEdges]);

  // Handle node click - copy path to clipboard
  const onNodeClick = useCallback((event, node) => {
    const path = node.data.path;
    copyToClipboard(path).then((success) => {
      if (success) {
        toast.success(`Copied path: ${path}`, {
          duration: 2000,
          position: 'bottom-center',
          style: {
            background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
            color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#1f2937',
          },
        });
      }
    });
  }, []);

  // Pan to highlighted node
  useMemo(() => {
    if (highlightedNodeId) {
      const node = nodesState.find((n) => n.id === highlightedNodeId);
      if (node) {
        setCenter(node.position.x + 100, node.position.y + 50, {
          zoom: 1.2,
          duration: 800,
        });
      }
    }
  }, [highlightedNodeId, nodesState, setCenter]);

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      {nodesState.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-8">
            <svg
              className="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No Tree Visualization
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Enter JSON data and click "Visualize Tree" to see the structure
            </p>
          </div>
        </div>
      ) : (
        <ReactFlow
          nodes={nodesState}
          edges={edgesState}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onInit={onInit}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{
            padding: 0.2,
          }}
          minZoom={0.1}
          maxZoom={2}
          defaultEdgeOptions={{
            animated: false,
            style: { strokeWidth: 2 },
          }}
          proOptions={{ hideAttribution: true }}
        >
          <Background 
            variant="dots" 
            gap={16} 
            size={1} 
            color={document.documentElement.classList.contains('dark') ? '#374151' : '#d1d5db'}
          />
          <MiniMap
            nodeColor={(node) => {
              switch (node.data.nodeType) {
                case 'object':
                  return '#3b82f6';
                case 'array':
                  return '#10b981';
                case 'primitive':
                  return '#f59e0b';
                default:
                  return '#6b7280';
              }
            }}
            className="!bg-gray-100 dark:!bg-gray-800 !border-gray-300 dark:!border-gray-700"
            maskColor={document.documentElement.classList.contains('dark') ? 'rgba(17, 24, 39, 0.8)' : 'rgba(243, 244, 246, 0.8)'}
          />
        </ReactFlow>
      )}
    </div>
  );
};

export default TreeVisualizer;
