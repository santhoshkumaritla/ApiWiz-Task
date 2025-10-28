/**
 * Parse JSON data into React Flow nodes and edges
 */
export const parseJsonToNodes = (data, parentId = null, parentPath = '$', level = 0) => {
  const nodes = [];
  const edges = [];
  let nodeId = 0;

  // First pass: create all nodes and track their relationships
  const nodeTree = {};
  
  const buildTree = (obj, path, parent, depth) => {
    const currentId = `node-${nodeId++}`;
    const type = getNodeType(obj);
    
    const nodeInfo = {
      id: currentId,
      type: 'custom',
      depth,
      parent,
      children: [],
      data: {
        label: getNodeLabel(obj, path),
        value: obj,
        path: path,
        nodeType: type,
      },
    };
    
    nodeTree[currentId] = nodeInfo;
    
    if (parent) {
      nodeTree[parent].children.push(currentId);
    }

    // Create edge from parent if exists
    if (parent) {
      edges.push({
        id: `edge-${parent}-${currentId}`,
        source: parent,
        target: currentId,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#94a3b8', strokeWidth: 2 },
      });
    }

    // Recursively process children
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        const childPath = `${path}[${index}]`;
        buildTree(item, childPath, currentId, depth + 1);
      });
    } else if (typeof obj === 'object' && obj !== null) {
      Object.entries(obj).forEach(([key, value]) => {
        const childPath = path === '$' ? `$.${key}` : `${path}.${key}`;
        buildTree(value, childPath, currentId, depth + 1);
      });
    }
  };

  // Calculate widths for each subtree
  const calculateWidth = (nodeId) => {
    const node = nodeTree[nodeId];
    if (node.children.length === 0) {
      node.width = 1;
      return 1;
    }
    
    let totalWidth = 0;
    node.children.forEach(childId => {
      totalWidth += calculateWidth(childId);
    });
    
    node.width = Math.max(totalWidth, 1);
    return node.width;
  };

  // Position nodes using the tree layout
  const positionNodes = (nodeId, x, y) => {
    const node = nodeTree[nodeId];
    const nodeWidth = 300; // Width allocated per node
    const levelHeight = 150; // Height between levels
    
    // Position current node
    const centerX = x + (node.width * nodeWidth) / 2 - nodeWidth / 2;
    
    nodes.push({
      id: node.id,
      type: node.type,
      position: { x: centerX, y },
      data: node.data,
    });

    // Position children
    if (node.children.length > 0) {
      let childX = x;
      node.children.forEach(childId => {
        const childNode = nodeTree[childId];
        positionNodes(childId, childX, y + levelHeight);
        childX += childNode.width * nodeWidth;
      });
    }
  };

  // Build the tree structure
  buildTree(data, parentPath, parentId, level);
  
  // Find root node
  const rootId = 'node-0';
  
  // Calculate widths
  if (nodeTree[rootId]) {
    calculateWidth(rootId);
    // Position nodes starting from root
    positionNodes(rootId, 0, 0);
  }
  
  return { nodes, edges };
};

/**
 * Determine node type
 */
const getNodeType = (value) => {
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'object' && value !== null) return 'object';
  return 'primitive';
};

/**
 * Generate node label
 */
const getNodeLabel = (value, path) => {
  const pathParts = path.split(/\.|\[|\]/).filter(Boolean);
  const key = pathParts[pathParts.length - 1] || 'root';
  
  if (Array.isArray(value)) {
    return `${key} [${value.length}]`;
  } else if (typeof value === 'object' && value !== null) {
    const keys = Object.keys(value).length;
    return `${key} {${keys}}`;
  } else {
    // Primitive value
    const displayValue = String(value).length > 20 
      ? String(value).substring(0, 20) + '...' 
      : String(value);
    return `${key}: ${displayValue}`;
  }
};

/**
 * Find node by JSON path
 */
export const findNodeByPath = (nodes, searchPath) => {
  // Normalize search path
  const normalizedSearch = searchPath
    .replace(/^\$\.?/, '$.')
    .replace(/\[(\d+)\]/g, '[$1]');
  
  return nodes.find(node => {
    const nodePath = node.data.path;
    return nodePath === normalizedSearch || nodePath === searchPath;
  });
};

/**
 * Validate JSON path format
 */
export const isValidJsonPath = (path) => {
  // Basic JSONPath validation
  const pathRegex = /^\$(\.[a-zA-Z_][a-zA-Z0-9_]*|\[\d+\])*$/;
  return pathRegex.test(path);
};

/**
 * Get value from JSON by path
 */
export const getValueByPath = (obj, path) => {
  try {
    // Remove leading $ and split by . or []
    const keys = path
      .replace(/^\$\.?/, '')
      .split(/\.|\[|\]/)
      .filter(Boolean);
    
    let current = obj;
    for (const key of keys) {
      if (current === null || current === undefined) return undefined;
      current = current[key];
    }
    return current;
  } catch {
    return undefined;
  }
};
