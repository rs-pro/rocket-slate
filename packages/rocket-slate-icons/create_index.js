const path = require('path');
const fs = require('fs');

const iconsPaths = fs.readdirSync('./src/icons');

const indexContent = iconsPaths.map(function(fileName){
  const fileNameWithoutExt = fileName.slice(0, -4);
  return `export { default as Icon${fileNameWithoutExt} } from './icons/${fileNameWithoutExt}';`;
});

fs.writeFileSync('./src/index.tsx', indexContent.join('\n'));
