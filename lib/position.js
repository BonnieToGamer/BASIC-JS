export default class Position {
    constructor(index, line, col, fileName, fileTxt) {
        this.index = index;
        this.line = line;
        this.col = col;
        this.fileName = fileName;
        this.fileTxt = fileTxt;
    }

    advance(currentChar = null) {
        this.index++;
        this.col++;

        if (currentChar === `\n`) {
            this.line++;
            this.col = 0;
        }

        return this;
    }

    copy() {
        return new Position(this.index, this.line, this.col, this.fileName, this.fileTxt);
    }
}