//Starting with AAA, you need to look up the next element based on the next left/right instruction in your input.
// Following the instructions, find how many steps it takes to reach ZZZ.

import fs from 'fs';

// Read data, process, and print result
fs.readFile('C:/Users/joshn/Documents/Coding/Advent of Code 2023/Dec 8/Dec 8 Input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const processedData = process(data);
    console.log(processedData);
});

interface NodesObject {
    [key: string]: string;
}

function process(data: string) {
    const trimmedData = data.trim();
    const [instructions, nodes] = trimmedData.split("\r\n\r\n");
    const instructionsArr = instructions.split("");
    const nodesArr = nodes.split("\r\n");
    const nodesObj: NodesObject = {};
    nodesArr.forEach(node => {
        const [key, value] = node.split(" = ");
        nodesObj[key] = value;
    });

    let currentNode = "AAA";
    let steps = 0;
    let notFinished = true;
    while (notFinished) {
        for (const direction of instructionsArr) {
            currentNode = findNextNode(currentNode, direction, nodesObj);
            steps++;
            if (currentNode === "ZZZ") {
                notFinished = false;
                break;
            }
        }
    }
    return steps;
}

function findNextNode(nodeKey: string, direction: string, nodesObj: NodesObject):string {
    const choices: string[] = nodesObj[nodeKey].slice(1, -1).split(", ");
    if (direction === "L") {
        return choices[0];
    } else {
        return choices[1];
    }
}
