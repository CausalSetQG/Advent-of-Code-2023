//PART 1
const times = [54, 81, 70, 88];
const distances = [446, 1292, 1035, 1007];

let product = 1;
times.forEach((time, index) => {
    let distance = distances[index];
    product *= winningWays(time, distance);
    });
console.log('Part 1 Answer:', product);

//PART 2
const time = 54817088;
const distance = 446129210351007;
console.log('Part 2 Answer:', winningWays(time, distance));

//Use quadratic formula to find the number of ways to win
function winningWays(time:number, distance:number) {
    const charging_time_lower = Math.ceil((time - Math.sqrt(time * time - 4 * distance)) / 2);
    const charging_time_upper = Math.floor((time + Math.sqrt(time * time - 4 * distance)) / 2);
    return charging_time_upper - charging_time_lower + 1;
}

// distance = speed * moving time
// speed = charging time
// moving time = time - charging time
//THEREFORE distance = chargine time * (time - charging time)

// charging time^2  - time * charging time  + distance = 0
// quadratic formula: x = (-b +- sqrt(b^2 - 4ac)) / 2a
// a = 1, b = -time, c = distance
// charging time = (time +- sqrt(time^2 - 4 * distance)) / 2





