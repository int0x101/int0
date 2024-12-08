import { Token } from "../lexer/lexer";

export interface ASTNode {
    command: string;
    args?: string;
    children: ASTNode[]
}

interface Stack {
    node: ASTNode
    indentLevel: number
}

export function parse(tokens: Token[]) {
    const root: ASTNode = { command: 'html', children: [] }
    const stack: Stack[] = [{ node: root, indentLevel: -1 }]

    tokens.forEach((token) => {
        while (stack.length > 0 && stack[stack.length - 1].indentLevel >= token.indentLevel) {
            stack.pop()
        }
        const parent = stack[stack.length - 1]?.node
        const newNode: ASTNode = { command: token.command, args: token.args, children: [] }

        if (parent) {
            parent.children.push(newNode)
        }
        stack.push({ node: newNode, indentLevel: token.indentLevel });
    })
    return root
}