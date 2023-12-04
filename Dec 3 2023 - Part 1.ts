import * as fs from 'fs';

// Function to process the input file
async function processFile(filePath: string) {
    try {
        // Reading the file content as a string
        const data = await fs.promises.readFile(filePath, 'utf8');
        // Splitting the data into lines, trimming whitespace, and then splitting each line into characters
        const matrix = data.split('\n').map((line: string) => line.trim()).map((line: string) => line.split(''));
        return matrix;
    } catch (err) {
        console.error("Error reading the file:", err);
        throw err; // Throw an error if file reading fails
    }
}
const filePath = "C:/Users/joshn/Documents/Coding/Advent of Code 2023/Dec 3/Dec 3 Input.txt";

// Calling processFile and then using the resulting matrix to calculate the sum
processFile(filePath)
    .then(matrix => {console.log(calculateSum(matrix));})
    .catch(err => console.error(err));

// Function to calculate the sum based on the matrix
function calculateSum(matrix: string[][]): number {
    let sum:number = 0;
    // Iterating over each row
    matrix.forEach((row, rowIndex) => {
        let columnIndex = 0;
        // Iterating over each character in the row
        while (columnIndex < row.length) {
            const char = row[columnIndex];
            // Check if the character is a number
            if (!isNaN(parseInt(char))) {
                let numberStr = char;
                let numberStartIndex = columnIndex;

                columnIndex++;
                // Continue to concatenate the number string if subsequent characters are numbers
                while (columnIndex < row.length && !isNaN(parseInt(row[columnIndex]))) {
                    numberStr += row[columnIndex];
                    columnIndex++;
                }

                const number:number = parseInt(numberStr);
                // Check if the number has an adjacent non-period character and add it to the sum if true
                if (hasAdjacentNonPeriodChar(rowIndex, numberStartIndex, columnIndex - 1, matrix)) {
                    sum += number;
                }
            } else {
                columnIndex++;
            }
        }
    });
    return sum;
}

// Function to check if there is a symbol (not a period or a number) adjacent to the number
function hasAdjacentNonPeriodChar(startRow: number, startCol: number, endCol: number, matrix: string[][]) {

    // Checking the rows above and below the current number
    for (let row = Math.max(startRow - 1, 0); row <= Math.min(startRow + 1, matrix.length - 1); row++) {

        // Checking the columns to the left and right of the current number
        for (let col = Math.max(startCol - 1, 0); col <= Math.min(endCol + 1, matrix[0].length - 1); col++) {

            // If the character is not a period and not a number, return true
            if (matrix[row][col] !== '.' && isNaN(parseInt(matrix[row][col]))) {
                return true;
            }
        }
    }
    return false; // Return false if no adjacent non-period, non-numeric character is found
}
