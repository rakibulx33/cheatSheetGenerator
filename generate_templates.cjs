const fs = require('fs');
const path = require('path');

const idStr = () => Math.random().toString(36).substring(2, 9);

function createHeading(content, level, color, x, y, width=400, align='center') {
  return { id: idStr(), type: 'heading', content, level, align, color, x, y, width, height: 'auto' };
}
function createText(content, color, fontSize, x, y, width=400, align='center', italic=false) {
  return { id: idStr(), type: 'text', content, align, color, fontSize, bold: false, italic, x, y, width, height: 'auto' };
}
function createCode(language, label, code, bgColor, textColor, x, y, width=330) {
  return { id: idStr(), type: 'code', code, language, label, bgColor, textColor, showLabel: true, x, y, width, height: 'auto' };
}
function createTable(rows, headerBg, headerText, cellBg, cellText, borderColor, x, y, width=330) {
  return { id: idStr(), type: 'table', rows, headerBg, headerText, cellBg, cellText, borderColor, x, y, width, height: 'auto' };
}
function createList(items, color, fontSize, x, y, width=330) {
  return { id: idStr(), type: 'list', items, ordered: false, color, fontSize, x, y, width, height: 'auto' };
}
function createDivider(color, thickness, style, x, y, width=700) {
  return { id: idStr(), type: 'divider', style, color, thickness, x, y, width, height: 20 };
}

