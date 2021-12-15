import Lexer from "./lexer.js";
import Parser from "./parser.js";

export default class Basic {
    constructor() {}

    static run(fn, text) {
        // Generate tokens
        const lexer = new Lexer(fn, text);
        let [tokens, error] = lexer.makeTokens();
        if (error) return [null, error];

        // Generate AST
        const parser = new Parser(tokens);
        const ast = parser.parse();

        return [ast, null];
    }
}