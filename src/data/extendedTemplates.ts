import { type Block, type BlockType, type CheatsheetDoc } from './cheatsheetData';

const idStr = () => Math.random().toString(36).substring(2, 9);

export interface Template {
  id: string;
  name: string;
  description: string;
  doc: CheatsheetDoc;
}

export const extendedTemplates: Template[] = [
  {
    id: 'html-modern',
    name: 'HTML5 — Modern',
    description: 'Clean modern HTML5 with gradient header',
    doc: {
      title: 'HTML5 Cheatsheet',
      font: 'Inter',
      bgColor: '#0f172a',
      totalPages: 1,
      blocks: [
        {"id":"1knfy20","type":"heading","content":"HTML5 Cheatsheet","level":1,"align":"center","color":"#5eead4","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"3ilg0y2","type":"text","content":"Clean modern HTML5 with gradient header","align":"center","color":"#94a3b8","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"8eaaoxh","type":"divider","style":"solid","color":"#5eead4","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"sq3bjr3","type":"heading","content":"Doc Structure","level":2,"align":"left","color":"#5eead4","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"l5sk7lq","type":"code","code":"<!DOCTYPE html>\n<html lang=\"en\">...</html>","language":"html","label":"Doc Structure","bgColor":"#131a2b","textColor":"#e2e8f0","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"vdki100","type":"heading","content":"Forms","level":2,"align":"left","color":"#5eead4","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"vixl3gd","type":"code","code":"<form action=\"/submit\">\n  <input required>\n</form>","language":"html","label":"Forms","bgColor":"#131a2b","textColor":"#e2e8f0","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"lmztt5g","type":"heading","content":"Media","level":2,"align":"left","color":"#5eead4","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"xdwxzmh","type":"list","items":["<img> - Embed image","<video> - Embed video","<audio> - Embed audio"],"ordered":false,"color":"#94a3b8","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"pzbljod","type":"heading","content":"Semantic","level":2,"align":"left","color":"#5eead4","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"hnzsvrq","type":"table","rows":[["Tag","Use"],["<header>","Top menu"],["<nav>","Nav"],["<footer>","Bottom"]],"headerBg":"#1a9f6e","headerText":"#ffffff","cellBg":"#1c2333","cellText":"#e2e8f0","borderColor":"#2d3748","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'css-terminal',
    name: 'CSS3 — Terminal',
    description: 'Dark terminal-style CSS reference',
    doc: {
      title: 'CSS3 Cheatsheet',
      font: 'JetBrains Mono',
      bgColor: '#0a0a0a',
      totalPages: 1,
      blocks: [
        {"id":"v8w841t","type":"heading","content":"CSS3 Cheatsheet","level":1,"align":"center","color":"#4ade80","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"qh9sg6n","type":"text","content":"Dark terminal-style CSS reference","align":"center","color":"#22c55e","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"raon55j","type":"divider","style":"solid","color":"#4ade80","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"xxmpsyp","type":"heading","content":"Selectors","level":2,"align":"left","color":"#4ade80","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"71sr6p0","type":"code","code":".class { ... }\n#id { ... }\ndiv > p { ... }","language":"css","label":"Selectors","bgColor":"#111111","textColor":"#22c55e","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"6tu6xu5","type":"heading","content":"CSS Grid","level":2,"align":"left","color":"#4ade80","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"d9b3yup","type":"code","code":"display: grid;\ngrid-cols: 3;\ngap: 1rem;","language":"css","label":"CSS Grid","bgColor":"#111111","textColor":"#22c55e","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"hhg8wg6","type":"heading","content":"Flexbox Quick","level":2,"align":"left","color":"#4ade80","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"zc2vlsa","type":"list","items":["display: flex;","justify-content: center;","align-items: center;"],"ordered":false,"color":"#22c55e","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"8rtweir","type":"heading","content":"Box Model","level":2,"align":"left","color":"#4ade80","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"v372s3c","type":"table","rows":[["Property","Value"],["margin","auto"],["padding","1rem"],["box-sizing","border-box"]],"headerBg":"#22c55e","headerText":"#000000","cellBg":"#111111","cellText":"#22c55e","borderColor":"#1a3a1a","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'mysql-minimal',
    name: 'MySQL — Minimal',
    description: 'Clean minimal MySQL reference',
    doc: {
      title: 'MySQL Cheatsheet',
      font: 'Space Grotesk',
      bgColor: '#fafaf9',
      totalPages: 1,
      blocks: [
        {"id":"hzv4bo3","type":"heading","content":"MySQL Cheatsheet","level":1,"align":"center","color":"#1c1917","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"hp7ztip","type":"text","content":"Clean minimal MySQL reference","align":"center","color":"#57534e","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"2xf3wv3","type":"divider","style":"solid","color":"#1c1917","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"evgz44h","type":"heading","content":"DDL","level":2,"align":"left","color":"#1c1917","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"1xok57f","type":"code","code":"CREATE TABLE users (\n  id INT PRIMARY KEY\n);","language":"sql","label":"DDL","bgColor":"#f5f5f4","textColor":"#1c1917","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"c7w9ncq","type":"heading","content":"Queries","level":2,"align":"left","color":"#1c1917","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"uem84vx","type":"code","code":"SELECT * FROM t\nWHERE id=1\nORDER BY id;","language":"sql","label":"Queries","bgColor":"#f5f5f4","textColor":"#1c1917","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"qcltuhi","type":"heading","content":"Aggregates","level":2,"align":"left","color":"#1c1917","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"b9h7qls","type":"list","items":["COUNT(*) - count rows","SUM(x) - total sums","GROUP BY id"],"ordered":false,"color":"#57534e","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"3mdhk8b","type":"heading","content":"CRUD","level":2,"align":"left","color":"#1c1917","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"zd7dmar","type":"table","rows":[["Operation","Syntax"],["INSERT","INSERT INTO t"],["UPDATE","UPDATE t SET"],["DELETE","DELETE FROM t"]],"headerBg":"#1c1917","headerText":"#fafaf9","cellBg":"#f5f5f4","cellText":"#1c1917","borderColor":"#d6d3d1","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'react-hooks',
    name: 'React Hooks — Glass',
    description: 'Vibrant glassmorphism for React',
    doc: {
      title: 'React Hooks Cheatsheet',
      font: 'Outfit',
      bgColor: '#0f0a1f',
      totalPages: 1,
      blocks: [
        {"id":"r8x8o5x","type":"heading","content":"React Hooks Cheatsheet","level":1,"align":"center","color":"#f472b6","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"p8pylzh","type":"text","content":"Vibrant glassmorphism for React","align":"center","color":"#2dd4bf","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"xhrvfpx","type":"divider","style":"solid","color":"#f472b6","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"9jibjgi","type":"heading","content":"useState","level":2,"align":"left","color":"#f472b6","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"37284vk","type":"code","code":"const [v, setV] = useState(0);","language":"javascript","label":"useState","bgColor":"#1e1b4b","textColor":"#e2e8f0","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"lwr13mv","type":"heading","content":"useEffect","level":2,"align":"left","color":"#f472b6","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"i5w20ps","type":"code","code":"useEffect(() => {\n  /* logic */\n}, [deps]);","language":"javascript","label":"useEffect","bgColor":"#1e1b4b","textColor":"#e2e8f0","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"evycb4m","type":"heading","content":"Rules of Hooks","level":2,"align":"left","color":"#f472b6","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"ezsvquz","type":"list","items":["Top Level ONLY","From Functions ONLY","No inside loops"],"ordered":false,"color":"#2dd4bf","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"mjfums5","type":"heading","content":"Perf Hooks","level":2,"align":"left","color":"#f472b6","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"izqxwy8","type":"table","rows":[["Hook","Returns"],["useRef","Mutable object"],["useMemo","Memoized value"],["useCallback","Memoized fn"]],"headerBg":"#c084fc","headerText":"#ffffff","cellBg":"#312e81","cellText":"#e2e8f0","borderColor":"#4c1d95","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'git-neon',
    name: 'Git — Neon Cyberpunk',
    description: 'Cyberpunk inspired neon dark theme',
    doc: {
      title: 'Git Commands',
      font: 'Fira Code',
      bgColor: '#0d0e15',
      totalPages: 1,
      blocks: [
        {"id":"7zrag5m","type":"heading","content":"Git Commands","level":1,"align":"center","color":"#f0abfc","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"45ohbgk","type":"text","content":"Cyberpunk inspired neon dark theme","align":"center","color":"#38bdf8","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"2gawwz7","type":"divider","style":"solid","color":"#f0abfc","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"jqbzm4e","type":"heading","content":"Basics","level":2,"align":"left","color":"#f0abfc","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"0o7p443","type":"code","code":"git init\ngit add .\ngit commit -m \"Msg\"","language":"bash","label":"Basics","bgColor":"#1e1b4b","textColor":"#2dd4bf","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"27iaq3q","type":"heading","content":"Branching","level":2,"align":"left","color":"#f0abfc","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"3072dkq","type":"code","code":"git checkout -b <br>\ngit merge <br>","language":"bash","label":"Branching","bgColor":"#1e1b4b","textColor":"#2dd4bf","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"5yq943e","type":"heading","content":"Inspection","level":2,"align":"left","color":"#f0abfc","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"80e9rh8","type":"list","items":["git status","git log --oneline","git diff"],"ordered":false,"color":"#38bdf8","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"440e5wj","type":"heading","content":"Remotes","level":2,"align":"left","color":"#f0abfc","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"rosclwn","type":"table","rows":[["Command","Action"],["git push","Upload"],["git pull","Download"],["git fetch","Get meta"]],"headerBg":"#0f172a","headerText":"#38bdf8","cellBg":"#0d0e15","cellText":"#2dd4bf","borderColor":"#1e293b","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'py-elegant',
    name: 'Python Data — Elegant',
    description: 'Serif elegance for data science',
    doc: {
      title: 'Pandas & NumPy',
      font: 'Playfair Display',
      bgColor: '#faeed1',
      totalPages: 1,
      blocks: [
        {"id":"h3ltrvn","type":"heading","content":"Pandas & NumPy","level":1,"align":"center","color":"#9f1239","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"zbjcp3z","type":"text","content":"Serif elegance for data science","align":"center","color":"#881337","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"07kzscl","type":"divider","style":"solid","color":"#9f1239","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"eusl8ma","type":"heading","content":"Pandas I/O","level":2,"align":"left","color":"#9f1239","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"e644gi2","type":"code","code":"import pandas as pd\ndf = pd.read_csv(\"foo.csv\")","language":"python","label":"Pandas I/O","bgColor":"#ffffff","textColor":"#1c1917","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"8tqda1g","type":"heading","content":"NumPy Basics","level":2,"align":"left","color":"#9f1239","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"5gn9c9k","type":"code","code":"import numpy as np\narr = np.array([1, 2, 3])","language":"python","label":"NumPy Basics","bgColor":"#ffffff","textColor":"#1c1917","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"dkxjza5","type":"heading","content":"Exploration","level":2,"align":"left","color":"#9f1239","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"aohfmeh","type":"list","items":["df.head()","df.describe()","df.info()"],"ordered":false,"color":"#881337","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"gflkj52","type":"heading","content":"Stats","level":2,"align":"left","color":"#9f1239","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"zba4dha","type":"table","rows":[["Stat","Call"],["Mean","df.mean()"],["Std Dev","df.std()"],["Corr","df.corr()"]],"headerBg":"#9f1239","headerText":"#ffffff","cellBg":"#ffffff","cellText":"#1c1917","borderColor":"#e5e5e5","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'js-cyber',
    name: 'JS — Cyberpunk',
    description: 'High contrast yellow / black theme',
    doc: {
      title: 'JavaScript ES6+',
      font: 'Space Grotesk',
      bgColor: '#facc15',
      totalPages: 1,
      blocks: [
        {"id":"kjoq1lm","type":"heading","content":"JavaScript ES6+","level":1,"align":"center","color":"#000000","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"7vkdrcz","type":"text","content":"High contrast yellow / black theme","align":"center","color":"#db2777","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"vb65wqk","type":"divider","style":"solid","color":"#000000","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"g2puufg","type":"heading","content":"Modern Syntax","level":2,"align":"left","color":"#000000","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"6z6229c","type":"code","code":"const fn = (x) => x * 2;\nlet arr = [...old, 4];","language":"javascript","label":"Modern Syntax","bgColor":"#000000","textColor":"#facc15","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"2e6kn1q","type":"heading","content":"Async/Await","level":2,"align":"left","color":"#000000","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"tglp3nh","type":"code","code":"async function load() {\n  await api();\n}","language":"javascript","label":"Async/Await","bgColor":"#000000","textColor":"#facc15","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"si3uapa","type":"heading","content":"Promises","level":2,"align":"left","color":"#000000","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"530ak2i","type":"list","items":["Promise.all()","Promise.race()","Promise.any()"],"ordered":false,"color":"#db2777","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"kuygzph","type":"heading","content":"Arrays","level":2,"align":"left","color":"#000000","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"cm20otb","type":"table","rows":[["Method","Result"],["map()","New array"],["filter()","Sub-array"],["reduce()","Single val"]],"headerBg":"#db2777","headerText":"#ffffff","cellBg":"#1f2937","cellText":"#facc15","borderColor":"#000000","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'ts-solar',
    name: 'TypeScript — Solarized',
    description: 'Soothing solarized dark theme',
    doc: {
      title: 'TypeScript Essentials',
      font: 'Fira Code',
      bgColor: '#002b36',
      totalPages: 1,
      blocks: [
        {"id":"lnb7lv3","type":"heading","content":"TypeScript Essentials","level":1,"align":"center","color":"#2aa198","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"lcq7xuv","type":"text","content":"Soothing solarized dark theme","align":"center","color":"#b58900","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"p9kspbv","type":"divider","style":"solid","color":"#2aa198","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"vd3yuk8","type":"heading","content":"Interfaces","level":2,"align":"left","color":"#2aa198","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"vyrptpw","type":"code","code":"interface User {\n  id: number;\n  name: string;\n}","language":"typescript","label":"Interfaces","bgColor":"#073642","textColor":"#839496","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"910uskl","type":"heading","content":"Types & Generics","level":2,"align":"left","color":"#2aa198","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"wuoptpe","type":"code","code":"type ID = string | number;\ntype Nullable<T> = T | null;","language":"typescript","label":"Types & Generics","bgColor":"#073642","textColor":"#839496","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"56xpk6i","type":"heading","content":"Utility Types","level":2,"align":"left","color":"#2aa198","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"lkswqnx","type":"list","items":["Partial<T> - All optional","Required<T> - No optional","Omit<T, K> - Drop keys"],"ordered":false,"color":"#b58900","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"lmae2oz","type":"heading","content":"Special Types","level":2,"align":"left","color":"#2aa198","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"r9dkggp","type":"table","rows":[["Type","Desc"],["any","Disable checking"],["unknown","Safe any"],["never","Unreachable"]],"headerBg":"#dc322f","headerText":"#fdf6e3","cellBg":"#002b36","cellText":"#839496","borderColor":"#586e75","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'docker-ocean',
    name: 'Docker — Ocean',
    description: 'Deep blue hues for containerization',
    doc: {
      title: 'Docker Commands',
      font: 'Outfit',
      bgColor: '#023e8a',
      totalPages: 1,
      blocks: [
        {"id":"82j4ych","type":"heading","content":"Docker Commands","level":1,"align":"center","color":"#48cae4","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"3sm32gv","type":"text","content":"Deep blue hues for containerization","align":"center","color":"#ade8f4","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"aw1pjxh","type":"divider","style":"solid","color":"#48cae4","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"jd2yx2w","type":"heading","content":"Build & Run","level":2,"align":"left","color":"#48cae4","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"fmv6w48","type":"code","code":"docker build -t app:v1 .\ndocker run -p 80:80 app","language":"bash","label":"Build & Run","bgColor":"#03045e","textColor":"#caf0f8","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"txhun8o","type":"heading","content":"Manage Containers","level":2,"align":"left","color":"#48cae4","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"3k9d7if","type":"code","code":"docker ps\ndocker stop <id>\ndocker rm <id>","language":"bash","label":"Manage Containers","bgColor":"#03045e","textColor":"#caf0f8","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"cxqgw98","type":"heading","content":"Manage Images","level":2,"align":"left","color":"#48cae4","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"8xnvvrm","type":"list","items":["docker images","docker rmi <img_id>","docker pull <img>"],"ordered":false,"color":"#ade8f4","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"u75nv9f","type":"heading","content":"Docker Compose","level":2,"align":"left","color":"#48cae4","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"sx7vt34","type":"table","rows":[["Compose","Cmd"],["up -d","Start daemon"],["down","Stop all"],["logs -f","Tail logs"]],"headerBg":"#00b4d8","headerText":"#03045e","cellBg":"#0077b6","cellText":"#caf0f8","borderColor":"#0096c7","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'k8s-material',
    name: 'K8s — Material Deep',
    description: 'Material design for Kubernetes',
    doc: {
      title: 'Kubernetes (k8s)',
      font: 'Roboto Mono',
      bgColor: '#1a237e',
      totalPages: 1,
      blocks: [
        {"id":"9aexajl","type":"heading","content":"Kubernetes (k8s)","level":1,"align":"center","color":"#64b5f6","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"o8w25nb","type":"text","content":"Material design for Kubernetes","align":"center","color":"#e3f2fd","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"nmwiues","type":"divider","style":"solid","color":"#64b5f6","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"nd1upri","type":"heading","content":"Pods","level":2,"align":"left","color":"#64b5f6","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"0pd1vqz","type":"code","code":"kubectl get pods\nkubectl describe pod <name>","language":"bash","label":"Pods","bgColor":"#283593","textColor":"#ffffff","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"immlpfn","type":"heading","content":"Manifests","level":2,"align":"left","color":"#64b5f6","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"mkmq2m8","type":"code","code":"kubectl apply -f app.yaml\nkubectl delete -f app.yaml","language":"bash","label":"Manifests","bgColor":"#283593","textColor":"#ffffff","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"ldbla2f","type":"heading","content":"Core Resources","level":2,"align":"left","color":"#64b5f6","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"hiyok10","type":"list","items":["Deployments","Services","ConfigMaps","Secrets"],"ordered":false,"color":"#e3f2fd","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"7hu604b","type":"heading","content":"Tooling","level":2,"align":"left","color":"#64b5f6","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"d92byh8","type":"table","rows":[["Tool","Usage"],["minikube","Local cluster"],["helm","Package mngr"],["k9s","Terminal UI"]],"headerBg":"#5c6bc0","headerText":"#ffffff","cellBg":"#3949ab","cellText":"#ffffff","borderColor":"#7986cb","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'vim-hacker',
    name: 'Vim — Hacker',
    description: 'True hacker pure black & neon green',
    doc: {
      title: 'Vim Cheatsheet',
      font: 'JetBrains Mono',
      bgColor: '#000000',
      totalPages: 1,
      blocks: [
        {"id":"9lrs278","type":"heading","content":"Vim Cheatsheet","level":1,"align":"center","color":"#00FF00","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"aaw4lxa","type":"text","content":"True hacker pure black & neon green","align":"center","color":"#00aa00","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"aw5vaax","type":"divider","style":"solid","color":"#00FF00","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"p3p0hyv","type":"heading","content":"Movement","level":2,"align":"left","color":"#00FF00","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"bh89d5l","type":"code","code":"h : left     j : down\nk : up       l : right","language":"text","label":"Movement","bgColor":"#111111","textColor":"#00FF00","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"thv6edr","type":"heading","content":"File Ops","level":2,"align":"left","color":"#00FF00","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"ihe3824","type":"code","code":":w   - save\n:q   - quit\n:wq  - save & quit\n:q!  - force quit","language":"text","label":"File Ops","bgColor":"#111111","textColor":"#00FF00","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"44ldv73","type":"heading","content":"Insert Modes","level":2,"align":"left","color":"#00FF00","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"x24gq9j","type":"list","items":["i - insert before cursor","a - append after cursor","o - new line below"],"ordered":false,"color":"#00aa00","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"7b96yjp","type":"heading","content":"Edit Text","level":2,"align":"left","color":"#00FF00","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"601oskv","type":"table","rows":[["Key","Action"],["dd","Delete line"],["yy","Yank(copy) line"],["p","Paste"]],"headerBg":"#003300","headerText":"#00FF00","cellBg":"#0a0a0a","cellText":"#00FF00","borderColor":"#005500","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'linux-classic',
    name: 'Linux — Ubuntu Classic',
    description: 'Ubuntu styled purple & orange',
    doc: {
      title: 'Linux Shell Cmds',
      font: 'Inter',
      bgColor: '#300a24',
      totalPages: 1,
      blocks: [
        {"id":"kkn8qdp","type":"heading","content":"Linux Shell Cmds","level":1,"align":"center","color":"#e95420","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"xw4yyut","type":"text","content":"Ubuntu styled purple & orange","align":"center","color":"#aea79f","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"gj6tmfs","type":"divider","style":"solid","color":"#e95420","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"h8r96d1","type":"heading","content":"Navigation","level":2,"align":"left","color":"#e95420","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"ot14498","type":"code","code":"ls -la\ncd /var/log\npwd","language":"bash","label":"Navigation","bgColor":"#5e2750","textColor":"#f3f3f3","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"bzqaeap","type":"heading","content":"File Ops","level":2,"align":"left","color":"#e95420","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"xzrz8us","type":"code","code":"cp src dest\nmv old new\nrm -rf /dir","language":"bash","label":"File Ops","bgColor":"#5e2750","textColor":"#f3f3f3","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"fst8w2l","type":"heading","content":"Permissions","level":2,"align":"left","color":"#e95420","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"jsc6tih","type":"list","items":["chown user:grp file","chmod 755 script.sh"],"ordered":false,"color":"#aea79f","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"sv0v7k2","type":"heading","content":"Power Tools","level":2,"align":"left","color":"#e95420","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"q931nik","type":"table","rows":[["Task","Cmd"],["Grep txt","grep -r"],["Find file","find . -name"],["Kill proc","kill -9 <id>"]],"headerBg":"#df382c","headerText":"#ffffff","cellBg":"#300a24","cellText":"#f3f3f3","borderColor":"#aea79f","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'tw-vibrant',
    name: 'Tailwind — Vibrant',
    description: 'Super vibrant cyan and fuchsia',
    doc: {
      title: 'Tailwind CSS',
      font: 'Poppins',
      bgColor: '#0f172a',
      totalPages: 1,
      blocks: [
        {"id":"mavjrow","type":"heading","content":"Tailwind CSS","level":1,"align":"center","color":"#06b6d4","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"5ge5h4h","type":"text","content":"Super vibrant cyan and fuchsia","align":"center","color":"#c026d3","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"lzjk1s0","type":"divider","style":"solid","color":"#06b6d4","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"d6e5ex2","type":"heading","content":"Layout & Spacing","level":2,"align":"left","color":"#06b6d4","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"zmb51a0","type":"code","code":"<div class=\"flex items-center justify-center p-4 m-2\">\n</div>","language":"html","label":"Layout & Spacing","bgColor":"#1e293b","textColor":"#f8fafc","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"dqu49my","type":"heading","content":"Typography","level":2,"align":"left","color":"#06b6d4","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"cxchrlg","type":"code","code":"<h1 class=\"text-2xl font-bold text-gray-900\">\n</h1>","language":"html","label":"Typography","bgColor":"#1e293b","textColor":"#f8fafc","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"gpo3qji","type":"heading","content":"Breakpoints","level":2,"align":"left","color":"#06b6d4","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"wz3yl68","type":"list","items":["sm: (min-width: 640px)","md: (min-width: 768px)","lg: (min-width: 1024px)"],"ordered":false,"color":"#c026d3","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"k067ien","type":"heading","content":"Utilities","level":2,"align":"left","color":"#06b6d4","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"33s4hdy","type":"table","rows":[["Class","CSS"],["w-full","width: 100%"],["rounded-lg","brdr-rad: 0.5rem"],["opacity-50","opac: 0.5"]],"headerBg":"#c026d3","headerText":"#ffffff","cellBg":"#334155","cellText":"#f8fafc","borderColor":"#475569","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'next-mono',
    name: 'Next.js — Monochrome',
    description: 'Minimalist vercel-inspired black & white',
    doc: {
      title: 'Next.js 14 App Router',
      font: 'Inter',
      bgColor: '#000000',
      totalPages: 1,
      blocks: [
        {"id":"ifxqx19","type":"heading","content":"Next.js 14 App Router","level":1,"align":"center","color":"#ffffff","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"x54kxd9","type":"text","content":"Minimalist vercel-inspired black & white","align":"center","color":"#a1a1aa","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"qup980l","type":"divider","style":"solid","color":"#ffffff","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"762wiw4","type":"heading","content":"Server Components","level":2,"align":"left","color":"#ffffff","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"q6lv2tf","type":"code","code":"export default function Page() {\n  return <h1>Hello</h1>;\n}","language":"typescript","label":"Server Components","bgColor":"#18181b","textColor":"#e4e4e7","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"7sgep74","type":"heading","content":"Client Components","level":2,"align":"left","color":"#ffffff","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"a6odc3p","type":"code","code":"\"use client\"\nimport { useState } from \"react\";\n\nexport default function Btn() {...}","language":"typescript","label":"Client Components","bgColor":"#18181b","textColor":"#e4e4e7","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"5db9u9w","type":"heading","content":"File Conventions","level":2,"align":"left","color":"#ffffff","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"q0w2ujo","type":"list","items":["layout.tsx - Shared UI","page.tsx - Route UI","loading.tsx - Skeleton fallback"],"ordered":false,"color":"#a1a1aa","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"jjumgcr","type":"heading","content":"Navigation","level":2,"align":"left","color":"#ffffff","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"ydqqecg","type":"table","rows":[["Nav","Method"],["<Link>","Client side nav"],["useRouter()","Programmatic"],["redirect()","Server redirect"]],"headerBg":"#27272a","headerText":"#ffffff","cellBg":"#09090b","cellText":"#e4e4e7","borderColor":"#3f3f46","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'regex-synth',
    name: 'Regex — Synthwave',
    description: 'Synthwave styled hacker vibes',
    doc: {
      title: 'Regex Quick Guide',
      font: 'Fira Sans',
      bgColor: '#180a2b',
      totalPages: 1,
      blocks: [
        {"id":"c7pmrsn","type":"heading","content":"Regex Quick Guide","level":1,"align":"center","color":"#ff79c6","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"c35z35l","type":"text","content":"Synthwave styled hacker vibes","align":"center","color":"#8be9fd","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"p5h7av0","type":"divider","style":"solid","color":"#ff79c6","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"2d4n894","type":"heading","content":"Anchors & Meta","level":2,"align":"left","color":"#ff79c6","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"twwxull","type":"code","code":"^  - Start of string\n$  - End of string\n.  - Any character\n\\d - Any digit","language":"regex","label":"Anchors & Meta","bgColor":"#282a36","textColor":"#f8f8f2","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"qtptpn6","type":"heading","content":"Quantifiers","level":2,"align":"left","color":"#ff79c6","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"5wdfone","type":"code","code":"*  - 0 or more\n+  - 1 or more\n?  - 0 or 1\n{n} - Exactly n","language":"regex","label":"Quantifiers","bgColor":"#282a36","textColor":"#f8f8f2","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"09agaq0","type":"heading","content":"Character Classes","level":2,"align":"left","color":"#ff79c6","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"unuzqfa","type":"list","items":["[abc] - a, b, or c","[^abc] - not a, b, c","[a-z] - a to z lowercase"],"ordered":false,"color":"#8be9fd","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"rh65io1","type":"heading","content":"Lookarounds","level":2,"align":"left","color":"#ff79c6","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"jasxbrg","type":"table","rows":[["Look","Syntax"],["Pos Ahead","(?=...)"],["Neg Ahead","(?!...)"],["Pos Behind","(?<=...)"]],"headerBg":"#bd93f9","headerText":"#282a36","cellBg":"#180a2b","cellText":"#f8f8f2","borderColor":"#6272a4","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'graphql-pastel',
    name: 'GraphQL — Pastel',
    description: 'Smooth pinks and purples',
    doc: {
      title: 'GraphQL Basics',
      font: 'Poppins',
      bgColor: '#fdf4ff',
      totalPages: 1,
      blocks: [
        {"id":"5jv1fgo","type":"heading","content":"GraphQL Basics","level":1,"align":"center","color":"#db2777","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"gs3p7c3","type":"text","content":"Smooth pinks and purples","align":"center","color":"#9333ea","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"7qm7qr1","type":"divider","style":"solid","color":"#db2777","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"4oiazmc","type":"heading","content":"Queries","level":2,"align":"left","color":"#db2777","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"ym073hj","type":"code","code":"query {\n  user(id: \"1\") {\n    name\n    email\n  }\n}","language":"graphql","label":"Queries","bgColor":"#ffffff","textColor":"#4c1d95","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"pqegto6","type":"heading","content":"Mutations","level":2,"align":"left","color":"#db2777","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"b5mwame","type":"code","code":"mutation {\n  addUser(name: \"Bob\") {\n    id\n  }\n}","language":"graphql","label":"Mutations","bgColor":"#ffffff","textColor":"#4c1d95","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"h0oyw47","type":"heading","content":"Schema Roots","level":2,"align":"left","color":"#db2777","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"54cd2o8","type":"list","items":["Type Query { ... }","Type Mutation { ... }","Type Subscription"],"ordered":false,"color":"#9333ea","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"nx26mop","type":"heading","content":"Scalars","level":2,"align":"left","color":"#db2777","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"cqqfwtd","type":"table","rows":[["Type","Desc"],["String","UTF-8 string"],["Int","32-bit integer"],["Boolean","true / false"]],"headerBg":"#fbcfe8","headerText":"#831843","cellBg":"#fdf4ff","cellText":"#4c1d95","borderColor":"#fbcfe8","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'ux-brutalist',
    name: 'UX/UI — Brutalist',
    description: 'Raw, stark, bold contrasting brutalism',
    doc: {
      title: 'UX/UI Laws',
      font: 'Space Grotesk',
      bgColor: '#ffffff',
      totalPages: 1,
      blocks: [
        {"id":"5k5p57y","type":"heading","content":"UX/UI Laws","level":1,"align":"center","color":"#ff0000","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"k3gmp1b","type":"text","content":"Raw, stark, bold contrasting brutalism","align":"center","color":"#000000","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"8l6mgiw","type":"divider","style":"solid","color":"#ff0000","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"nycjxtr","type":"heading","content":"Fitt's Law","level":2,"align":"left","color":"#ff0000","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"hg8vicj","type":"code","code":"The time to acquire a target\nis a function of the distance\nto and size of the target.","language":"text","label":"Fitt's Law","bgColor":"#000000","textColor":"#ffff00","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"lkh3ggl","type":"heading","content":"Jakob's Law","level":2,"align":"left","color":"#ff0000","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"jrv81f2","type":"code","code":"Users spend most of their time\non OTHER sites. They prefer\nyour site to work the same.","language":"text","label":"Jakob's Law","bgColor":"#000000","textColor":"#ffff00","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"u53io5o","type":"heading","content":"Cognitive Biases","level":2,"align":"left","color":"#ff0000","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"0jnbsff","type":"list","items":["Aesthetic-Usability Effect","Hick's Law (Choices)","Miller's Law (7 items)"],"ordered":false,"color":"#000000","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"sd8slqe","type":"heading","content":"UX Metrics","level":2,"align":"left","color":"#ff0000","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"x1syzwr","type":"table","rows":[["Phase","Metric"],["Attract","Traffic"],["Engage","Bounce/Time"],["Convert","Goal CVR"]],"headerBg":"#ff0000","headerText":"#ffffff","cellBg":"#ffffff","cellText":"#ffff00","borderColor":"#000000","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'aws-cloud',
    name: 'AWS Core — Corporate',
    description: 'Corporate AWS colors for cloud arch',
    doc: {
      title: 'AWS Core Services',
      font: 'Inter',
      bgColor: '#232f3e',
      totalPages: 1,
      blocks: [
        {"id":"pw7ik1m","type":"heading","content":"AWS Core Services","level":1,"align":"center","color":"#ff9900","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"x36gxb7","type":"text","content":"Corporate AWS colors for cloud arch","align":"center","color":"#ffffff","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"9zuuffw","type":"divider","style":"solid","color":"#ff9900","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"oa2117q","type":"heading","content":"IAM Policy","level":2,"align":"left","color":"#ff9900","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"10wy585","type":"code","code":"{\n  \"Effect\": \"Allow\",\n  \"Action\": \"s3:*\",\n  \"Resource\": \"*\"\n}","language":"json","label":"IAM Policy","bgColor":"#131921","textColor":"#e3e3e3","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"c0sohdg","type":"heading","content":"AWS CLI","level":2,"align":"left","color":"#ff9900","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"vspahii","type":"code","code":"aws s3 cp file.txt s3://bkt\naws ec2 describe-instances","language":"bash","label":"AWS CLI","bgColor":"#131921","textColor":"#e3e3e3","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"v0zp80k","type":"heading","content":"Core 4","level":2,"align":"left","color":"#ff9900","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"n6wpxi2","type":"list","items":["EC2: Virt servers","S3: Obj storage","RDS: Rel databases","Lambda: Serverless"],"ordered":false,"color":"#ffffff","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"kga686n","type":"heading","content":"Infrastructure","level":2,"align":"left","color":"#ff9900","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"k1nxf9e","type":"table","rows":[["Svc","Category"],["VPC","Networking"],["CloudWatch","Monitor"],["Route53","DNS"]],"headerBg":"#37475a","headerText":"#ffffff","cellBg":"#232f3e","cellText":"#e3e3e3","borderColor":"#4d5c71","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'http-retro',
    name: 'HTTP Codes — 8-Bit',
    description: 'Game-boy/retro styled codes',
    doc: {
      title: 'HTTP Status Codes',
      font: 'JetBrains Mono',
      bgColor: '#1a202c',
      totalPages: 1,
      blocks: [
        {"id":"8jfxmi7","type":"heading","content":"HTTP Status Codes","level":1,"align":"center","color":"#fbbf24","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"nuiqjms","type":"text","content":"Game-boy/retro styled codes","align":"center","color":"#a0aec0","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"naiuxjy","type":"divider","style":"solid","color":"#fbbf24","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"qurpp05","type":"heading","content":"2xx Success","level":2,"align":"left","color":"#fbbf24","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"vrnmwsv","type":"code","code":"200 OK\n201 Created\n204 No Content","language":"text","label":"2xx Success","bgColor":"#2d3748","textColor":"#e2e8f0","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"wjgihy6","type":"heading","content":"4xx Client Errors","level":2,"align":"left","color":"#fbbf24","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"b9bj4w4","type":"code","code":"400 Bad Request\n401 Unauthorized\n403 Forbidden\n404 Not Found","language":"text","label":"4xx Client Errors","bgColor":"#2d3748","textColor":"#e2e8f0","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"gynmry4","type":"heading","content":"3xx Redirects","level":2,"align":"left","color":"#fbbf24","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"hf6f89n","type":"list","items":["301 Moved Permanently","302 Found (Temp)","304 Not Modified"],"ordered":false,"color":"#a0aec0","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"w0xr99j","type":"heading","content":"5xx Server Err","level":2,"align":"left","color":"#fbbf24","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"b4o61h5","type":"table","rows":[["Code","Meaning"],["500","Int Server Err"],["502","Bad Gateway"],["503","Svc Unavail"]],"headerBg":"#4a5568","headerText":"#fbbf24","cellBg":"#2d3748","cellText":"#e2e8f0","borderColor":"#718096","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
  {
    id: 'md-notion',
    name: 'Markdown — Notion',
    description: 'Clean, minimalist documentation style',
    doc: {
      title: 'Markdown Syntax',
      font: 'Inter',
      bgColor: '#ffffff',
      totalPages: 1,
      blocks: [
        {"id":"tvfiokp","type":"heading","content":"Markdown Syntax","level":1,"align":"center","color":"#37352f","x":200,"y":50,"width":400,"height":"auto"},
        {"id":"oglb11e","type":"text","content":"Clean, minimalist documentation style","align":"center","color":"#787774","fontSize":14,"bold":false,"italic":true,"x":200,"y":110,"width":400,"height":"auto"},
        {"id":"krmdehl","type":"divider","style":"solid","color":"#37352f","thickness":2,"x":50,"y":160,"width":700,"height":20},
        
        {"id":"riwyg44","type":"heading","content":"Headers","level":2,"align":"left","color":"#37352f","x":50,"y":200,"width":330,"height":"auto"},
        {"id":"xq9fvde","type":"code","code":"# H1\n## H2\n### H3","language":"markdown","label":"Headers","bgColor":"#f7f6f3","textColor":"#37352f","showLabel":true,"x":50,"y":250,"width":330,"height":"auto"},
        
        {"id":"zdy74y1","type":"heading","content":"Basics Formatting","level":2,"align":"left","color":"#37352f","x":420,"y":200,"width":330,"height":"auto"},
        {"id":"yycdcav","type":"code","code":"**Bold text**\n*Italic text*\n[Link](url)\n![Image](url)","language":"markdown","label":"Basics Formatting","bgColor":"#f7f6f3","textColor":"#37352f","showLabel":true,"x":420,"y":250,"width":330,"height":"auto"},
        
        {"id":"zrcnk0u","type":"heading","content":"Lists","level":2,"align":"left","color":"#37352f","x":50,"y":500,"width":330,"height":"auto"},
        {"id":"fzsyk9p","type":"list","items":["- Unordered 1","  - Nested","1. Ordered list"],"ordered":false,"color":"#787774","fontSize":14,"x":50,"y":550,"width":330,"height":"auto"},
        
        {"id":"u26gx8l","type":"heading","content":"Advanced","level":2,"align":"left","color":"#37352f","x":420,"y":500,"width":330,"height":"auto"},
        {"id":"mgmp8ti","type":"table","rows":[["Item","Syntax"],["Blockquote","> text"],["Code Block","```"],["Table","|Col|Col|"]],"headerBg":"#e8e8e8","headerText":"#37352f","cellBg":"#ffffff","cellText":"#37352f","borderColor":"#e8e8e8","x":420,"y":550,"width":330,"height":"auto"}
      ]
    }
  },
];
