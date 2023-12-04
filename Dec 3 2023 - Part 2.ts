import * as fs from 'fs';

// Function to read and process the file, converting it into a 2D matrix of characters
async function processFile(filePath: string) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        // Splitting the data into lines, trimming each line, and splitting each line into characters
        const matrix = data.split('\n').map((line: string) => line.trim()).map((line: string) => line.split(''));
        return matrix;
    } catch (err) {
        console.error("Error reading the file:", err);
        throw err;
    }
}
const filePath = "C:/Users/joshn/Documents/Coding/Advent of Code 2023/Dec 3/Dec 3 Input.txt";

// Process the file and then calculate the sum based on the matrix
processFile(filePath)
    .then(matrix => {console.log(calculateSum(matrix));})
    .catch(err => console.error(err));

// Function to calculate the sum of numbers adjacent to gears
function calculateSum(matrix: string[][]): number {
    const gears: [number, string][] = []; // Array to store numbers and their adjacent gear coordinates
    
    // Iterate over each row of the matrix
    matrix.forEach((row, rowIndex) => {
        let columnIndex = 0;
        while (columnIndex < row.length) {
            const char = row[columnIndex];
            // Check if the current character is a number
            if (!isNaN(parseInt(char))) {
                let numberStr = char;
                let numberStartIndex = columnIndex;
    
                columnIndex++;
                // Continue to build the number string if subsequent characters are also numbers
                while (columnIndex < row.length && !isNaN(parseInt(row[columnIndex]))) {
                    numberStr += row[columnIndex];
                    columnIndex++;
                }
    
                const number: number = parseInt(numberStr);
    
                // Check for gears around the number and store their coordinates
                for (let r = Math.max(rowIndex - 1, 0); r <= Math.min(rowIndex + 1, matrix.length - 1); r++) {
                    for (let c = Math.max(numberStartIndex - 1, 0); c <= Math.min(numberStartIndex + numberStr.length, row.length - 1); c++) {
                        if (matrix[r][c] === '*') {    
                            gears.push([number, `${r},${c}`]);
                        }
                    }
                }
            } else {
                columnIndex++;
            }
        }
    });
    
    // Calculate the sum based on gears and their adjacent numbers
    return doubleGearsSum(gears);
}

// Function to calculate the sum of products of numbers adjacent to the same gear
function doubleGearsSum(gears: [number, string][]): number {
    let sum = 0;
    const gearCoords = new Map<string, number[]>(); // Map to store gears and their adjacent numbers
    
    // Populate the map with coordinates and numbers
    gears.forEach(([number, coord]) => {
        if (!gearCoords.has(coord)) {
            gearCoords.set(coord, []);
        }
        gearCoords.get(coord)?.push(number);
    });
    
    // Calculate the sum of products of numbers adjacent to the same gear when exactly two numbers are adjacent
    gearCoords.forEach(numbers => {
        if (numbers.length === 2) {
            sum += numbers[0] * numbers[1];
        }
    });
    
    return sum;
}
