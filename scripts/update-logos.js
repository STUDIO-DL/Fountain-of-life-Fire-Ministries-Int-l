const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'pages');
const search = '<img src="../assets/images/logo.png" alt=';
const replace = '<img src="../assets/images/logo.png" width="40" height="40" decoding="async" alt=';

for (const file of fs.readdirSync(pagesDir).filter(name => name.endsWith('.html'))) {
    const filePath = path.join(pagesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(search)) {
        fs.writeFileSync(filePath, content.split(search).join(replace));
        console.log(`Updated logos in ${file}`);
    }
}
