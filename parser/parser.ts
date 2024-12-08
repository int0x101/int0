import type { Token } from "../lexur/lexer";

export function parse(tokens: Token[]) {
    let html = "";
    const stack: string[] = [];

    tokens.forEach(({ command, args, indentLevel }) => {
        if(stack.length > indentLevel){
            stack.splice(indentLevel)
        }
        
        switch (command) {
            case "@html":
                html += `<html>${args}</html>`;
                break;
            default:
                throw new Error(`Invalid command ${command}`)
        }
        stack.push(command)
    });
    return html

}

