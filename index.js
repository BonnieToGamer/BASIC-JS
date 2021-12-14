import inq from "inquirer";
import Lexer from "./lib/lexer.js";
const { prompt } = inq;
console.log('basic interpreter written in Javascript');

const question = [{
    type: 'input',
    name: 'text',
    message: 'basic>'
}];

while (true) {
    const response = await prompt(question);
    const text = response['text'];
    let [result, error] = run('<stdin>', text);

    if (error) console.error(error.toString());
    else console.log(`[ ${result}]`);
}

function run(fn, text) {
    const lexer = new Lexer(fn, text);
    return lexer.makeTokens();
}