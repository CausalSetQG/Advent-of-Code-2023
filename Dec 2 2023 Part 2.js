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
            console.log(game);
            const [gameNumberPart, setsData] = game.split(': ');
            const gameNumber = parseInt(gameNumberPart.replace('Game ', ''));
            const sets = setsData.split('; ');
            // Isolate the game number and the sets
              
            const colourCounts = { red: 0, green: 0, blue: 0 };
            sets.forEach(set => {
                const colours = set.split(', ');
                colours.forEach(colourCount => {
                    const [count, colour] = colourCount.split(' ');
                    if (parseInt(count) > colourCounts[colour]) {
                        colourCounts[colour] = parseInt(count);
                        }
                    // Find the minumum number of each color so that all sets in a game are valid.
                });
            });
            console.log(colourCounts);
            let minPower = Object.values(colourCounts).reduce((acc, currentValue) => acc * currentValue, 1)
            console.log(minPower);
            sum += minPower;
            
        }
    });
        
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