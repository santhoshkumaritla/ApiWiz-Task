# 🌳 JSON Tree Visualizer

A **production-ready** web application for visualizing JSON structures as interactive hierarchical trees. Built with **React**, **Vite**, **TailwindCSS**, and **React Flow**.

![JSON Tree Visualizer](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-6.0-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan) ![React Flow](https://img.shields.io/badge/React%20Flow-12.0-green)

---

## ✨ Features

### Core Features

- ✅ **JSON Input & Parsing** - Textarea with real-time validation and error messages
- ✅ **Tree Visualization** - Interactive hierarchical tree using React Flow
- ✅ **Node Types** - Color-coded nodes:
  - 🔵 **Object nodes** → Blue/Purple gradient
  - 🟢 **Array nodes** → Green/Emerald gradient
  - 🟠 **Primitive nodes** → Orange/Yellow gradient
- ✅ **Search Functionality** - Search by JSONPath (e.g., `$.user.address.city`)
- ✅ **Node Highlighting** - Red outline + glow effect for matched nodes
- ✅ **Auto Pan & Zoom** - Automatically centers and zooms to searched nodes

### Additional Features

- ✅ **Zoom Controls** - Zoom In / Zoom Out / Fit View buttons
- ✅ **Canvas Interactivity** - Drag to pan, mouse wheel to zoom
- ✅ **Hover Tooltips** - Shows full JSON path and value on hover
- ✅ **Dark/Light Mode** - Toggle with persistence (localStorage)
- ✅ **Copy JSON Path** - Click any node to copy its path to clipboard
- ✅ **Download as PNG** - Export visualization as high-quality image
- ✅ **Clear/Reset** - Clear input and visualization with one click
- ✅ **Sample JSON** - Pre-loaded example for quick testing
- ✅ **Responsive Design** - Mobile-friendly layout

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and **npm** 9+

### Installation

```bash
# Navigate to the project
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 📦 Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` directory.

---

## 🎯 Usage Guide

### 1. **Enter JSON Data**

- Paste or type JSON in the left textarea
- Use the **Load Sample** button to try with example data
- Invalid JSON will show error messages in red

### 2. **Visualize Tree**

- Click **🌳 Visualize Tree** to generate the interactive tree
- Nodes are color-coded by type (Object, Array, Primitive)
- The tree auto-arranges in a hierarchical layout

### 3. **Search Nodes**

- Enter a JSONPath in the search bar (e.g., `$.user.name` or `$.items[0].price`)
- Matching nodes are highlighted and centered
- Shows "Match found" or "No match found" status

### 4. **Interact with the Tree**

- **Click nodes** → Copy JSON path to clipboard (shows toast notification)
- **Hover nodes** → View tooltip with path and value
- **Drag canvas** → Pan around
- **Mouse wheel** → Zoom in/out
- **Mini-map** → Navigate large trees easily

### 5. **Use Controls**

- **Zoom In/Out/Fit View** → Control viewport
- **Download PNG** → Export tree as image
- **Clear All** → Reset everything
- **Theme Toggle** → Switch between light/dark mode

---

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── CustomNode.jsx       # React Flow custom node component
│   │   ├── JsonInput.jsx        # JSON textarea with validation
│   │   ├── TreeVisualizer.jsx   # React Flow canvas wrapper
│   │   ├── SearchBar.jsx        # JSONPath search functionality
│   │   ├── Toolbar.jsx          # Zoom + download + clear controls
│   │   └── ThemeToggle.jsx      # Dark/light mode switcher
│   ├── utils/
│   │   ├── jsonParser.js        # JSON → nodes/edges conversion
│   │   └── helpers.js           # Clipboard, validation, etc.
│   ├── hooks/
│   │   └── useDarkMode.js       # Dark mode state management
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind directives + custom styles
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── vite.config.js               # Vite configuration
└── package.json                 # Dependencies & scripts
```

---

## 🎨 Technology Stack

| Technology          | Purpose                               |
| ------------------- | ------------------------------------- |
| **React 18**        | UI framework                          |
| **Vite**            | Fast build tool & dev server          |
| **TailwindCSS**     | Utility-first styling                 |
| **React Flow**      | Interactive node-based visualizations |
| **html-to-image**   | Canvas to PNG export                  |
| **react-hot-toast** | Toast notifications                   |

---

## 🎨 Design Highlights

- **Modern UI** - Soft shadows, rounded corners, smooth animations
- **Gradient Nodes** - Visually distinct node types with gradients
- **Dark Mode** - Full dark theme support with Tailwind's `dark:` classes
- **Responsive** - Mobile-first design with adaptive layouts
- **Smooth Transitions** - Animated zoom/pan with 300ms easing
- **Accessibility** - Keyboard navigation, ARIA labels, tooltips

---

## 📚 Key Components

### `JsonInput.jsx`

- Textarea for JSON input
- Real-time validation with error display
- Sample data loader
- Clear button

### `TreeVisualizer.jsx`

- React Flow canvas wrapper
- Custom node rendering
- Click-to-copy path functionality
- Empty state placeholder

### `SearchBar.jsx`

- JSONPath search input
- Match highlighting
- Status messages (found/not found)
- Clear search button

### `Toolbar.jsx`

- Zoom controls (In/Out/Fit View)
- Download PNG button
- Clear all button
- Disabled state handling

### `CustomNode.jsx`

- Color-coded node rendering
- Tooltip with path + value
- Hover effects and animations
- Handle (connection points) styling

### `ThemeToggle.jsx`

- Sun/Moon icon toggle
- localStorage persistence
- Smooth icon transitions

---

## 🔧 Configuration

### Tailwind Config (`tailwind.config.js`)

- Dark mode: `class` strategy
- Custom colors and animations
- Content paths for purging

### Vite Config (`vite.config.js`)

- React plugin
- Development server settings

---

## 🌐 Deployment

### Deploy to **Vercel**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to **Netlify**

```bash
# Build the project
npm run build

# Drag & drop the `dist/` folder to Netlify
```

Or use the Netlify CLI:

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 🐛 Troubleshooting

### Issue: Dark mode not working

**Solution**: Make sure `tailwind.config.js` has `darkMode: 'class'`

### Issue: Nodes not rendering

**Solution**: Check that JSON is valid and the `parseJsonToNodes` function is working

### Issue: Copy to clipboard fails

**Solution**: Ensure the app is served over HTTPS (or localhost)

### Issue: Download image not working

**Solution**: Check browser console for errors; ensure React Flow instance is initialized

---

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📬 Support

For questions or issues, please open a GitHub issue or contact the maintainer.

---

**Made with ❤️ using React, Vite, TailwindCSS, and React Flow**
