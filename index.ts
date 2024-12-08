import path from 'path';
import fs from "fs"
import { tokenize } from './lexer/lexer';
import { parse } from './parser/parser';
import { compile } from './compiler/compiler';

const inputFile = process.argv[2]
const outputFile = process.argv[3]

if (!inputFile || !outputFile) {
    console.log("Usage: npx tsx index.ts <input.int> <output.html>")
    process.exit(1)
}

try {
    const input = fs.readFileSync(path.resolve(inputFile), "utf-8");

    const tokens = tokenize(input);
    const ast = parse(tokens);
    const html = compile(ast);

    // console.log(html);
    fs.writeFileSync(path.resolve(outputFile), html, "utf-8");
} catch (error) {
    console.error('Compilation failed:', error);
}