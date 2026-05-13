const fs = require('fs');

const cssPath = 'css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Function to convert px to vw based on 1440px viewport
const toVw = (px) => `${(px / 14.4).toFixed(4)}vw`;

// For fonts, we cap at the 1440px value (the max)
const replaceFontClamp = (pxStr) => {
    const px = parseFloat(pxStr);
    const min = (px * (1280/1440)).toFixed(2);
    // Cap at the exact px value so it doesn't grow beyond the 1440px design size
    return `clamp(${min}px, ${toVw(px)}, ${px}px)`;
};

// For layout containers, we can let them scale up to 1920px or cap them.
// The user previously wanted them to scale, so we let them scale up to 1920px values.
const replaceLayoutClamp = (pxStr) => {
    const px = parseFloat(pxStr);
    const min = (px * (1280/1440)).toFixed(2);
    const max = (px * (1920/1440)).toFixed(2);
    return `clamp(${min}px, ${toVw(px)}, ${max}px)`;
};

const newCss = `/* Business Section */
.business-section {
  background-color: #ffffff;
  padding: ${replaceLayoutClamp('120')} ${replaceLayoutClamp('80')};
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  max-width: 1920px;
  min-height: ${replaceLayoutClamp('988')};
  margin: 0 auto;
}

.business-container {
  display: flex;
  align-items: flex-start;
  column-gap: ${replaceLayoutClamp('48')};
  width: 100%;
  max-width: ${replaceLayoutClamp('1280')};
  margin: 0 auto;
}

.business-header {
  width: ${replaceLayoutClamp('334')};
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  row-gap: ${replaceLayoutClamp('48')};
  align-items: flex-start;
}

.business-header h2 {
  font-family: "Dunbar Text", "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: ${replaceFontClamp('54')};
  font-weight: 700;
  color: #1a1a1a;
  line-height: ${replaceFontClamp('70')};
  margin: 0;
  letter-spacing: 0;
}

.btn-business {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  column-gap: ${replaceLayoutClamp('4')};
  border: 1px solid #1c7dcd;
  border-radius: ${replaceLayoutClamp('4')};
  background: #1c7dcd;
  padding: ${replaceLayoutClamp('9')} ${replaceLayoutClamp('23')};
  cursor: pointer;
  height: ${replaceLayoutClamp('44')};
  transition: all 0.3s ease;
}

.btn-business:hover {
  background: #1562a2;
  border-color: #1562a2;
}

.btn-business span {
  flex-shrink: 0;
  color: #ffffff;
  font-family: Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: ${replaceFontClamp('16')};
  font-weight: 700;
  white-space: nowrap;
}

.btn-business svg {
  width: ${replaceLayoutClamp('24')};
  height: ${replaceLayoutClamp('24')};
  flex-shrink: 0;
}

.business-grid {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
  row-gap: ${replaceLayoutClamp('16')};
  width: ${replaceLayoutClamp('899')};
}

.business-card-container {
  display: flex;
  flex-shrink: 0;
  align-items: stretch;
  align-self: stretch;
  column-gap: ${replaceLayoutClamp('16')};
  height: ${replaceLayoutClamp('335')};
}

.business-card {
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-width: 0;
  align-items: flex-start;
  outline-width: 1px;
  outline-style: solid;
  outline-color: #e5e7eb;
  border-radius: ${replaceLayoutClamp('8')};
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  height: 100%;
}

.business-card img {
  width: 100%;
  aspect-ratio: 289 / 163;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
  border-radius: ${replaceLayoutClamp('8')} ${replaceLayoutClamp('8')} 0 0;
}

.business-card .card-content {
  padding: ${replaceLayoutClamp('16')} ${replaceLayoutClamp('24')};
  display: flex;
  flex-direction: column;
  row-gap: ${replaceLayoutClamp('8')};
  background: #ffffff;
  flex-grow: 1;
  border-radius: 0 0 ${replaceLayoutClamp('8')} ${replaceLayoutClamp('8')};
  align-items: flex-start;
  align-self: stretch;
}

.business-card h3 {
  font-family: Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: ${replaceFontClamp('22')};
  font-weight: 700;
  color: #1a1a1a;
  line-height: ${replaceFontClamp('29')};
  margin: 0;
  letter-spacing: 0;
  flex-shrink: 0;
  align-self: stretch;
}

.business-card p {
  font-family: Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: ${replaceFontClamp('15')};
  font-weight: 400;
  color: #1a1a1a;
  line-height: ${replaceFontClamp('19')};
  margin: 0;
  letter-spacing: 0;
  flex-shrink: 0;
  align-self: stretch;
}`;

css = css.replace(/\/\* Business Section \*\/[\s\S]*?@media \(max-width: 1024px\)/, newCss + '\n\n@media (max-width: 1024px)');
fs.writeFileSync(cssPath, css);
console.log('Updated style.css with capped font sizes and hover state for button');
