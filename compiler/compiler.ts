import { ASTNode } from '../parser/parser';
import * as fs from 'fs';
import * as path from 'path';

const rulesPath = path.resolve(__dirname, './rules.json');
const rules = JSON.parse(fs.readFileSync(rulesPath, 'utf-8'));

export function compile(ast: ASTNode): string {
  function visit(node: ASTNode): string {
    const rule = rules[node.command];

    if (!rule) {
      throw new Error(`Unknown tag: ${node.command}`);
    }

    if (rule.type === 'self-closing') {
      return `<${node.command} />`;
    }

    const childrenHtml = node.children.map(visit).join('');
    return `<${node.command}>${node.args || ''}${childrenHtml}</${node.command}>`;
  }

  return visit(ast);
}
