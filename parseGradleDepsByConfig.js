#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

// --- CLI args ---
const args = process.argv.slice(2);
function argVal(flag, def) {
  const i = args.indexOf(flag);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : def;
}
const CONFIG = argVal("--config");
const INFILE = argVal("--in", "deps.txt");
const OUTFILE = argVal("--out", "deps.json");

if (!CONFIG) {
  console.error("❌ Missing --config <name>. Example: --config releaseRuntimeClasspath");
  process.exit(1);
}
if (!fs.existsSync(INFILE)) {
  console.error(`❌ Input file not found: ${INFILE}`);
  process.exit(1);
}

// --- Helpers ---
function findSection(lines, configName) {
  // Find a header line that starts with the config name (Gradle prints "configName - ...")
  // Be lenient about spacing/casing of the dash portion.
  const headerRegex = new RegExp(`^\\s*${configName}\\b.*-`, "i");

  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (headerRegex.test(lines[i])) {
      start = i;
      break;
    }
  }
  if (start === -1) return [];

  // Collect lines belonging to this section:
  // After the header, dependency lines typically start with one of: " ", "|", "+", "\".
  // Stop when we encounter a new header (non-indented config line) or EOF.
  const section = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];

    // Next header looks like "anotherConfiguration - ..."
    if (/^\S.* - /.test(line)) break;

    // Lines that form the ASCII tree: continue collecting
    if (/^[| +\\]/.test(line) || line.trim() === "" || line.trim().startsWith("No dependencies")) {
      section.push(line);
      continue;
    }

    // Sometimes Gradle prints informative sentences; keep them only if indented
    if (/^\s+/.test(line)) {
      section.push(line);
      continue;
    }

    // Otherwise it's probably a new block — stop.
    break;
  }
  return section;
}

function parseGradleTree(treeLines) {
  const root = { configuration: CONFIG, dependencies: [] };
  const stack = [{ node: root, indent: -1 }];

  for (let rawLine of treeLines) {
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith("No dependencies")) continue;

    // Count left margin made by '|' and spaces
    const indentMatch = rawLine.match(/^[| ]*/);
    const indent = indentMatch ? indentMatch[0].length : 0;

    // Remove the ASCII connectors to get the dep text
    // e.g. "+--- group:artifact:version (-> resolvedVersion) (*)"
    let depText = rawLine.replace(/.*---\s*/, "").trim();
    if (!depText || /^[|]+$/.test(depText)) continue;

    // Normalize “(-> …)” and “(*)” into fields if you want later;
    // we keep the full raw for transparency, but extract GAV if present.
    const gavMatch = depText.match(/([A-Za-z0-9_.-]+:[A-Za-z0-9_.-]+:[^ \t()]+)\b/);
    const gav = gavMatch ? gavMatch[1] : null;

    const node = {
      name: depText,          // full line after connectors (includes resolutions/notes)
      gav: gav || undefined,  // clean "group:artifact:version" when detectable
      dependencies: []
    };

    // Rewind to the right parent by indent level
    while (stack.length && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }
    stack[stack.length - 1].node.dependencies.push(node);
    stack.push({ node, indent });
  }

  return root;
}

// --- Main ---
const lines = fs.readFileSync(INFILE, "utf-8").split(/\r?\n/);
const sectionLines = findSection(lines, CONFIG);

if (sectionLines.length === 0) {
  console.error(`❌ Could not find section for configuration "${CONFIG}" in ${INFILE}.
Tip: Make sure the config exists, or generate a focused file with:
  ./gradlew <module>:dependencies --configuration ${CONFIG} > ${INFILE}
`);
  process.exit(2);
}

const tree = parseGradleTree(sectionLines);
fs.writeFileSync(OUTFILE, JSON.stringify(tree, null, 2));
console.log(`✅ Wrote ${OUTFILE} for configuration "${CONFIG}"`);
