import { IllegalCharError } from "./error.js";
import Position from "./position.js";
import Token, { Tokens } from "./token.js";

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
                tokens.push(new Token(Tokens.TT_PLUS, null, this.pos));
                this.advance();
            } else if (this.currentChar === '-') {
                tokens.push(new Token(Tokens.TT_MINUS, null, this.pos));
                this.advance();
            } else if (this.currentChar === '*') {
                tokens.push(new Token(Tokens.TT_MUL, null, this.pos));
                this.advance();
            } else if (this.currentChar === '/') {
                tokens.push(new Token(Tokens.TT_DIV, null, this.pos));
                this.advance();
            } else if (this.currentChar === '(') {
                tokens.push(new Token(Tokens.TT_LPAREN, null, this.pos));
                this.advance();
            } else if (this.currentChar === ')') {
                tokens.push(new Token(Tokens.TT_RPAREN, null, this.pos));
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

        tokens.push(new Token(Tokens.TT_EOF, null, this.pos));
        return [tokens, null];
    }

    makeNumber() {
        let numStr = '';
        let dotCount = 0;
        const posStart = this.pos.copy();

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
            return new Token(Tokens.TT_INT, parseInt(numStr), posStart, this.pos);
        }

        return new Token(Tokens.TT_FLOAT, parseFloat(numStr), posStart, this.pos);
    }
}