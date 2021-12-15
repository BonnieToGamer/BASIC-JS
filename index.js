import inq from "inquirer";
import Basic from "./lib/basic.js";

const { prompt } = inq;
const question = [{
    type: 'input',
    name: 'text',
    message: 'basic>'
}];

console.log('basic interpreter written in Javascript');

while (true) {
    const response = await prompt(question);
    const text = response['text'];
    let [result, error] = Basic.run('<stdin>', text);

    if (error) console.error(error.toString());
    else console.log(result.toString());
}