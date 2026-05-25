const fs = require('fs');
const path = require('path');

const walk = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
};

const files = walk('app/components');
let totalReplaced = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace blues with var(--kiet-primary)
    content = content.replace(/"#(002855|00304c|085290)"/gi, '"var(--kiet-primary)"');
    content = content.replace(/'#(002855|00304c|085290)'/gi, "'var(--kiet-primary)'");
    
    // Replace oranges with var(--kiet-secondary)
    content = content.replace(/"#(f26520|f15b20|ff5722)"/gi, '"var(--kiet-secondary)"');
    content = content.replace(/'#(f26520|f15b20|ff5722)'/gi, "'var(--kiet-secondary)'");

    // Replace dark navy with var(--kiet-tertiary)
    content = content.replace(/"#(1a1a2e|164265)"/gi, '"var(--kiet-tertiary)"');
    content = content.replace(/'#(1a1a2e|164265)'/gi, "'var(--kiet-tertiary)'");

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
        totalReplaced++;
    }
});

console.log(`Updated ${totalReplaced} files.`);
