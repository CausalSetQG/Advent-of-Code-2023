import * as fs from 'fs';

// Read the file
fs.promises.readFile('C:/Users/joshn/Documents/Coding/Advent of Code 2023/Dec 5/Dec 5 Input.txt', 'utf8')
  .then(data => {
    // Define delimiters to split the data into different sections
    const delimiters = /seeds: |\r\n\r\nseed-to-soil map:\r\n|\r\n\r\nsoil-to-fertilizer map:\r\n|\r\n\r\nfertilizer-to-water map:\r\n|\r\n\r\nwater-to-light map:\r\n|\r\n\r\nlight-to-temperature map:\r\n|\r\n\r\ntemperature-to-humidity map:\r\n|\r\n\r\nhumidity-to-location map:\r\n/;

    // Split the data and assign it to variables
    const [seed_text, seeds_values, seed_soil_values, soil_fertilizer_values, fertilizer_water_values, water_light_values, light_temperature_values, temperature_humidity_values, humidity_location_values] = data.split(delimiters);
    const info_string = [seed_soil_values, soil_fertilizer_values, fertilizer_water_values, water_light_values, light_temperature_values, temperature_humidity_values, humidity_location_values];

    // Convert seed values into an array of numbers
    const seeds: number[] = seeds_values.split(' ').map(map => parseInt(map));
    const seed_pairs: number[][] = [];

    // Group seed values into pairs
    for (let i = 0; i < seeds.length; i += 2) {
      seed_pairs.push([seeds[i], seeds[i + 1]]);
    }

    // Initialize an array to hold the mapping information
    const info: number[][][] = [];
    
    // Process each mapping section and convert it into a list of number arrays
    info_string.forEach((value) => {
      const mappings = value.split("\r\n");
      const map_list: number[][] = [];
      mappings.forEach((map)=> {
        const map_values = map.split(' ').map(map => parseInt(map));
        map_list.push(map_values);
      })
      info.push(map_list);
    });

  // Set closest to a very large number
    let closest = 9999999999999;

// Iterate through each seed and calculate the next value based on the mappings
seeds.forEach((seed) => {
  console.log('The current seed is', seed);
  let next = seed;
  info.forEach((atlas) => {
    next = get_next(next, atlas);
    console.log(next)
  });
  console.log('Location:', next)

  // Update the closest value if the current calculation is closer
  if (next < closest) {
    closest = next;
  }
});
// print closest value
console.log(closest);

})
.catch(err => {
console.error('Error reading file:', err);
});

// Function to calculate the 'next' value based on the current seed and a given atlas (mapping)
function get_next(seed: number, atlas: number[][]): number {
let next = seed;
atlas.forEach((map) => {
if (map[1] <= seed && seed < map[1] + map[2]) {
  console.log(map)
  next = map[0] + (seed - map[1]);
}
});
return next;
}