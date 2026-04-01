# Cheatsheet Generator

A modern, fast, and interactive web application built with React, Vite, and Tailwind CSS that allows users to create, customize, and export beautiful technical cheatsheets as PDFs.

## 🚀 Features

- **Block-Based Builder**: Construct you cheatsheet using pre-defined scalable blocks:
  - Headings
  - Rich Text
  - Code Snippets (with syntax labels)
  - Images
  - Data Tables
  - Ordered/Unordered Lists
  - Dividers & Vertical Spacers
- **Live Interactive Preview**: 
  - Inline WYSIWYG editing of text content.
  - Drag-and-drop support (via `@dnd-kit`) to effortlessly reorder components.
  - Interactive grid elements allowing adjustable column span and resizable vertical heights.
- **Advanced Customization**: 
  - Global document configurations (background color, typography, multi-column layout from 1 to 4 columns).
  - Fine-grained controls over block settings (alignments, font sizes, background colors, custom borders).
- **Template System**: Quickly scaffold standard sheets via built-in predefined configurations.
- **Export to PDF**: In-browser rendering using `html2canvas` and `jsPDF` to export the finalized crisp cheatsheet to a downloadable PDF file.
- **Modern UI**: Components built using Shadcn UI + Radix UI primitives.

## 🛠️ Technology Stack

- **Framework**: React 18, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Components Component Library**: Shadcn UI (Radix UI)
- **Icons**: Lucide React
- **Drag & Drop**: `@dnd-kit/core`
- **PDF Generation**: `html2canvas`, `jspdf`
- **Form/State Management**: React Hook Form, TanStack React Query

## 📁 Project Structure

```text
src/
├── components/
│   ├── ui/                   # Reusable Shadcn UI blocks (Buttons, Inputs, Select, etc.)
│   ├── EditorPanel.tsx       # Sidebar for configuring document and block properties
│   ├── CheatsheetPreview.tsx # Live DND grid interface for block arrangement and editing
│   └── NavLink.tsx           # Standardized navigation wrapper
├── data/
│   └── cheatsheetData.ts     # Schema definitions, block initializers, and pre-built templates
├── hooks/                    # Reusable custom React hooks
├── lib/                      # Utils and structural helpers
├── pages/
│   ├── Index.tsx             # The main workbench screen holding the editor and preview state
│   └── NotFound.tsx          # 404 Catch-all route
├── App.tsx                   # Main Routing and Context Providers Setup
└── main.tsx                  # React DOM Entrypoint
```

## 📈 Current Project State

The project is actively running as a fully functional and stable MVP.
- All core block types are implemented.
- The drag-and-drop context is responsive and stable within the multi-column framework.
- Grid resizing handlers are working correctly.
- Application currently processes exports well given the CORS configuration of embedded image contexts.
- Local Vite development server spins up correctly with no unresolved dependencies.
