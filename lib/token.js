export const Tokens = {
    TT_INT: 'INT',
    TT_FLOAT: 'FLOAT',
    TT_PLUS: 'PLUS',
    TT_MINUS: 'MINUS',
    TT_MUL: 'MUL',
    TT_DIV: 'DIV',
    TT_LPAREN: 'LPAREN',
    TT_RPAREN: 'RPAREN',
    TT_EOF: 'EOF'
};

export default class Token {
    constructor(type, value = null, posStart = null, posEnd = null) {
        this.type = type;
        this.value = value;

        if (posStart) {
            this.posStart = posStart.copy();
            this.posEnd = posStart.copy();
            this.posEnd.advance();
        }

        if (posEnd) {
            this.posEnd = posEnd.copy();
        }
    }

    toString() {
        if (this.value) return `${this.type}: ${this.value} `;
        return `${this.type} `;
    }
}