import * as fs from 'fs';
import * as readline from 'readline';

function cardValue(line: string): number {
    const [cardNumber, cardData] = line.split(": ");
    const [answerData, guessData] = cardData.split(" | ");
    const guesses = guessData.trim().split(/\s+/);
    const answers = answerData.trim().split(/\s+/);
    let score = 0;
    let first = true;
    guesses.forEach(guess => {
        answers.forEach(answer => {
            if (guess === answer) {
                if (first) {score += 1; first = false;}
                else {score *= 2;}
            }})});
    return score;
    }

async function processFile(filePath: string): Promise<number> {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity // Recognize all instances of CR LF ('\r\n') as a single line break.
    });

    let totalSum = 0;

    for await (const line of rl) {
        totalSum += cardValue(line);
        console.log(totalSum);
    }
    

    return totalSum;
}

// Pass the input file path to the function
(async () => {
    const filePath = "C:/Users/joshn/Documents/Coding/Advent of Code 2023/Dec 4/Dec 4 Input.txt";
    try {
        const sum = await processFile(filePath);
        console.log(sum);
    } catch (err) {
        console.error("Error processing the file", err);
    }
})();
