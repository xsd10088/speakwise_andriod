const fs = require("fs");
const ts = require("typescript");

const scene = process.argv[2];
if (!scene) {
  console.error("Usage: node validate-data-scene.js <scene>");
  process.exit(2);
}

const fileName = "lib/data.ts";
const sourceText = fs.readFileSync(fileName, "utf8");
const sourceFile = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
const parseErrors = sourceFile.parseDiagnostics.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
if (parseErrors.length) {
  console.error(`${scene}: TypeScript parse failed:`);
  for (const error of parseErrors) console.error(`- ${error}`);
  process.exit(1);
}

function findVariable(name) {
  let result;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name && node.initializer) {
      result = node.initializer;
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return result;
}

function propertyNameText(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return undefined;
}

function objectProperty(object, name) {
  return object.properties.find((property) => ts.isPropertyAssignment(property) && propertyNameText(property.name) === name);
}

function stringValue(property) {
  if (!property || !ts.isPropertyAssignment(property) || !ts.isStringLiteral(property.initializer)) return undefined;
  return property.initializer.text;
}

const sceneContent = findVariable("SCENE_CONTENT");
if (!sceneContent || !ts.isObjectLiteralExpression(sceneContent)) {
  console.error(`${scene}: SCENE_CONTENT not found`);
  process.exit(1);
}

const sceneProperty = objectProperty(sceneContent, scene);
if (!sceneProperty || !ts.isPropertyAssignment(sceneProperty) || !ts.isArrayLiteralExpression(sceneProperty.initializer)) {
  console.error(`${scene}: scene array not found`);
  process.exit(1);
}

const elements = sceneProperty.initializer.elements;
const errors = [];
const ids = [];
const texts = [];
const requiredKeys = ["id", "speaker", "text", "translation", "note"];
const forbidden = [
  "By the way, I wanted to ask you about",
  "I have been thinking about",
  "Do you have any thoughts on",
];

if (elements.length !== 100) errors.push(`expected 100 lines, found ${elements.length}`);

elements.forEach((element, index) => {
  const expectedId = `${scene}-${index + 1}`;
  if (!ts.isObjectLiteralExpression(element)) {
    errors.push(`${expectedId}: not an object`);
    return;
  }
  const keys = element.properties.map((property) => ts.isPropertyAssignment(property) ? propertyNameText(property.name) : "<invalid>");
  if (keys.length !== requiredKeys.length || requiredKeys.some((key) => !keys.includes(key))) {
    errors.push(`${expectedId}: expected keys ${requiredKeys.join(", ")}, found ${keys.join(", ")}`);
  }
  const id = stringValue(objectProperty(element, "id"));
  const text = stringValue(objectProperty(element, "text"));
  const translation = stringValue(objectProperty(element, "translation"));
  const note = stringValue(objectProperty(element, "note"));
  ids.push(id);
  texts.push(text);
  if (id !== expectedId) errors.push(`expected ${expectedId}, found ${id ?? "<missing>"}`);
  if (!text || !translation || !note) errors.push(`${expectedId}: empty required field`);
  for (const phrase of forbidden) {
    if (text?.includes(phrase)) errors.push(`${expectedId}: forbidden template "${phrase}"`);
  }
});

if (new Set(ids).size !== ids.length) errors.push("duplicate IDs found");
if (new Set(texts.filter(Boolean)).size !== texts.filter(Boolean).length) errors.push("duplicate English text found");

if (errors.length) {
  console.error(`${scene}: validation failed`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`${scene}: PASS (100 objects, continuous IDs, complete fields, unique English text, no forbidden templates)`);
