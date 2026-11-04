import fs from "fs";
const p = "src/comp/Components.jsx";
const s = fs
  .readFileSync(p, "utf8")
  .replace(/(\d*\.?\d+)rem/g, (_, n) => `${+((n * 1000) / 1741).toFixed(3)}vw`);
fs.writeFileSync(p, s);
