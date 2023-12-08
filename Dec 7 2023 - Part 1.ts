import fs from 'fs';

//Read data, process, and print result
fs.readFile('C:/Users/joshn/Documents/Coding/Advent of Code 2023/Dec 7/Dec 7 Input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const processedData = process(data);
    console.log(processedData);
});

// Finds winnings from the ranked hands and bids
function calculate_winnings(hand_bid: [string,number][]) {
    let winnings = 0;
    hand_bid.reverse();
    hand_bid.forEach(hand => {
        winnings += hand[1] * (hand_bid.indexOf(hand)+1);
    });
    return winnings;}

// Processes data to feed to rank function and then calculate_winnings function
function process(data: string) {
    const lines = data.split("\r\n");
    let hand_bid: [string,number][] = [];
    let hands: string[] = [];

    lines.forEach(line => {
        const [hand, bidStr] = line.split(" ");
        hand_bid.push([hand, parseInt(bidStr)]);
        hands.push(hand);
    });
    const rankedWords = rank(hands);
    // Sorts hand_bid by the index of the rankedWords
    hand_bid.sort((a, b) => rankedWords.indexOf(a[0]) - rankedWords.indexOf(b[0]));
    return calculate_winnings(hand_bid);
}

// Splits hands into bins based on hand type, sorts each bin, then combines bins into one array
function rank(hands: string[]) {
    const five_of_a_kinds:string[][] = []
    const four_of_a_kinds:string[][] = []
    const full_houses:string[][] = []
    const three_of_a_kinds:string[][] = []
    const two_pairs:string[][] = []
    const pairs:string[][] = []
    const high_cards:string[][] = []
    hands.forEach(hand => {
        const cards:string[] = hand.split("");
        if (identifyHandType(cards) === "five_of_a_kind") {
            five_of_a_kinds.push(cards);
        } else if (identifyHandType(cards) === "four_of_a_kind") {
            four_of_a_kinds.push(cards);
        } else if (identifyHandType(cards) === "full_house") {
            full_houses.push(cards);
        }
        else if (identifyHandType(cards) === "three_of_a_kind") {
            three_of_a_kinds.push(cards);
        }
        else if (identifyHandType(cards) === "two_pair") {
            two_pairs.push(cards);
        }
        else if (identifyHandType(cards) === "one_pair") {
            pairs.push(cards);
        }
        else if (identifyHandType(cards) === "high_card") {
            high_cards.push(cards);
        }});
const hand_types = [five_of_a_kinds, four_of_a_kinds, full_houses, three_of_a_kinds, two_pairs, pairs, high_cards];
const ranked: string[] = []
hand_types.forEach(hand_type => 
    inner_rank(hand_type).forEach(hand => 
        ranked.push(hand)));
return ranked;
}

// Identifies hand type
function identifyHandType(cards: string[]) {
    let counts = new Map();
    for (let card of cards) {
        counts.set(card, (counts.get(card) || 0) + 1); // Increment count of card
    }

    let frequencies = Array.from(counts.values());
    frequencies.sort((a, b) => b - a); // Sort frequencies in descending order

    if (frequencies[0] === 5) {
        return 'five_of_a_kind';
    } else if (frequencies[0] === 4) {
        return 'four_of_a_kind';
    } else if (frequencies[0] === 3 && frequencies[1] === 2) {
        return 'full_house';
    } else if (frequencies[0] === 3) {
        return 'three_of_a_kind';
    } else if (frequencies[0] === 2 && frequencies[1] === 2) {
        return 'two_pair';
    } else if (frequencies[0] === 2) {
        return 'one_pair';
    } else {
        return 'high_card';
    }}

// Sorts within each hand type by card value
function inner_rank(hand_type:string[][]) {
    const order = ["A","K","Q","J","T","9","8","7","6","5","4","3","2"];

    hand_type.sort((a:string[], b:string[]) => {
        let compare_a = 12;
        let compare_b = 12;

        for (let i = 0; i < 5; i++) {
            if (a[i] !== b[i]) {
                compare_a = order.indexOf(a[i]);
                compare_b = order.indexOf(b[i]);
                break;
            }
        }
        return compare_a - compare_b;
    });

    return hand_type.map(hand => hand.join(""));
}