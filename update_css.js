const fs = require('fs');

const cssPath = 'css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Function to convert px to vw based on 1440px viewport
const toVw = (px) => `${(px / 14.4).toFixed(4)}vw`;

const replaceClamp = (pxStr) => {
    const px = parseFloat(pxStr);
    const min = (px * (1280/1440)).toFixed(2);
    const max = (px * (1920/1440)).toFixed(2);
    return `clamp(${min}px, ${toVw(px)}, ${max}px)`;
};

const newCss = `/* Business Section */
.business-section {
  background-color: #ffffff;
  padding: ${replaceClamp('120')} ${replaceClamp('80')};
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  max-width: 1920px;
  min-height: ${replaceClamp('988')};
  margin: 0 auto;
}

.business-container {
  display: flex;
  align-items: flex-start;
  column-gap: ${replaceClamp('48')};
  width: 100%;
  max-width: ${replaceClamp('1280')};
  margin: 0 auto;
}

.business-header {
  width: ${replaceClamp('334')};
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  row-gap: ${replaceClamp('48')};
  align-items: flex-start;
}

.business-header h2 {
  font-family: "Dunbar Text", "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: ${replaceClamp('54')};
  font-weight: 700;
  color: #1a1a1a;
  line-height: ${replaceClamp('70')};
  margin: 0;
  letter-spacing: 0;
}

.btn-business {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  column-gap: ${replaceClamp('4')};
  border: 1px solid #1c7dcd;
  border-radius: ${replaceClamp('4')};
  background: #1c7dcd;
  padding: ${replaceClamp('9')} ${replaceClamp('23')};
  cursor: pointer;
  height: ${replaceClamp('44')};
}

.btn-business span {
  flex-shrink: 0;
  color: #ffffff;
  font-family: Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: ${replaceClamp('16')};
  font-weight: 700;
  white-space: nowrap;
}

.btn-business svg {
  width: ${replaceClamp('24')};
  height: ${replaceClamp('24')};
  flex-shrink: 0;
}

.business-grid {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
  row-gap: ${replaceClamp('16')};
  width: ${replaceClamp('899')};
}

.business-card-container {
  display: flex;
  flex-shrink: 0;
  align-items: stretch;
  align-self: stretch;
  column-gap: ${replaceClamp('16')};
  height: ${replaceClamp('335')};
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
  border-radius: ${replaceClamp('8')};
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
  border-radius: ${replaceClamp('8')} ${replaceClamp('8')} 0 0;
}

.business-card .card-content {
  padding: ${replaceClamp('16')} ${replaceClamp('24')};
  display: flex;
  flex-direction: column;
  row-gap: ${replaceClamp('8')};
  background: #ffffff;
  flex-grow: 1;
  border-radius: 0 0 ${replaceClamp('8')} ${replaceClamp('8')};
  align-items: flex-start;
  align-self: stretch;
}

.business-card h3 {
  font-family: Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: ${replaceClamp('22')};
  font-weight: 700;
  color: #1a1a1a;
  line-height: ${replaceClamp('29')};
  margin: 0;
  letter-spacing: 0;
  flex-shrink: 0;
  align-self: stretch;
}

.business-card p {
  font-family: Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: ${replaceClamp('15')};
  font-weight: 400;
  color: #1a1a1a;
  line-height: ${replaceClamp('19')};
  margin: 0;
  letter-spacing: 0;
  flex-shrink: 0;
  align-self: stretch;
}`;

css = css.replace(/\/\* Business Section \*\/[\s\S]*?@media \(max-width: 1024px\)/, newCss + '\n\n@media (max-width: 1024px)');
fs.writeFileSync(cssPath, css);
console.log('Updated style.css');
