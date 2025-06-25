const fs = require("fs");
const path = require("path");

const componentName = process.argv[2];

if (!componentName) {
  console.error("❌ You must provide a component name.");
  process.exit(1);
}

const componentDir = path.join("src", "components", componentName);

if (fs.existsSync(componentDir)) {
  console.error("❌ Component already exists.");
  process.exit(1);
}

fs.mkdirSync(componentDir, { recursive: true });

// ==== JSX TEMPLATE - Function Style ====
const componentCode = `
import React from 'react';
import styles from './${componentName}.module.css';

export default function ${componentName}() {
  return (
    <div className={styles.container}>
      ${componentName} component
    </div>
  );
}
`.trim();

fs.writeFileSync(
  path.join(componentDir, `${componentName}.jsx`),
  componentCode
);

// ==== CSS MODULE FILE ====
const cssCode = `
.container {
  /* Add styles here */
}
`.trim();

fs.writeFileSync(
  path.join(componentDir, `${componentName}.module.css`),
  cssCode
);

console.log(`✅ '${componentName}' component created using FUNCTION style.`);
// ==== Update index.js to export the new component ====
// === npm run generate ComponentName ===