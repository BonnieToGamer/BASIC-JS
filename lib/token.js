export const TT_INT = 'INT';
export const TT_FLOAT = 'FLOAT';
export const TT_PLUS = 'PLUS';
export const TT_MINUS = 'MINUS';
export const TT_MUL = 'MUL';
export const TT_DIV = 'DIV';
export const TT_LPAREN = 'LPAREN';
export const TT_RPAREN = 'RPAREN';

export default class Token {
    constructor(type, value = null) {
        this.type = type;
        this.value = value;
    }

    toString() {
        if (this.value) return `${this.type}: ${this.value} `;
        return `${this.type} `;
    }
}