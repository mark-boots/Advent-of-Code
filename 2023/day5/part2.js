import loadLines from '../../LoadLines.js'
const lines = loadLines('input.txt');

console.time("time");
// maps
const mapTypes = [];
for(let i = 1; i < lines.length; i++){
    if(lines[i]=="") continue;
    if(lines[i-1]=="") mapTypes.push([]);
    else {
        const [des,src,len] = lines[i].split(" ").map(Number);
        mapTypes[mapTypes.length-1].push([des,src,len])
    }
}

// seeds
let seeds = lines[0].match(/\d+\s\d+/g)
    .reduce((seeds, range) => {
        const [seedsStart, rangeLength] = range.split(" ").map(Number);
        seeds.push([seedsStart, seedsStart + rangeLength]);
        return seeds;
    },[]);


for (let mapType of mapTypes) {
    const newSeeds = [];

    while (seeds.length > 0) {
        const [seedsStart, seedsEnd] = seeds.pop();

        for (const [des, src, len] of mapType) {
            const overlapStart = Math.max(seedsStart, src);
            const overlapEnd = Math.min(seedsEnd, src + len);

            if (overlapStart < overlapEnd) {
                newSeeds.push([overlapStart - src + des, overlapEnd - src + des]);

                if (overlapStart > seedsStart) seeds.push([seedsStart, overlapStart]);
                if (seedsEnd > overlapEnd) seeds.push([overlapEnd, seedsEnd]);

                break;
            }
        }

        if (newSeeds.length === 0) newSeeds.push([seedsStart, seedsEnd]);
    }

    seeds = newSeeds;
}

console.log(Math.min(...seeds.map(seed => seed[0])));

console.timeEnd("time");