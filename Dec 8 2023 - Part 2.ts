//Starting with AAA, you need to look up the next element based on the next left/right instruction in your input.
// Following the instructions, find how many steps it takes to reach ZZZ.

import fs from 'fs';

// Read data from a file, process it, and print the result
fs.readFile('C:/Users/joshn/Documents/Coding/Advent of Code 2023/Dec 8/Dec 8 Input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    // Processing data and calculating steps
    const processedData = process(data);
    const steps = calculateSteps(processedData);
    console.log(steps);
});

// Interface for mapping node keys to their values
interface NodesObject {
    [key: string]: string;
}

// Process the raw data to a structured format
function process(data: string) {
    // Trimming whitespace and separating instructions from nodes
    const trimmedData = data.trim();
    const [instructions, nodes] = trimmedData.split("\r\n\r\n");
    const instructionsArr = instructions.split("");
    const nodesArr = nodes.split("\r\n");

    // Creating an object from node pairs
    const nodesObj: NodesObject = {};
    nodesArr.forEach(node => {
        const [key, value] = node.split(" = ");
        nodesObj[key] = value;
    });

    // Identifying start and end nodes
    let startNodes: string[] = [];
    let endNodes: string[] = [];
    for (const key in nodesObj) {
        if (key.endsWith('A')) {
            startNodes.push(key);
        } else if (key.endsWith('Z')) {
            endNodes.push(key);
        }
    }

    // Processing start nodes to determine steps
    const startNodeData: [number, number[]][] = [];
    for (const startNode of startNodes) {
        let past: [string, number][] = [];
        const endIndices: number[] = [];
        let currentNode = startNode;
        let finished = false;
        while (!finished) {
            for (let i = 0; i < instructionsArr.length; i++) {
                const newNode: [string, number] = [currentNode, i];

                // Check for reaching an end node
                if (endNodes.includes(newNode[0])) {
                    endIndices.push(past.length);
                }

                // Check for repetition to stop processing
                if (past.some(element => element[0] === newNode[0] && element[1] === newNode[1])) {
                    const repeatStartIndex = past.findIndex(element => element[0] === newNode[0] && element[1] === newNode[1]);
                    const repeatEndIndex = past.length;
                    startNodeData.push([repeatEndIndex - repeatStartIndex, endIndices]);
                    finished = true;
                    break;
                }

                past.push(newNode);
                currentNode = findNextNode(currentNode, instructionsArr[i], nodesObj);
            } 
        }
    }

    return startNodeData;
}

// Determine the next node based on current node and direction
function findNextNode(nodeKey: string, direction: string, nodesObj: NodesObject): string {
    const choices: string[] = nodesObj[nodeKey].slice(1, -1).split(", ");
    return direction === "L" ? choices[0] : choices[1];
}

// Calculate the total steps from start node data
function calculateSteps(data: [number, number[]][]): number {
    // Calculate the least common multiple (LCM) of steps data
    let result = 1;
    for (let i = 0; i < data.length; i++) {
        result = lcm(result, data[i][0]);
    }
    return result;
}

// Function to calculate the greatest common divisor (GCD)
function gcd(a: number, b: number): number {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
}

// Function to calculate the least common multiple (LCM)
function lcm(a: number, b: number): number {
    return (a * b) / gcd(a, b);
}