const templates = [
  {
    id: 'html-modern', name: 'HTML5 — Modern', desc: 'Clean modern HTML5 with gradient header', 
    docTitle: 'HTML5 Cheatsheet', font: 'Inter', bg: '#0f172a',
    c1: '#5eead4', c2: '#94a3b8', boxBg: '#131a2b', boxTxt: '#e2e8f0', 
    tH: '#1a9f6e', tHt: '#ffffff', tB: '#1c2333', tBorder: '#2d3748',
    col1: 50, col2: 420,
    lang1: 'html', code1: '<!DOCTYPE html>\n<html lang="en">...</html>', title1: 'Doc Structure',
    lang2: 'html', code2: '<form action="/submit">\n  <input required>\n</form>', title2: 'Forms',
    list1: ['<img> - Embed image', '<video> - Embed video', '<audio> - Embed audio'], title3: 'Media',
    rows: [['Tag', 'Use'], ['<header>', 'Top menu'], ['<nav>', 'Nav'], ['<footer>', 'Bottom']], title4: 'Semantic'
  },
  {
    id: 'css-terminal', name: 'CSS3 — Terminal', desc: 'Dark terminal-style CSS reference', 
    docTitle: 'CSS3 Cheatsheet', font: 'JetBrains Mono', bg: '#0a0a0a',
    c1: '#4ade80', c2: '#22c55e', boxBg: '#111111', boxTxt: '#22c55e', 
    tH: '#22c55e', tHt: '#000000', tB: '#111111', tBorder: '#1a3a1a',
    col1: 50, col2: 420,
    lang1: 'css', code1: '.class { ... }\n#id { ... }\ndiv > p { ... }', title1: 'Selectors',
    lang2: 'css', code2: 'display: grid;\ngrid-cols: 3;\ngap: 1rem;', title2: 'CSS Grid',
    list1: ['display: flex;', 'justify-content: center;', 'align-items: center;'], title3: 'Flexbox Quick',
    rows: [['Property', 'Value'], ['margin', 'auto'], ['padding', '1rem'], ['box-sizing', 'border-box']], title4: 'Box Model'
  },
  {
    id: 'mysql-minimal', name: 'MySQL — Minimal', desc: 'Clean minimal MySQL reference', 
    docTitle: 'MySQL Cheatsheet', font: 'Space Grotesk', bg: '#fafaf9',
    c1: '#1c1917', c2: '#57534e', boxBg: '#f5f5f4', boxTxt: '#1c1917', 
    tH: '#1c1917', tHt: '#fafaf9', tB: '#f5f5f4', tBorder: '#d6d3d1',
    col1: 50, col2: 420,
    lang1: 'sql', code1: 'CREATE TABLE users (\n  id INT PRIMARY KEY\n);', title1: 'DDL',
    lang2: 'sql', code2: 'SELECT * FROM t\nWHERE id=1\nORDER BY id;', title2: 'Queries',
    list1: ['COUNT(*) - count rows', 'SUM(x) - total sums', 'GROUP BY id'], title3: 'Aggregates',
    rows: [['Operation', 'Syntax'], ['INSERT', 'INSERT INTO t'], ['UPDATE', 'UPDATE t SET'], ['DELETE', 'DELETE FROM t']], title4: 'CRUD'
  },
  {
    id: 'react-hooks', name: 'React Hooks — Glass', desc: 'Vibrant glassmorphism for React', 
    docTitle: 'React Hooks Cheatsheet', font: 'Outfit', bg: '#0f0a1f',
    c1: '#f472b6', c2: '#2dd4bf', boxBg: '#1e1b4b', boxTxt: '#e2e8f0', 
    tH: '#c084fc', tHt: '#ffffff', tB: '#312e81', tBorder: '#4c1d95',
    col1: 50, col2: 420,
    lang1: 'javascript', code1: 'const [v, setV] = useState(0);', title1: 'useState',
    lang2: 'javascript', code2: 'useEffect(() => {\n  /* logic */\n}, [deps]);', title2: 'useEffect',
    list1: ['Top Level ONLY', 'From Functions ONLY', 'No inside loops'], title3: 'Rules of Hooks',
    rows: [['Hook', 'Returns'], ['useRef', 'Mutable object'], ['useMemo', 'Memoized value'], ['useCallback', 'Memoized fn']], title4: 'Perf Hooks'
  },
  {
    id: 'git-neon', name: 'Git — Neon Cyberpunk', desc: 'Cyberpunk inspired neon dark theme', 
    docTitle: 'Git Commands', font: 'Fira Code', bg: '#0d0e15',
    c1: '#f0abfc', c2: '#38bdf8', boxBg: '#1e1b4b', boxTxt: '#2dd4bf', 
    tH: '#0f172a', tHt: '#38bdf8', tB: '#0d0e15', tBorder: '#1e293b',
    col1: 50, col2: 420,
    lang1: 'bash', code1: 'git init\ngit add .\ngit commit -m "Msg"', title1: 'Basics',
    lang2: 'bash', code2: 'git checkout -b <br>\ngit merge <br>', title2: 'Branching',
    list1: ['git status', 'git log --oneline', 'git diff'], title3: 'Inspection',
    rows: [['Command', 'Action'], ['git push', 'Upload'], ['git pull', 'Download'], ['git fetch', 'Get meta']], title4: 'Remotes'
  },
  {
    id: 'py-elegant', name: 'Python Data — Elegant', desc: 'Serif elegance for data science', 
    docTitle: 'Pandas & NumPy', font: 'Playfair Display', bg: '#faeed1',
    c1: '#9f1239', c2: '#881337', boxBg: '#ffffff', boxTxt: '#1c1917', 
    tH: '#9f1239', tHt: '#ffffff', tB: '#ffffff', tBorder: '#e5e5e5',
    col1: 50, col2: 420,
    lang1: 'python', code1: 'import pandas as pd\ndf = pd.read_csv("foo.csv")', title1: 'Pandas I/O',
    lang2: 'python', code2: 'import numpy as np\narr = np.array([1, 2, 3])', title2: 'NumPy Basics',
    list1: ['df.head()', 'df.describe()', 'df.info()'], title3: 'Exploration',
    rows: [['Stat', 'Call'], ['Mean', 'df.mean()'], ['Std Dev', 'df.std()'], ['Corr', 'df.corr()']], title4: 'Stats'
  },
  {
    id: 'js-cyber', name: 'JS — Cyberpunk', desc: 'High contrast yellow / black theme', 
    docTitle: 'JavaScript ES6+', font: 'Space Grotesk', bg: '#facc15',
    c1: '#000000', c2: '#db2777', boxBg: '#000000', boxTxt: '#facc15', 
    tH: '#db2777', tHt: '#ffffff', tB: '#1f2937', tBorder: '#000000',
    col1: 50, col2: 420,
    lang1: 'javascript', code1: 'const fn = (x) => x * 2;\nlet arr = [...old, 4];', title1: 'Modern Syntax',
    lang2: 'javascript', code2: 'async function load() {\n  await api();\n}', title2: 'Async/Await',
    list1: ['Promise.all()', 'Promise.race()', 'Promise.any()'], title3: 'Promises',
    rows: [['Method', 'Result'], ['map()', 'New array'], ['filter()', 'Sub-array'], ['reduce()', 'Single val']], title4: 'Arrays'
  },
  {
    id: 'ts-solar', name: 'TypeScript — Solarized', desc: 'Soothing solarized dark theme', 
    docTitle: 'TypeScript Essentials', font: 'Fira Code', bg: '#002b36',
    c1: '#2aa198', c2: '#b58900', boxBg: '#073642', boxTxt: '#839496', 
    tH: '#dc322f', tHt: '#fdf6e3', tB: '#002b36', tBorder: '#586e75',
    col1: 50, col2: 420,
    lang1: 'typescript', code1: 'interface User {\n  id: number;\n  name: string;\n}', title1: 'Interfaces',
    lang2: 'typescript', code2: 'type ID = string | number;\ntype Nullable<T> = T | null;', title2: 'Types & Generics',
    list1: ['Partial<T> - All optional', 'Required<T> - No optional', 'Omit<T, K> - Drop keys'], title3: 'Utility Types',
    rows: [['Type', 'Desc'], ['any', 'Disable checking'], ['unknown', 'Safe any'], ['never', 'Unreachable']], title4: 'Special Types'
  },
  {
    id: 'docker-ocean', name: 'Docker — Ocean', desc: 'Deep blue hues for containerization', 
    docTitle: 'Docker Commands', font: 'Outfit', bg: '#023e8a',
    c1: '#48cae4', c2: '#ade8f4', boxBg: '#03045e', boxTxt: '#caf0f8', 
    tH: '#00b4d8', tHt: '#03045e', tB: '#0077b6', tBorder: '#0096c7',
    col1: 50, col2: 420,
    lang1: 'bash', code1: 'docker build -t app:v1 .\ndocker run -p 80:80 app', title1: 'Build & Run',
    lang2: 'bash', code2: 'docker ps\ndocker stop <id>\ndocker rm <id>', title2: 'Manage Containers',
    list1: ['docker images', 'docker rmi <img_id>', 'docker pull <img>'], title3: 'Manage Images',
    rows: [['Compose', 'Cmd'], ['up -d', 'Start daemon'], ['down', 'Stop all'], ['logs -f', 'Tail logs']], title4: 'Docker Compose'
  },
  {
    id: 'k8s-material', name: 'K8s — Material Deep', desc: 'Material design for Kubernetes', 
    docTitle: 'Kubernetes (k8s)', font: 'Roboto Mono', bg: '#1a237e',
    c1: '#64b5f6', c2: '#e3f2fd', boxBg: '#283593', boxTxt: '#ffffff', 
    tH: '#5c6bc0', tHt: '#ffffff', tB: '#3949ab', tBorder: '#7986cb',
    col1: 50, col2: 420,
    lang1: 'bash', code1: 'kubectl get pods\nkubectl describe pod <name>', title1: 'Pods',
    lang2: 'bash', code2: 'kubectl apply -f app.yaml\nkubectl delete -f app.yaml', title2: 'Manifests',
    list1: ['Deployments', 'Services', 'ConfigMaps', 'Secrets'], title3: 'Core Resources',
    rows: [['Tool', 'Usage'], ['minikube', 'Local cluster'], ['helm', 'Package mngr'], ['k9s', 'Terminal UI']], title4: 'Tooling'
  },
  {
    id: 'vim-hacker', name: 'Vim — Hacker', desc: 'True hacker pure black & neon green', 
    docTitle: 'Vim Cheatsheet', font: 'JetBrains Mono', bg: '#000000',
    c1: '#00FF00', c2: '#00aa00', boxBg: '#111111', boxTxt: '#00FF00', 
    tH: '#003300', tHt: '#00FF00', tB: '#0a0a0a', tBorder: '#005500',
    col1: 50, col2: 420,
    lang1: 'text', code1: 'h : left     j : down\nk : up       l : right', title1: 'Movement',
    lang2: 'text', code2: ':w   - save\n:q   - quit\n:wq  - save & quit\n:q!  - force quit', title2: 'File Ops',
    list1: ['i - insert before cursor', 'a - append after cursor', 'o - new line below'], title3: 'Insert Modes',
    rows: [['Key', 'Action'], ['dd', 'Delete line'], ['yy', 'Yank(copy) line'], ['p', 'Paste']], title4: 'Edit Text'
  },
  {
    id: 'linux-classic', name: 'Linux — Ubuntu Classic', desc: 'Ubuntu styled purple & orange', 
    docTitle: 'Linux Shell Cmds', font: 'Inter', bg: '#300a24',
    c1: '#e95420', c2: '#aea79f', boxBg: '#5e2750', boxTxt: '#f3f3f3', 
    tH: '#df382c', tHt: '#ffffff', tB: '#300a24', tBorder: '#aea79f',
    col1: 50, col2: 420,
    lang1: 'bash', code1: 'ls -la\ncd /var/log\npwd', title1: 'Navigation',
    lang2: 'bash', code2: 'cp src dest\nmv old new\nrm -rf /dir', title2: 'File Ops',
    list1: ['chown user:grp file', 'chmod 755 script.sh'], title3: 'Permissions',
    rows: [['Task', 'Cmd'], ['Grep txt', 'grep -r'], ['Find file', 'find . -name'], ['Kill proc', 'kill -9 <id>']], title4: 'Power Tools'
  },
  {
    id: 'tw-vibrant', name: 'Tailwind — Vibrant', desc: 'Super vibrant cyan and fuchsia', 
    docTitle: 'Tailwind CSS', font: 'Poppins', bg: '#0f172a',
    c1: '#06b6d4', c2: '#c026d3', boxBg: '#1e293b', boxTxt: '#f8fafc', 
    tH: '#c026d3', tHt: '#ffffff', tB: '#334155', tBorder: '#475569',
    col1: 50, col2: 420,
    lang1: 'html', code1: '<div class="flex items-center justify-center p-4 m-2">\n</div>', title1: 'Layout & Spacing',
    lang2: 'html', code2: '<h1 class="text-2xl font-bold text-gray-900">\n</h1>', title2: 'Typography',
    list1: ['sm: (min-width: 640px)', 'md: (min-width: 768px)', 'lg: (min-width: 1024px)'], title3: 'Breakpoints',
    rows: [['Class', 'CSS'], ['w-full', 'width: 100%'], ['rounded-lg', 'brdr-rad: 0.5rem'], ['opacity-50', 'opac: 0.5']], title4: 'Utilities'
  },
  {
    id: 'next-mono', name: 'Next.js — Monochrome', desc: 'Minimalist vercel-inspired black & white', 
    docTitle: 'Next.js 14 App Router', font: 'Inter', bg: '#000000',
    c1: '#ffffff', c2: '#a1a1aa', boxBg: '#18181b', boxTxt: '#e4e4e7', 
    tH: '#27272a', tHt: '#ffffff', tB: '#09090b', tBorder: '#3f3f46',
    col1: 50, col2: 420,
    lang1: 'typescript', code1: 'export default function Page() {\n  return <h1>Hello</h1>;\n}', title1: 'Server Components',
    lang2: 'typescript', code2: '"use client"\nimport { useState } from "react";\n\nexport default function Btn() {...}', title2: 'Client Components',
    list1: ['layout.tsx - Shared UI', 'page.tsx - Route UI', 'loading.tsx - Skeleton fallback'], title3: 'File Conventions',
    rows: [['Nav', 'Method'], ['<Link>', 'Client side nav'], ['useRouter()', 'Programmatic'], ['redirect()', 'Server redirect']], title4: 'Navigation'
  },
  {
    id: 'regex-synth', name: 'Regex — Synthwave', desc: 'Synthwave styled hacker vibes', 
    docTitle: 'Regex Quick Guide', font: 'Fira Sans', bg: '#180a2b',
    c1: '#ff79c6', c2: '#8be9fd', boxBg: '#282a36', boxTxt: '#f8f8f2', 
    tH: '#bd93f9', tHt: '#282a36', tB: '#180a2b', tBorder: '#6272a4',
    col1: 50, col2: 420,
    lang1: 'regex', code1: '^  - Start of string\n$  - End of string\n.  - Any character\n\\d - Any digit', title1: 'Anchors & Meta',
    lang2: 'regex', code2: '*  - 0 or more\n+  - 1 or more\n?  - 0 or 1\n{n} - Exactly n', title2: 'Quantifiers',
    list1: ['[abc] - a, b, or c', '[^abc] - not a, b, c', '[a-z] - a to z lowercase'], title3: 'Character Classes',
    rows: [['Look', 'Syntax'], ['Pos Ahead', '(?=...)'], ['Neg Ahead', '(?!...)'], ['Pos Behind', '(?<=...)']], title4: 'Lookarounds'
  },
  {
    id: 'graphql-pastel', name: 'GraphQL — Pastel', desc: 'Smooth pinks and purples', 
    docTitle: 'GraphQL Basics', font: 'Poppins', bg: '#fdf4ff',
    c1: '#db2777', c2: '#9333ea', boxBg: '#ffffff', boxTxt: '#4c1d95', 
    tH: '#fbcfe8', tHt: '#831843', tB: '#fdf4ff', tBorder: '#fbcfe8',
    col1: 50, col2: 420,
    lang1: 'graphql', code1: 'query {\n  user(id: "1") {\n    name\n    email\n  }\n}', title1: 'Queries',
    lang2: 'graphql', code2: 'mutation {\n  addUser(name: "Bob") {\n    id\n  }\n}', title2: 'Mutations',
    list1: ['Type Query { ... }', 'Type Mutation { ... }', 'Type Subscription'], title3: 'Schema Roots',
    rows: [['Type', 'Desc'], ['String', 'UTF-8 string'], ['Int', '32-bit integer'], ['Boolean', 'true / false']], title4: 'Scalars'
  },
  {
    id: 'ux-brutalist', name: 'UX/UI — Brutalist', desc: 'Raw, stark, bold contrasting brutalism', 
    docTitle: 'UX/UI Laws', font: 'Space Grotesk', bg: '#ffffff',
    c1: '#ff0000', c2: '#000000', boxBg: '#000000', boxTxt: '#ffff00', 
    tH: '#ff0000', tHt: '#ffffff', tB: '#ffffff', tBorder: '#000000',
    col1: 50, col2: 420,
    lang1: 'text', code1: 'The time to acquire a target\nis a function of the distance\nto and size of the target.', title1: 'Fitt\'s Law',
    lang2: 'text', code2: 'Users spend most of their time\non OTHER sites. They prefer\nyour site to work the same.', title2: 'Jakob\'s Law',
    list1: ['Aesthetic-Usability Effect', 'Hick\'s Law (Choices)', 'Miller\'s Law (7 items)'], title3: 'Cognitive Biases',
    rows: [['Phase', 'Metric'], ['Attract', 'Traffic'], ['Engage', 'Bounce/Time'], ['Convert', 'Goal CVR']], title4: 'UX Metrics'
  },
  {
    id: 'aws-cloud', name: 'AWS Core — Corporate', desc: 'Corporate AWS colors for cloud arch', 
    docTitle: 'AWS Core Services', font: 'Inter', bg: '#232f3e',
    c1: '#ff9900', c2: '#ffffff', boxBg: '#131921', boxTxt: '#e3e3e3', 
    tH: '#37475a', tHt: '#ffffff', tB: '#232f3e', tBorder: '#4d5c71',
    col1: 50, col2: 420,
    lang1: 'json', code1: '{\n  "Effect": "Allow",\n  "Action": "s3:*",\n  "Resource": "*"\n}', title1: 'IAM Policy',
    lang2: 'bash', code2: 'aws s3 cp file.txt s3://bkt\naws ec2 describe-instances', title2: 'AWS CLI',
    list1: ['EC2: Virt servers', 'S3: Obj storage', 'RDS: Rel databases', 'Lambda: Serverless'], title3: 'Core 4',
    rows: [['Svc', 'Category'], ['VPC', 'Networking'], ['CloudWatch', 'Monitor'], ['Route53', 'DNS']], title4: 'Infrastructure'
  },
  {
    id: 'http-retro', name: 'HTTP Codes — 8-Bit', desc: 'Game-boy/retro styled codes', 
    docTitle: 'HTTP Status Codes', font: 'JetBrains Mono', bg: '#1a202c',
    c1: '#fbbf24', c2: '#a0aec0', boxBg: '#2d3748', boxTxt: '#e2e8f0', 
    tH: '#4a5568', tHt: '#fbbf24', tB: '#2d3748', tBorder: '#718096',
    col1: 50, col2: 420,
    lang1: 'text', code1: '200 OK\n201 Created\n204 No Content', title1: '2xx Success',
    lang2: 'text', code2: '400 Bad Request\n401 Unauthorized\n403 Forbidden\n404 Not Found', title2: '4xx Client Errors',
    list1: ['301 Moved Permanently', '302 Found (Temp)', '304 Not Modified'], title3: '3xx Redirects',
    rows: [['Code', 'Meaning'], ['500', 'Int Server Err'], ['502', 'Bad Gateway'], ['503', 'Svc Unavail']], title4: '5xx Server Err'
  },
  {
    id: 'md-notion', name: 'Markdown — Notion', desc: 'Clean, minimalist documentation style', 
    docTitle: 'Markdown Syntax', font: 'Inter', bg: '#ffffff',
    c1: '#37352f', c2: '#787774', boxBg: '#f7f6f3', boxTxt: '#37352f', 
    tH: '#e8e8e8', tHt: '#37352f', tB: '#ffffff', tBorder: '#e8e8e8',
    col1: 50, col2: 420,
    lang1: 'markdown', code1: '# H1\n## H2\n### H3', title1: 'Headers',
    lang2: 'markdown', code2: '**Bold text**\n*Italic text*\n[Link](url)\n![Image](url)', title2: 'Basics Formatting',
    list1: ['- Unordered 1', '  - Nested', '1. Ordered list'], title3: 'Lists',
    rows: [['Item', 'Syntax'], ['Blockquote', '> text'], ['Code Block', '```'], ['Table', '|Col|Col|']], title4: 'Advanced'
  }
];

