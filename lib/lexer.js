import { IllegalCharError } from "./error.js";
import Position from "./position.js";
import Token, { TT_DIV, TT_FLOAT, TT_INT, TT_LPAREN, TT_MINUS, TT_MUL, TT_PLUS, TT_RPAREN } from "./token.js";

export default class Lexer {
    constructor(fileName, text) {
        this.fileName = fileName;
        this.text = text.replace(/ /g, '');
        this.pos = new Position(-1, 0, -1, fileName, text);
        this.currentChar = null;
        this.advance();
    }

    advance() {
        this.pos.advance(this.currentChar);
        this.currentChar = (this.pos.index < this.text.length) ? this.text.charAt(this.pos.index) : null;
    }
    makeTokens() {
        const tokens = [];

        while (this.currentChar != null) {
            if (this.currentChar.indexOf('\t') !== -1) this.advance();
            else if (/\d/g.test(this.currentChar)) {
                tokens.push(this.makeNumber());
            } else if (this.currentChar === '+') {
                tokens.push(new Token(TT_PLUS));
                this.advance();
            } else if (this.currentChar === '-') {
                tokens.push(new Token(TT_MINUS));
                this.advance();
            } else if (this.currentChar === '*') {
                tokens.push(new Token(TT_MUL));
                this.advance();
            } else if (this.currentChar === '/') {
                tokens.push(new Token(TT_DIV));
                this.advance();
            } else if (this.currentChar === '(') {
                tokens.push(new Token(TT_LPAREN));
                this.advance();
            } else if (this.currentChar === ')') {
                tokens.push(new Token(TT_RPAREN));
                this.advance();
            } else {
                // return some error
                const posStart = this.pos.copy();
                const char = this.currentChar;
                this.advance();
                return [
                    [], new IllegalCharError(posStart, this.pos, '\'' + char + '\'')
                ];
            }
        }
        return [tokens, null];
    }

    makeNumber() {
        let numStr = '';
        let dotCount = 0;

        while (this.currentChar != null && /\d/g.test(this.currentChar) || this.currentChar === '.') {
            if (this.currentChar === '.') {
                if (dotCount === 1) break;
                dotCount++;
                numStr += '.';
            } else {
                numStr += this.currentChar;
            }
            this.advance();
        }

        if (dotCount === 0) {
            return new Token(TT_INT, parseInt(numStr));
        }

        return new Token(TT_FLOAT, parseFloat(numStr));
    }
}