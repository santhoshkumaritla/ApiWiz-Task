import { useState, useCallback } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { Toaster } from 'react-hot-toast';
import JsonInput from './components/JsonInput';
import TreeVisualizer from './components/TreeVisualizer';
import SearchBar from './components/SearchBar';
import Toolbar from './components/Toolbar';
import ThemeToggle from './components/ThemeToggle';
import { parseJsonToNodes } from './utils/jsonParser';

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [highlightedNodeId, setHighlightedNodeId] = useState(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const handleVisualize = useCallback((jsonData) => {
    const { nodes: newNodes, edges: newEdges } = parseJsonToNodes(jsonData);
    setNodes(newNodes);
    setEdges(newEdges);
    setHighlightedNodeId(null);
  }, []);

  const handleClear = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setHighlightedNodeId(null);
  }, []);

  const handleNodeFound = useCallback((node) => {
    setHighlightedNodeId(node.id);
  }, []);

  const handleSearchClear = useCallback(() => {
    setHighlightedNodeId(null);
  }, []);

  const handleZoomIn = useCallback(() => {
    reactFlowInstance?.zoomIn({ duration: 300 });
  }, [reactFlowInstance]);

  const handleZoomOut = useCallback(() => {
    reactFlowInstance?.zoomOut({ duration: 300 });
  }, [reactFlowInstance]);

  const handleFitView = useCallback(() => {
    reactFlowInstance?.fitView({ padding: 0.2, duration: 300 });
  }, [reactFlowInstance]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 transition-colors duration-300">
      <Toaster />
      
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  JSON Tree Visualizer
                </h1>
                
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-180px)]">
          {/* Left Panel - JSON Input */}
          <div className="lg:col-span-4 h-full">
            <JsonInput onVisualize={handleVisualize} onClear={handleClear} />
          </div>

          {/* Right Panel - Visualization */}
          <div className="lg:col-span-8 flex flex-col gap-4 h-full">
            {/* Search Bar */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <SearchBar
                nodes={nodes}
                onNodeFound={handleNodeFound}
                onSearchClear={handleSearchClear}
              />
            </div>

            {/* Toolbar */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <Toolbar
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onFitView={handleFitView}
                onClear={handleClear}
                reactFlowInstance={reactFlowInstance}
                disabled={nodes.length === 0}
              />
            </div>

            {/* Tree Visualization */}
            <div className="flex-1 min-h-0">
              <ReactFlowProvider>
                <TreeVisualizer
                  nodes={nodes}
                  edges={edges}
                  highlightedNodeId={highlightedNodeId}
                  onInit={setReactFlowInstance}
                />
              </ReactFlowProvider>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-8">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500"></span>
                <span className="text-xs">Object</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500"></span>
                <span className="text-xs">Array</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-orange-500"></span>
                <span className="text-xs">Primitive</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