let out = `import { type Block, type BlockType, type CheatsheetDoc } from './cheatsheetData';

const idStr = () => Math.random().toString(36).substring(2, 9);

export interface Template {
  id: string;
  name: string;
  description: string;
  doc: CheatsheetDoc;
}

export const extendedTemplates: Template[] = [
`;

for (let config of templates) {
  out += `  {
    id: '${config.id}',
    name: '${config.name}',
    description: '${config.desc}',
    doc: {
      title: '${config.docTitle}',
      font: '${config.font}',
      bgColor: '${config.bg}',
      totalPages: 1,
      blocks: [
        ${JSON.stringify(createHeading(config.docTitle, 1, config.c1, 200, 50, 400, 'center'))},
        ${JSON.stringify(createText(config.desc, config.c2, 14, 200, 110, 400, 'center', true))},
        ${JSON.stringify(createDivider(config.c1, 2, 'solid', 50, 160, 700))},
        
        ${JSON.stringify(createHeading(config.title1, 2, config.c1, config.col1, 200, 330, 'left'))},
        ${JSON.stringify(createCode(config.lang1, config.title1, config.code1, config.boxBg, config.boxTxt, config.col1, 250, 330))},
        
        ${JSON.stringify(createHeading(config.title2, 2, config.c1, config.col2, 200, 330, 'left'))},
        ${JSON.stringify(createCode(config.lang2, config.title2, config.code2, config.boxBg, config.boxTxt, config.col2, 250, 330))},
        
        ${JSON.stringify(createHeading(config.title3, 2, config.c1, config.col1, 500, 330, 'left'))},
        ${JSON.stringify(createList(config.list1, config.c2, 14, config.col1, 550, 330))},
        
        ${JSON.stringify(createHeading(config.title4, 2, config.c1, config.col2, 500, 330, 'left'))},
        ${JSON.stringify(createTable(config.rows, config.tH, config.tHt, config.tB, config.boxTxt, config.tBorder, config.col2, 550, 330))}
      ]
    }
  },
`;
}
out += `];\n`;

const dst = path.join(__dirname, 'src', 'data', 'extendedTemplates.ts');
fs.writeFileSync(dst, out);
console.log('Successfully generated ' + dst);
