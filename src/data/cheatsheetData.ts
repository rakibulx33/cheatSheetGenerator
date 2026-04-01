export interface CheatsheetSection {
  id: string;
  title: string;
  items: CheatsheetItem[];
}

export interface CheatsheetItem {
  id: string;
  label: string;
  code: string;
  description?: string;
}

export interface CheatsheetTemplate {
  id: string;
  name: string;
  description: string;
  columns: number;
  borderStyle: 'rounded' | 'sharp' | 'none';
  showDescriptions: boolean;
  headerStyle: 'gradient' | 'solid' | 'minimal';
}

export interface CheatsheetConfig {
  title: string;
  subtitle: string;
  language: string;
  template: CheatsheetTemplate;
  sections: CheatsheetSection[];
  customColors: {
    headerBg: string;
    headerText: string;
    sectionBg: string;
    sectionTitle: string;
    codeBg: string;
    codeText: string;
    labelText: string;
    pageBg: string;
  };
  font: string;
}

export const templates: CheatsheetTemplate[] = [
  {
    id: 'modern',
    name: 'Modern Dev',
    description: 'Clean, modern layout with gradient headers and rounded cards',
    columns: 3,
    borderStyle: 'rounded',
    showDescriptions: true,
    headerStyle: 'gradient',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    description: 'Dark terminal-inspired look with sharp edges and monospace feel',
    columns: 2,
    borderStyle: 'sharp',
    showDescriptions: false,
    headerStyle: 'solid',
  },
  {
    id: 'minimal',
    name: 'Minimal Print',
    description: 'Clean minimal design optimized for printing',
    columns: 3,
    borderStyle: 'none',
    showDescriptions: true,
    headerStyle: 'minimal',
  },
];

export const fonts = [
  'Inter',
  'JetBrains Mono',
  'Space Grotesk',
  'Fira Code',
  'Source Code Pro',
  'Roboto Mono',
];

const generateId = () => Math.random().toString(36).substring(2, 9);

