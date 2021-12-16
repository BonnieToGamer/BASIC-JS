/**
 * 
 * @param {String} text 
 * @param {Position} posStart 
 * @param {Position} posEnd 
 */
export function stringWithArrows(text, posStart, posEnd) {
    let result = '';

    // Calculate indices
    const lastIndex = text.lastIndexOf('\n', 0);
    let indexStart = Math.max((lastIndex <= posStart.index) ? lastIndex : -1, 0);
    let indexEnd = text.indexOf('\n', indexStart + 1);
    if (indexEnd < 0) indexEnd = text.length;

    // Generate each line
    const lineCount = posEnd.line - posStart.line + 1;
    for (let i = 0; i < lineCount; i++) {
        // Calculate line columns
        const line = text.slice(indexStart, indexEnd);
        const colStart = (i === 0) ? posStart.col : 0;
        const colEnd = (i === lineCount) ? posEnd.col : line.length - 1;

        // Append the result
        result += line + '\n';
        // result += ' ' * colStart + '^' * (colEnd - colStart);
        result += `${' '.repeat(colStart)}${'^'.repeat(colEnd - colStart)}`;

        // Re-calculate indices
        indexStart = indexEnd;
        indexEnd = text.indexOf('\n', indexStart + 1);
        if (indexEnd < 0) indexEnd = text.length;
    }

    return result.replace('\t', '');
}