import fs from 'fs';
import path from 'path';

// Bootstrap utility mappings
const MAPPINGS = {
  'borderRadius:\\s*["\']16px["\']': 'rounded-4',
  'borderRadius:\\s*["\']12px["\']': 'rounded-3',
  'borderRadius:\\s*["\']8px["\']': 'rounded-2',
  'borderRadius:\\s*["\']50%["\']': 'rounded-circle',
  'backgroundColor:\\s*["\']white["\']': 'bg-white',
  'backgroundColor:\\s*["\']#fff["\']': 'bg-white',
  'backgroundColor:\\s*["\']transparent["\']': 'bg-transparent',
  'background:\\s*["\']#fff["\']': 'bg-white',
  'textAlign:\\s*["\']center["\']': 'text-center',
  'width:\\s*["\']100%["\']': 'w-100',
  'height:\\s*["\']100%["\']': 'h-100',
  'overflow:\\s*["\']hidden["\']': 'overflow-hidden',
  'fontWeight:\\s*500': 'fw-medium',
  'fontWeight:\\s*600': 'fw-semibold',
  'fontWeight:\\s*700': 'fw-bold',
  // Box shadows
  'boxShadow:\\s*["\']0 0 20px rgba\\(0,0,0,0\\.05\\)["\']': 'shadow-sm',
  'boxShadow:\\s*["\']0 4px 16px rgba\\(0,0,0,0\\.1\\)["\']': 'shadow-sm',
  'boxShadow:\\s*["\']0 4px 20px rgba\\(0,0,0,0\\.1\\)["\']': 'shadow',
  'boxShadow:\\s*["\']0 8px 24px rgba\\(0,0,0,0\\.08\\)["\']': 'shadow',
  'boxShadow:\\s*["\']0 10px 30px rgba\\(0,0,0,0\\.1\\)["\']': 'shadow-lg'
};

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

    // A simple regex to find className="..." and style={{...}} on the same line or nearby is hard.
    // Instead, we will find style={{...}} blocks. If they contain matching properties, we remove them from the style object.
    // Then we append the mapped Bootstrap classes to the className attribute in the same tag.
    
    // For simplicity, we just use string replacement on the file if we can safely do it.
    // Actually, writing a robust regex for this is risky.
    // Let's just find and replace specific known full strings:
    
    // e.g. style={{ borderRadius: "16px" }} -> className="rounded-4" (needs to merge with existing className, which is hard with pure regex)
});

console.log(`Updated ${totalUpdated} files.`);
