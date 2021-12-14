export default class Error {
    constructor(posStart, posEnd, msg, details) {
        this.posStart = posStart;
        this.posEnd = posEnd;
        this.msg = msg;
        this.details = details;
    }

    toString() {
        return `${this.msg}: ${this.details}\nFile ${this.posStart.fn}, line ${this.posStart.ln + 1}`;
    }
}

export class IllegalCharError extends Error {
    constructor(posStart, posEnd, details) {
        super(posStart, posEnd, 'Illegal Character', details)
    }
}