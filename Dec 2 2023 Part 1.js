// Read input from file
const fs = require('fs').promises;

async function readFileContent(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error("Error reading the file", err);
    }
}

const calculateSum = (input) => {
    let sum = 0;
    const games = input.split("\n").map(game => game.trim()); // Split the input into lines and remove the whitespace

    games.forEach(game => {
        if (game) {
            const [gameNumberPart, setsData] = game.split(': ');
            const gameNumber = parseInt(gameNumberPart.replace('Game ', ''));
            const sets = setsData.split('; ');
            // Isolate the game number and the sets
              
            let isGameValid = true;
            sets.forEach(set => {
                const colours = set.split(', ');
                const colourCounts = { red: 0, green: 0, blue: 0 };
                colours.forEach(colourCount => {
                    const [count, colour] = colourCount.split(' ');
                    colourCounts[colour] = parseInt(count);
                    // Count the number of red, green and blue cubes in the set 
                });
                
                // For each set, check if the number of red, green and blue cards is valid
                if (colourCounts.red > 12 || colourCounts.green > 13 || colourCounts.blue > 14) {
                  isGameValid = false;
                }
            });
            
            if (isGameValid) {
                sum += gameNumber;
            }
            }});
        
            return sum;
        };

// Pass the input file path to the function
(async () => {
    const filePath = 'C:/Users/joshn/Documents/Coding/Advent of Code 2023/Dec 2 Input.txt';
    const data = await readFileContent(filePath);
    if (data) {
        console.log(calculateSum(data));
    }
})();