const fs = require('fs');
const path = require('path');

const files = [
  '/src/components/AboutMePage.tsx',
  '/src/components/MaxReedPortfolio.tsx',
  '/src/components/ProjectPage.tsx'
];

files.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/17\.1203L19\.3755/g, '17.1203 L19.3755');
    content = content.replace(/fill="#0076FE"/g, 'fill="#0066cc"');
    fs.writeFileSync(fullPath, content);
  }
});