export const languagePresets: Record<string, { title: string; subtitle: string; sections: CheatsheetSection[] }> = {
  html: {
    title: 'HTML5 Cheatsheet',
    subtitle: 'Essential HTML tags and attributes',
    sections: [
      {
        id: generateId(),
        title: 'Document Structure',
        items: [
          { id: generateId(), label: 'Doctype', code: '<!DOCTYPE html>', description: 'Declares HTML5 document' },
          { id: generateId(), label: 'HTML Root', code: '<html lang="en">', description: 'Root element with language' },
          { id: generateId(), label: 'Head', code: '<head>...</head>', description: 'Metadata container' },
          { id: generateId(), label: 'Body', code: '<body>...</body>', description: 'Visible content' },
        ],
      },
      {
        id: generateId(),
        title: 'Text Elements',
        items: [
          { id: generateId(), label: 'Headings', code: '<h1> to <h6>', description: 'Heading levels 1-6' },
          { id: generateId(), label: 'Paragraph', code: '<p>Text</p>', description: 'Block of text' },
          { id: generateId(), label: 'Bold', code: '<strong>Text</strong>', description: 'Strong emphasis' },
          { id: generateId(), label: 'Italic', code: '<em>Text</em>', description: 'Emphasis' },
          { id: generateId(), label: 'Link', code: '<a href="url">Text</a>', description: 'Hyperlink' },
        ],
      },
      {
        id: generateId(),
        title: 'Forms',
        items: [
          { id: generateId(), label: 'Form', code: '<form action="" method="">', description: 'Form container' },
          { id: generateId(), label: 'Input', code: '<input type="text" name="">', description: 'Input field' },
          { id: generateId(), label: 'Select', code: '<select><option>...</option></select>', description: 'Dropdown' },
          { id: generateId(), label: 'Textarea', code: '<textarea rows="4"></textarea>', description: 'Multi-line input' },
          { id: generateId(), label: 'Button', code: '<button type="submit">Send</button>', description: 'Clickable button' },
        ],
      },
      {
        id: generateId(),
        title: 'Semantic Elements',
        items: [
          { id: generateId(), label: 'Header', code: '<header>...</header>', description: 'Page/section header' },
          { id: generateId(), label: 'Nav', code: '<nav>...</nav>', description: 'Navigation links' },
          { id: generateId(), label: 'Main', code: '<main>...</main>', description: 'Main content' },
          { id: generateId(), label: 'Footer', code: '<footer>...</footer>', description: 'Page/section footer' },
          { id: generateId(), label: 'Article', code: '<article>...</article>', description: 'Self-contained content' },
          { id: generateId(), label: 'Section', code: '<section>...</section>', description: 'Thematic grouping' },
        ],
      },
      {
        id: generateId(),
        title: 'Media',
        items: [
          { id: generateId(), label: 'Image', code: '<img src="" alt="">', description: 'Embed image' },
          { id: generateId(), label: 'Video', code: '<video src="" controls></video>', description: 'Embed video' },
          { id: generateId(), label: 'Audio', code: '<audio src="" controls></audio>', description: 'Embed audio' },
          { id: generateId(), label: 'Canvas', code: '<canvas id="c"></canvas>', description: '2D drawing surface' },
        ],
      },
      {
        id: generateId(),
        title: 'Lists & Tables',
        items: [
          { id: generateId(), label: 'Ordered List', code: '<ol><li>Item</li></ol>', description: 'Numbered list' },
          { id: generateId(), label: 'Unordered List', code: '<ul><li>Item</li></ul>', description: 'Bullet list' },
          { id: generateId(), label: 'Table', code: '<table><tr><td>Cell</td></tr></table>', description: 'Data table' },
        ],
      },
    ],
  },
  css: {
    title: 'CSS3 Cheatsheet',
    subtitle: 'Essential CSS properties and selectors',
    sections: [
      {
        id: generateId(),
        title: 'Selectors',
        items: [
          { id: generateId(), label: 'Element', code: 'div { }', description: 'Selects all div elements' },
          { id: generateId(), label: 'Class', code: '.classname { }', description: 'Selects by class' },
          { id: generateId(), label: 'ID', code: '#idname { }', description: 'Selects by ID' },
          { id: generateId(), label: 'Child', code: 'div > p { }', description: 'Direct children' },
          { id: generateId(), label: 'Pseudo', code: 'a:hover { }', description: 'State-based' },
        ],
      },
      {
        id: generateId(),
        title: 'Box Model',
        items: [
          { id: generateId(), label: 'Margin', code: 'margin: 10px;', description: 'Outer spacing' },
          { id: generateId(), label: 'Padding', code: 'padding: 10px;', description: 'Inner spacing' },
          { id: generateId(), label: 'Border', code: 'border: 1px solid #000;', description: 'Element border' },
          { id: generateId(), label: 'Box Sizing', code: 'box-sizing: border-box;', description: 'Include padding in width' },
        ],
      },
      {
        id: generateId(),
        title: 'Flexbox',
        items: [
          { id: generateId(), label: 'Container', code: 'display: flex;', description: 'Enable flexbox' },
          { id: generateId(), label: 'Direction', code: 'flex-direction: row | column;', description: 'Main axis' },
          { id: generateId(), label: 'Justify', code: 'justify-content: center;', description: 'Main axis alignment' },
          { id: generateId(), label: 'Align', code: 'align-items: center;', description: 'Cross axis alignment' },
          { id: generateId(), label: 'Wrap', code: 'flex-wrap: wrap;', description: 'Allow wrapping' },
          { id: generateId(), label: 'Gap', code: 'gap: 16px;', description: 'Space between items' },
        ],
      },
      {
        id: generateId(),
        title: 'Grid',
        items: [
          { id: generateId(), label: 'Container', code: 'display: grid;', description: 'Enable grid' },
          { id: generateId(), label: 'Columns', code: 'grid-template-columns: 1fr 1fr;', description: 'Define columns' },
          { id: generateId(), label: 'Rows', code: 'grid-template-rows: auto;', description: 'Define rows' },
          { id: generateId(), label: 'Gap', code: 'grid-gap: 10px;', description: 'Spacing' },
          { id: generateId(), label: 'Span', code: 'grid-column: span 2;', description: 'Span columns' },
        ],
      },
      {
        id: generateId(),
        title: 'Typography',
        items: [
          { id: generateId(), label: 'Font Family', code: "font-family: 'Arial', sans-serif;", description: 'Set font' },
          { id: generateId(), label: 'Font Size', code: 'font-size: 16px;', description: 'Text size' },
          { id: generateId(), label: 'Font Weight', code: 'font-weight: bold;', description: 'Text weight' },
          { id: generateId(), label: 'Line Height', code: 'line-height: 1.5;', description: 'Line spacing' },
          { id: generateId(), label: 'Text Align', code: 'text-align: center;', description: 'Horizontal alignment' },
        ],
      },
      {
        id: generateId(),
        title: 'Colors & Backgrounds',
        items: [
          { id: generateId(), label: 'Color', code: 'color: #333;', description: 'Text color' },
          { id: generateId(), label: 'Background', code: 'background-color: #fff;', description: 'BG color' },
          { id: generateId(), label: 'Gradient', code: 'background: linear-gradient(to right, #a, #b);', description: 'Gradient BG' },
          { id: generateId(), label: 'Opacity', code: 'opacity: 0.8;', description: 'Transparency' },
        ],
      },
    ],
  },
  mysql: {
    title: 'MySQL Cheatsheet',
    subtitle: 'Essential MySQL commands and queries',
    sections: [
      {
        id: generateId(),
        title: 'Database Operations',
        items: [
          { id: generateId(), label: 'Create DB', code: 'CREATE DATABASE dbname;', description: 'Create new database' },
          { id: generateId(), label: 'Use DB', code: 'USE dbname;', description: 'Switch to database' },
          { id: generateId(), label: 'Show DBs', code: 'SHOW DATABASES;', description: 'List all databases' },
          { id: generateId(), label: 'Drop DB', code: 'DROP DATABASE dbname;', description: 'Delete database' },
        ],
      },
      {
        id: generateId(),
        title: 'Table Operations',
        items: [
          { id: generateId(), label: 'Create Table', code: 'CREATE TABLE users (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  name VARCHAR(100)\n);', description: 'Create new table' },
          { id: generateId(), label: 'Show Tables', code: 'SHOW TABLES;', description: 'List tables' },
          { id: generateId(), label: 'Describe', code: 'DESCRIBE tablename;', description: 'Show table structure' },
          { id: generateId(), label: 'Alter Table', code: 'ALTER TABLE users ADD email VARCHAR(255);', description: 'Modify table' },
          { id: generateId(), label: 'Drop Table', code: 'DROP TABLE tablename;', description: 'Delete table' },
        ],
      },
      {
        id: generateId(),
        title: 'CRUD Operations',
        items: [
          { id: generateId(), label: 'Insert', code: "INSERT INTO users (name) VALUES ('John');", description: 'Add record' },
          { id: generateId(), label: 'Select All', code: 'SELECT * FROM users;', description: 'Get all records' },
          { id: generateId(), label: 'Select Where', code: "SELECT * FROM users WHERE id = 1;", description: 'Filter records' },
          { id: generateId(), label: 'Update', code: "UPDATE users SET name='Jane' WHERE id=1;", description: 'Modify record' },
          { id: generateId(), label: 'Delete', code: 'DELETE FROM users WHERE id = 1;', description: 'Remove record' },
        ],
      },
      {
        id: generateId(),
        title: 'Joins',
        items: [
          { id: generateId(), label: 'Inner Join', code: 'SELECT * FROM a INNER JOIN b ON a.id = b.a_id;', description: 'Matching rows' },
          { id: generateId(), label: 'Left Join', code: 'SELECT * FROM a LEFT JOIN b ON a.id = b.a_id;', description: 'All from left' },
          { id: generateId(), label: 'Right Join', code: 'SELECT * FROM a RIGHT JOIN b ON a.id = b.a_id;', description: 'All from right' },
        ],
      },
      {
        id: generateId(),
        title: 'Aggregates & Grouping',
        items: [
          { id: generateId(), label: 'Count', code: 'SELECT COUNT(*) FROM users;', description: 'Count rows' },
          { id: generateId(), label: 'Sum', code: 'SELECT SUM(amount) FROM orders;', description: 'Sum values' },
          { id: generateId(), label: 'Group By', code: 'SELECT status, COUNT(*) FROM orders GROUP BY status;', description: 'Group results' },
          { id: generateId(), label: 'Having', code: 'SELECT status, COUNT(*) FROM orders GROUP BY status HAVING COUNT(*) > 5;', description: 'Filter groups' },
          { id: generateId(), label: 'Order By', code: 'SELECT * FROM users ORDER BY name ASC;', description: 'Sort results' },
        ],
      },
    ],
  },
  javascript: {
    title: 'JavaScript Cheatsheet',
    subtitle: 'Essential JavaScript syntax and methods',
    sections: [
      {
        id: generateId(),
        title: 'Variables & Types',
        items: [
          { id: generateId(), label: 'Let', code: "let x = 10;", description: 'Block-scoped variable' },
          { id: generateId(), label: 'Const', code: "const PI = 3.14;", description: 'Constant value' },
          { id: generateId(), label: 'Template Literal', code: '`Hello ${name}`', description: 'String interpolation' },
          { id: generateId(), label: 'Destructuring', code: 'const { a, b } = obj;', description: 'Extract values' },
        ],
      },
      {
        id: generateId(),
        title: 'Functions',
        items: [
          { id: generateId(), label: 'Arrow Function', code: 'const fn = (x) => x * 2;', description: 'Short syntax' },
          { id: generateId(), label: 'Default Params', code: 'function greet(name = "World") {}', description: 'Default values' },
          { id: generateId(), label: 'Rest Params', code: 'function sum(...nums) {}', description: 'Collect arguments' },
          { id: generateId(), label: 'Spread', code: 'const arr2 = [...arr1, 4];', description: 'Expand iterables' },
        ],
      },
      {
        id: generateId(),
        title: 'Arrays',
        items: [
          { id: generateId(), label: 'Map', code: 'arr.map(x => x * 2)', description: 'Transform each element' },
          { id: generateId(), label: 'Filter', code: 'arr.filter(x => x > 5)', description: 'Filter elements' },
          { id: generateId(), label: 'Reduce', code: 'arr.reduce((a, b) => a + b, 0)', description: 'Accumulate values' },
          { id: generateId(), label: 'Find', code: 'arr.find(x => x.id === 1)', description: 'Find first match' },
          { id: generateId(), label: 'ForEach', code: 'arr.forEach(x => console.log(x))', description: 'Iterate elements' },
        ],
      },
      {
        id: generateId(),
        title: 'Async',
        items: [
          { id: generateId(), label: 'Promise', code: 'new Promise((resolve, reject) => {})', description: 'Async operation' },
          { id: generateId(), label: 'Async/Await', code: 'const data = await fetch(url);', description: 'Wait for promise' },
          { id: generateId(), label: 'Try/Catch', code: 'try { await fn() } catch(e) {}', description: 'Error handling' },
          { id: generateId(), label: 'Promise.all', code: 'await Promise.all([p1, p2])', description: 'Parallel promises' },
        ],
      },
      {
        id: generateId(),
        title: 'DOM',
        items: [
          { id: generateId(), label: 'Query', code: "document.querySelector('.cls')", description: 'Select element' },
          { id: generateId(), label: 'Event', code: "el.addEventListener('click', fn)", description: 'Attach event' },
          { id: generateId(), label: 'Create', code: "document.createElement('div')", description: 'Create element' },
          { id: generateId(), label: 'Class', code: "el.classList.add('active')", description: 'Toggle classes' },
        ],
      },
      {
        id: generateId(),
        title: 'ES6+ Features',
        items: [
          { id: generateId(), label: 'Optional Chain', code: 'obj?.nested?.value', description: 'Safe access' },
          { id: generateId(), label: 'Nullish Coal.', code: 'value ?? "default"', description: 'Null fallback' },
          { id: generateId(), label: 'Object Spread', code: 'const obj2 = { ...obj, key: val };', description: 'Merge objects' },
          { id: generateId(), label: 'Modules', code: "import { fn } from './mod';", description: 'ES modules' },
        ],
      },
    ],
  },
  python: {
    title: 'Python Cheatsheet',
    subtitle: 'Essential Python syntax and built-ins',
    sections: [
      {
        id: generateId(),
        title: 'Basics',
        items: [
          { id: generateId(), label: 'Print', code: 'print("Hello World")', description: 'Output to console' },
          { id: generateId(), label: 'Variables', code: 'x = 10\nname = "Alice"', description: 'No type declaration' },
          { id: generateId(), label: 'F-string', code: 'f"Hello {name}"', description: 'String formatting' },
          { id: generateId(), label: 'Input', code: 'name = input("Enter: ")', description: 'Read user input' },
        ],
      },
      {
        id: generateId(),
        title: 'Data Structures',
        items: [
          { id: generateId(), label: 'List', code: 'lst = [1, 2, 3]', description: 'Ordered mutable' },
          { id: generateId(), label: 'Dict', code: '{"key": "value"}', description: 'Key-value pairs' },
          { id: generateId(), label: 'Tuple', code: 't = (1, 2, 3)', description: 'Ordered immutable' },
          { id: generateId(), label: 'Set', code: 's = {1, 2, 3}', description: 'Unique elements' },
          { id: generateId(), label: 'Comprehension', code: '[x**2 for x in range(10)]', description: 'List builder' },
        ],
      },
      {
        id: generateId(),
        title: 'Control Flow',
        items: [
          { id: generateId(), label: 'If/Else', code: 'if x > 0:\n  print("pos")\nelse:\n  print("neg")', description: 'Conditionals' },
          { id: generateId(), label: 'For Loop', code: 'for i in range(10):\n  print(i)', description: 'Iterate' },
          { id: generateId(), label: 'While', code: 'while x > 0:\n  x -= 1', description: 'Condition loop' },
          { id: generateId(), label: 'Try/Except', code: 'try:\n  ...\nexcept Exception as e:\n  print(e)', description: 'Error handling' },
        ],
      },
      {
        id: generateId(),
        title: 'Functions',
        items: [
          { id: generateId(), label: 'Define', code: 'def greet(name):\n  return f"Hi {name}"', description: 'Create function' },
          { id: generateId(), label: 'Lambda', code: 'square = lambda x: x**2', description: 'Anonymous function' },
          { id: generateId(), label: 'Args', code: 'def fn(*args, **kwargs):', description: 'Variable arguments' },
          { id: generateId(), label: 'Decorator', code: '@decorator\ndef fn():', description: 'Wrap function' },
        ],
      },
    ],
  },
};
