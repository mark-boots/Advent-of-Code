import loadLines from '../../LoadLines.js'
const lines = loadLines('input.txt');

// prepare
const maps = {}
let current;
for(let i = 1; i < lines.length; i++){
    if(lines[i]=="") continue;
    if(lines[i-1]==''){
        const [src, dest] = lines[i].split(" ")[0].split("-to-");
        maps[src] = { dest, ranges:[] }
        current = src;
    } else {
        const [destStart, srcStart, rangeLength] = lines[i].match(/\d+/g).map(Number)
        maps[current].ranges.push({destStart, srcStart, rangeLength})
    }
}
function getAllSeedLocations(seeds){
    return seeds.reduce((seeds, seed) => [...seeds, getLocations(seed)],[])
}
function getLocations(seed, src="seed", locations={}){
    locations[src]=seed;
    if(src == 'location') return locations;
    
    const range = maps[src].ranges.find(range=> {
        return seed >= range.srcStart && seed < range.srcStart + range.rangeLength
    });
    
    if(range) seed = seed - range.srcStart + range.destStart;
    return getLocations(seed, maps[src].dest, locations)
}
// part 1
const part1Seeds = lines[0].match(/\d+/g).map(Number)
const part1 = Math.min(...getAllSeedLocations(part1Seeds).map(seed => seed.location))
console.log(part1);
