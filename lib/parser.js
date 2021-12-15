import { BinOpNode, NumberNode } from "./nodes.js";
import { TT_DIV, TT_FLOAT, TT_INT, TT_MINUS, TT_MUL, TT_PLUS } from "./token.js";

export default class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.tokenIndex = -1;
        this.advance();
    }

    parse() {
        return this.expr();
    }

    advance() {
        this.tokenIndex++;
        if (this.tokenIndex < this.tokens.length) {
            this.currentToken = this.tokens[this.tokenIndex];
        }

        return this.currentToken;
    }

    factor() {
        const token = this.currentToken;

        if (token.type === TT_INT || token.type === TT_FLOAT) {
            this.advance();
            return new NumberNode(token);
        }

        return null
    }

    term() {
        return this.binaryOperator(this.factor.bind(this), [TT_MUL, TT_DIV]);
    }

    expr() {
        return this.binaryOperator(this.term.bind(this), [TT_PLUS, TT_MINUS]);
    }

    /**
     * 
     * @param {function} func 
     * @param {Array} operators 
     * @returns 
     */
    binaryOperator(func, operators) {
        let left = func();

        while (operators.includes(this.currentToken.type)) {
            const operatorToken = this.currentToken;
            this.advance();
            const right = func();
            left = new BinOpNode(left, operatorToken, right);
        }

        return left;
    }
}