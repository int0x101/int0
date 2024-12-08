// compiler/compiler.ts
import fs from "fs";
import path from "path";
import { tokenize } from "../lexur/lexer";
import { parse } from "../parser/parser";

export function compile(inputFile: string, outputFile: string): void {
  const input = fs.readFileSync(path.resolve(inputFile), "utf-8");
  const tokens = tokenize(input);
  const html = parse(tokens);
  fs.writeFileSync(path.resolve(outputFile), html, "utf-8");
  console.log("Compilation successful!");
}
