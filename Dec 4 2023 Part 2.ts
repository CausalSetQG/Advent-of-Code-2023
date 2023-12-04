import * as fs from 'fs';
import * as readline from 'readline';

// Function to calculate the number of matching numbers (wins) in a card
function cardValue(line: string): number {
    const [cardNumber, cardData] = line.split(": ");
    const [answerData, guessData] = cardData.split(" | ");
    const guesses = guessData.trim().split(/\s+/);
    const answers = answerData.trim().split(/\s+/);
    let wins = 0;
    guesses.forEach(guess => {
        answers.forEach(answer => {
            if (guess === answer) {
                wins += 1;
            }
        });
    });
    return wins;
}

// Using a ReadStream and Readline to process the file to minimize memory usage. This was not strictly necessary for this problem, but is good practice.
async function processFile(filePath: string): Promise<number> {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity // Recognize all instances of CR LF ('\r\n') as a single line break.
    });

    // Count the number of lines (cards) in the file
    let lineCount = 0;
    for await (const line of rl) {
        lineCount++;
    }
    // Could have just used lineCount = 218, but this is more general

    // Re-initialize the readline interface to read the file again
    rl.close();
    fileStream.destroy();
    const fileStream2 = fs.createReadStream(filePath);
    const rl2 = readline.createInterface({
        input: fileStream2,
        crlfDelay: Infinity
    });

    // Initialise the multipliers, card number and total sum
    let totalSum = 0;
    let Card = 0;
    const multiplier: number[] = [];
    for (let i = 0; i < lineCount; i++) {
        multiplier.push(1);
    }

    // Process each line, updating the multipliers accordingly
    for await (const line of rl2) {
        for (let i = Card + 1; i <= Card + cardValue(line); i++) {
            if (i < lineCount) {
                multiplier[i] += multiplier[Card];
            }
        }
        Card++;
    }
    
    // Sum the total number of cards
    for (let i = 0; i < lineCount; i++) {
        totalSum += multiplier[i];
    }

    return totalSum;
}

// Execute
(async () => {
    const filePath = "C:/Users/joshn/Documents/Coding/Advent of Code 2023/Dec 4/Dec 4 Input.txt";
    try {
        const sum = await processFile(filePath);
        console.log(sum);
    } catch (err) {
        console.error("Error processing the file", err);
    }
})();
