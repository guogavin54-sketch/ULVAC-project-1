const fs = require('fs');
const PNG = require('pngjs').PNG;

const data = fs.readFileSync('.figma/image/screenshot_18600_15172.png');
const png = PNG.sync.read(data);

// The button is below the title. Let's sample a few pixels around x: 100-200, y: 300-500
let foundColor = {};
for (let y = 300; y < 600; y += 10) {
    for (let x = 80; x < 250; x += 10) {
        const idx = (png.width * y + x) << 2;
        const r = png.data[idx];
        const g = png.data[idx+1];
        const b = png.data[idx+2];
        const hex = '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
        foundColor[hex] = (foundColor[hex] || 0) + 1;
    }
}
const sorted = Object.entries(foundColor).sort((a,b) => b[1] - a[1]);
console.log(sorted.slice(0, 10));
