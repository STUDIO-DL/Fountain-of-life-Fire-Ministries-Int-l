const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'pages');
const headBlock = `    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
    <link rel="preload" href="../src/css/style.css" as="style">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"></noscript>
    <link rel="stylesheet" href="../src/css/style.css">`;

const compactHeadBlock = headBlock.replace(/^    /gm, '');

const patterns = [
    /\s*<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">\s*<link rel="stylesheet" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/6\.5\.0\/css\/all\.min\.css">\s*<link rel="stylesheet" href="\.\.\/src\/css\/style\.css">/,
    /\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\s*<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">\s*<link rel="stylesheet" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/6\.5\.0\/css\/all\.min\.css">\s*<link rel="stylesheet" href="\.\.\/src\/css\/style\.css">/
];

for (const file of fs.readdirSync(pagesDir).filter(name => name.endsWith('.html'))) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;
    const replacement = content.includes('    <link href="https://fonts.googleapis.com') ? headBlock : compactHeadBlock;

    patterns.forEach(pattern => {
        content = content.replace(pattern, `\n${replacement}`);
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    }
}
