export class NumberNode {
    constructor(token) {
        this.token = token;
    }

    toString() {
        return `${this.token}`;
    }
}

export class BinOpNode {
    constructor(leftNode, opToken, rightNode) {
        this.leftNode = leftNode;
        this.opToken = opToken;
        this.rightNode = rightNode;
    }

    toString() {
        return `${this.leftNode}, ${this.opToken}, ${this.rightNode}`;
    }
}