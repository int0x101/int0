export interface Token {
    command: string;
    args: string;
    indentLevel: number
}

export function tokenize(input: string): Token[]{
    const lines = input.split('\n').filter(line=> line.trim() !== "");
    let previousIndentLevel = 0;

    const tokens = lines.map(line=> {
        const indentLevel = line.search(/\S|$/) / 4
        const [command, ...args] = line.trim().split(' ')
        
        if(indentLevel < previousIndentLevel){
            throw new Error(`Invalid indentation on line ${indentLevel+1}: Indentation decreased`)
        }
previousIndentLevel = indentLevel
        return {
            command,
            args: args.join(' '),
            indentLevel
        }
    })
    return tokens
}
