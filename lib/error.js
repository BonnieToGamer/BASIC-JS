export default class Error {
    /**
     * 
     * @param {position} posStart 
     * @param {position} posEnd 
     * @param {string} msg 
     * @param {string} details 
     */
    constructor(posStart, posEnd, msg, details) {
        this.posStart = posStart;
        this.posEnd = posEnd;
        this.msg = msg;
        this.details = details;
    }

    toString() {
        return `${this.msg}: ${this.details}\nFile ${this.posStart.fileName}, line ${this.posStart.line + 1} at char ${this.posStart.index + 1}
        \n\n` + stringWithArrows(this.posStart.fileTxt, this.posStart, this.posEnd);
    }
}

export class IllegalCharError extends Error {
    constructor(posStart, posEnd, details) {
        super(posStart, posEnd, 'Illegal Character', details)
    }
}

export class InvalidSyntaxError extends Error {
    constructor(posStart, posEnd, details) {
        super(posStart, posEnd, 'Invalid Syntax', details)
    }
}