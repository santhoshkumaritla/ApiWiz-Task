import { toPng } from 'html-to-image';
import toast from 'react-hot-toast';

const Toolbar = ({ 
  onZoomIn, 
  onZoomOut, 
  onFitView, 
  onClear, 
  reactFlowInstance,
  disabled 
}) => {
  
  const handleDownloadImage = async () => {
    if (!reactFlowInstance) {
      toast.error('Flow instance not ready');
      return;
    }

    const toastId = toast.loading('Generating  image...');

    try {
      // Get the React Flow wrapper element
      const flowElement = document.querySelector('.react-flow__viewport');
      if (!flowElement) {
        toast.error('Could not find flow element', { id: toastId });
        return;
      }

      // Wait for render
      await new Promise(resolve => setTimeout(resolve, 200));

      // Generate high-quality image
      const blob = await toPng(flowElement, {
        backgroundColor: document.documentElement.classList.contains('dark') 
          ? '#1f2937' 
          : '#ffffff',
        quality: 1.0,
        pixelRatio: 3, // Increased from 2 to 3 for better quality
        cacheBust: true,
        canvasWidth: flowElement.offsetWidth * 3,
        canvasHeight: flowElement.offsetHeight * 3,
        skipAutoScale: false,
        fontEmbedCSS: '',
      }).then(dataUrl => {
        return fetch(dataUrl).then(res => res.blob());
      });

      // Create object URL from blob
      const url = URL.createObjectURL(blob);
      
      // Create and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `json-tree-${Date.now()}.png`;
      
      // Force download by clicking the link
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('High-quality image downloaded!', { id: toastId });
      }, 100);

    } catch (error) {
      console.error('Failed to download image:', error);
      toast.error(`Download failed: ${error.message}`, { id: toastId });
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-2">
        <button
          onClick={onZoomIn}
          disabled={disabled}
          className="
            p-2.5 bg-gray-100 dark:bg-gray-700 
            hover:bg-gray-200 dark:hover:bg-gray-600
            disabled:bg-gray-50 dark:disabled:bg-gray-800
            text-gray-700 dark:text-gray-300
            disabled:text-gray-400 dark:disabled:text-gray-600
            rounded-md transition-colors
            disabled:cursor-not-allowed
          "
          title="Zoom In"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </button>

        <button
          onClick={onZoomOut}
          disabled={disabled}
          className="
            p-2.5 bg-gray-100 dark:bg-gray-700 
            hover:bg-gray-200 dark:hover:bg-gray-600
            disabled:bg-gray-50 dark:disabled:bg-gray-800
            text-gray-700 dark:text-gray-300
            disabled:text-gray-400 dark:disabled:text-gray-600
            rounded-md transition-colors
            disabled:cursor-not-allowed
          "
          title="Zoom Out"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM7 10h6" />
          </svg>
        </button>

        <button
          onClick={onFitView}
          disabled={disabled}
          className="
            p-2.5 bg-gray-100 dark:bg-gray-700 
            hover:bg-gray-200 dark:hover:bg-gray-600
            disabled:bg-gray-50 dark:disabled:bg-gray-800
            text-gray-700 dark:text-gray-300
            disabled:text-gray-400 dark:disabled:text-gray-600
            rounded-md transition-colors
            disabled:cursor-not-allowed
          "
          title="Fit View"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>

      <button
        onClick={handleDownloadImage}
        disabled={disabled || !reactFlowInstance}
        className="
          px-4 py-2.5 bg-green-500 hover:bg-green-600
          disabled:bg-gray-300 dark:disabled:bg-gray-700
          text-white font-medium rounded-lg
          transition-colors duration-200
          disabled:cursor-not-allowed
          shadow-md hover:shadow-lg
          flex items-center gap-2
        "
        title="Download as PNG"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download PNG
      </button>

      <button
        onClick={onClear}
        className="
          px-4 py-2.5 bg-red-500 hover:bg-red-600
          text-white font-medium rounded-lg
          transition-colors duration-200
          shadow-md hover:shadow-lg
          flex items-center gap-2
        "
        title="Clear All"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Clear All
      </button>
    </div>
  );
};

export default Toolbar;
