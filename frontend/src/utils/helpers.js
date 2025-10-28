/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackError) {
      console.error('Failed to copy:', fallbackError);
      return false;
    }
  }
};

/**
 * Download React Flow as image
 */
export const downloadImage = async (dataUrl, filename = 'json-tree.png') => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
};

/**
 * Format JSON with proper indentation
 */
export const formatJson = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return jsonString;
  }
};

/**
 * Validate JSON string
 */
export const validateJson = (jsonString) => {
  try {
    JSON.parse(jsonString);
    return { valid: true, error: null };
  } catch (error) {
    return { 
      valid: false, 
      error: error.message 
    };
  }
};
