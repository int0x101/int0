export interface Token {
    command: string;
    args: string;
    indentLevel: number,
    attrs?: Record<string, string>
}

export function tokenize(input: string): Token[] {
    const lines = input.split('\n')
    const tokens: Token[] = []

    lines.forEach((line) => {
        const match = line.match(/^(\s*)(@\w+)(\((.*?)\))?(.*)$/);
        if (match) {
            const indentLevel = match[1].length;
            const command = match[2].substring(1); // Strip '@'
            const attributesRaw = match[4]?.trim() || '';
            const args = match[5]?.trim() || '';

            // Parse attributes
            const attrs: Record<string, string> = {};
            if (attributesRaw) {
                attributesRaw.split(',').forEach((attr) => {
                    const [key, val] = attr.split('=').map((part) => part.trim());
                    if (key && val) {
                        attrs[key] = val.replace(/^['"]|['"]$/g, ''); // Strip quotes
                    }
                });
            }

            tokens.push({ command, args, indentLevel, attrs })
        }
    })
    return tokens;
}
