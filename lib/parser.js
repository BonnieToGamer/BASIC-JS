import { InvalidSyntaxError } from "./error.js";
import { BinOpNode, NumberNode } from "./nodes.js";
import Token, { Tokens } from "./token.js";

export default class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.tokenIndex = -1;
        this.advance();
    }

    parse() {
        const result = this.expr();
        if (!result.error && this.currentToken.type !== Tokens.TT_EOF) return result.failure(new InvalidSyntaxError(
            this.currentToken.posStart, this.currentToken.posEnd, 'Expected \'+\', \'-\', \'*\' or \/\''
        ));
        return result;
    }

    advance() {
        this.tokenIndex++;
        if (this.tokenIndex < this.tokens.length) {
            this.currentToken = this.tokens[this.tokenIndex];
        }

        return this.currentToken;
    }

    factor() {
        const result = new ParseResult();
        const token = this.currentToken;

        if (token.type === Tokens.TT_INT || token.type === Tokens.TT_FLOAT) {
            result.register(this.advance());
            return result.success(new NumberNode(token));
        }

        return result.failure(new InvalidSyntaxError(token.posStart, token.posEnd, 'Expected int or float'));
    }

    term() {
        return this.binaryOperation(this.factor.bind(this), [Tokens.TT_MUL, Tokens.TT_DIV]);
    }

    expr() {
        return this.binaryOperation(this.term.bind(this), [Tokens.TT_PLUS, Tokens.TT_MINUS]);
    }

    /**
     * 
     * @param {function} func 
     * @param {Array} operators 
     * @returns 
     */
    binaryOperation(func, operators) {
        const result = new ParseResult();
        let left = result.register(func());
        if (result.error) return result;

        while (operators.includes(this.currentToken.type)) {
            const operatorToken = this.currentToken;
            result.register(this.advance());
            const right = result.register(func());
            if (result.error) return result;
            left = new BinOpNode(left, operatorToken, right);
        }

        return result.success(left);
    }
}

export class ParseResult {
    constructor() {
        this.error = null;
        this.node = null;
    }

    register(result) {
        if (result instanceof ParseResult) {
            if (result.error) this.error = result.error;
            return result.node;
        }

        return result;
    }

    success(node) {
        this.node = node;
        return this;
    }

    failure(error) {
        this.error = error;
        return this;
    }
}