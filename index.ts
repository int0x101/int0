import { compile } from "./compiler/compiler"

const input = process.argv[2]
const output = process.argv[3]

if(!input || !output){
    console.log("Usage: npx tsx index.ts <input.int> <output.html>")
    process.exit(1)
}

compile(input, output)
