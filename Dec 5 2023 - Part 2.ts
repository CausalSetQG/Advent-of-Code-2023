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

    // Reverse the order of mapping information
    info.reverse();

    // Find the seed value through a series of function calls with decreasing increments
    let newstart = find_seed(0, 100000, seed_pairs, info)
    newstart = find_seed(newstart, 1000, seed_pairs, info)
    newstart = find_seed(newstart, 100, seed_pairs, info)
    const min_location = find_seed(newstart, 1, seed_pairs, info) + 1

    // Output the calculated minimum location
    console.log(min_location)
})
.catch(err => {
  // Handle any errors that occur during file reading
  console.error('Error reading file:', err);
});

// Function to get the previous value based on a mapping atlas
function get_previous(last: number, atlas: number[][]): number {
  let previous = last;
  atlas.forEach((map) => {
    if (map[0] <= last && last < map[0] + map[2]) {
      previous = map[1] + (last - map[0]);
    }
  });
  return previous;
}

// Function to find the seed value based on a start point, increment, seed pairs, and mapping info
function find_seed(start: number, increment: number, seed_pairs: number[][], info: number[][][]): number {
  let location = start;

  while (true) {
    let seed = location;
    // Apply each mapping to the seed value
    for (const atlas of info) {
      seed = get_previous(seed, atlas);
    }

    // Check if the seed is within any of the seed pairs
    for (const seed_pair of seed_pairs) {
      if (seed >= seed_pair[0] && seed < seed_pair[0] + seed_pair[1]) {
        return (location - increment);
      }
    }

    // Increment the location and repeat the process
    location += increment;
  }
}
