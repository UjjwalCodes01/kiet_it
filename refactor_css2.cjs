const fs = require('fs');
const path = require('path');

const MAPPINGS = [
  // Box shadows
  { inline: 'boxShadow: "0 0 20px rgba(0,0,0,0.05)"', bsClass: 'shadow-sm' },
  { inline: 'boxShadow: "0 4px 16px rgba(0,0,0,0.1)"', bsClass: 'shadow-sm' },
  { inline: 'boxShadow: "0 4px 20px rgba(0,0,0,0.1)"', bsClass: 'shadow' },
  { inline: 'boxShadow: "0 8px 24px rgba(0,0,0,0.08)"', bsClass: 'shadow' },
  { inline: 'boxShadow: "0 4px 12px rgba(0,0,0,0.05)"', bsClass: 'shadow-sm' },
  
  // Backgrounds
  { inline: 'backgroundColor: "white"', bsClass: 'bg-white' },
  { inline: 'background: "#fff"', bsClass: 'bg-white' },
  { inline: 'backgroundColor: "#fff"', bsClass: 'bg-white' },
  { inline: 'backgroundColor: "transparent"', bsClass: 'bg-transparent' },
  
  // Borders
  { inline: 'borderRadius: "16px"', bsClass: 'rounded-4' },
  { inline: 'borderRadius: "12px"', bsClass: 'rounded-3' },
  { inline: 'borderRadius: "8px"', bsClass: 'rounded-2' },
  { inline: 'borderRadius: "50%"', bsClass: 'rounded-circle' },
  { inline: 'border: "none"', bsClass: 'border-0' },
  
  // Typography
  { inline: 'textAlign: "center"', bsClass: 'text-center' },
  { inline: 'fontWeight: 500', bsClass: 'fw-medium' },
  { inline: 'fontWeight: 600', bsClass: 'fw-semibold' },
  { inline: 'fontWeight: 700', bsClass: 'fw-bold' },
  { inline: 'fontStyle: "italic"', bsClass: 'fst-italic' },
  
  // Layout
  { inline: 'width: "100%"', bsClass: 'w-100' },
  { inline: 'height: "100%"', bsClass: 'h-100' },
  { inline: 'overflow: "hidden"', bsClass: 'overflow-hidden' },
  { inline: 'position: "relative"', bsClass: 'position-relative' },
  { inline: 'position: "absolute"', bsClass: 'position-absolute' },
];

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
let totalUpdated = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // This regex looks for a className="something" and a style={{ something }} on the SAME line.
    // We split by lines to make it safer.
    const lines = content.split('\n');
    let modified = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // Check if line has style={{...}}
        if (line.includes('style={{')) {
            let classesToAdd = [];
            
            // For each mapping, check if it exists in the style string
            MAPPINGS.forEach(mapping => {
                // If the inline string exists (allowing for optional trailing comma or spaces)
                // We use a simple indexOf check first
                if (line.includes(mapping.inline)) {
                    classesToAdd.push(mapping.bsClass);
                    // Remove from style object
                    line = line.replace(new RegExp(mapping.inline.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*,?\\s*'), '');
                }
            });

            if (classesToAdd.length > 0) {
                // Now we need to add these classes to className
                if (line.includes('className="')) {
                    // Inject into existing className
                    line = line.replace('className="', `className="${classesToAdd.join(' ')} `);
                } else if (line.includes("className='")) {
                    line = line.replace("className='", `className='${classesToAdd.join(' ')} `);
                } else {
                    // No className exists, add it before style={{
                    line = line.replace('style={{', `className="${classesToAdd.join(' ')}" style={{`);
                }
                
                // Cleanup empty style={{}} completely
                line = line.replace(/style=\{\{\s*\}\}/, '');
                
                lines[i] = line;
                modified = true;
            }
        }
    }

    if (modified) {
        fs.writeFileSync(file, lines.join('\n'), 'utf8');
        console.log(`Updated ${file}`);
        totalUpdated++;
    }
});

console.log(`Updated ${totalUpdated} files.`);
