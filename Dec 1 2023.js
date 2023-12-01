/*
Input is lines of text, consisting of letters and digits. On each line the _calibration value_ is found by combining the first and last digits of the line.

For example:

1abc2 = 12
pqr3stu8vwx = 38
a1b2c3d4e5f = 15
treb7uchet = 77


FOR PART 2 we must also convert words to numbers

For example:

two1nine = 29
eightwothree = 83
abcone2threexyz = 13
xtwone3four = 24
4nineeightseven2 = 97
zoneight234 = 18
7pqrstsixteen = 76

The output should be the sum of all calibration values in the input.
*/


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

// Advanced form of problem requires us to convert words to numbers
const numberWords = {
    'one': '1', 'two': '2', 'three': '3', 'four': '4', 
    'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 
    'nine': '9'};
    

const calculateSum = (input) => {
    let sum = 0;
    const lines = input.split("\n").map(line => line.trim()); // Split the input into lines and remove the whitespace

    lines.forEach(originalLine => {
        if (originalLine) {
            console.log(originalLine);
            let line = '';
            let currentWord = '';
            for (let char of originalLine) {
                currentWord += char;
                if (!isNaN(parseInt(char))) {
                    line += char;
                    currentWord = '';
                    // If the character is a number or a space, add it to the line and then reset the current word
                    }
                else {
                Object.keys(numberWords).forEach(word => {
                    if (currentWord.endsWith(word)) {
                        line += numberWords[word];
                        // If the current word ends with a number word, add the number to the line but dont reset the current word as we my have examples such as twone which translates to 2 1
                        }
                    });

                } // REMOVE ELSE FOR ANSWER TO PART 1
            }
            console.log(line);
            let firstDigit = line[0];
            let lastDigit = line[line.length - 1];
            console.log(firstDigit, lastDigit);
            // Check if both first and last digits are found and add to sum
            if (firstDigit !== '' && lastDigit !== '') {
                sum += parseInt(firstDigit + lastDigit, 10);
            }
        }
    });

    return sum;
};

// Pass the input file path to the function
(async () => {
    const filePath = 'C:/Users/joshn/Documents/Coding/Advent of Code 2023/Dec 1 Input.txt';
    const data = await readFileContent(filePath);
    if (data) {
        console.log(calculateSum(data));
    }
})();

// Output 55686