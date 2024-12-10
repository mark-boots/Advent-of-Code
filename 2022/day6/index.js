import loadLines from '../../LoadLines.js'

const line = loadLines('input.txt')[0]
const allUnique = arr => arr.length === new Set(arr).size;

function getStartOfPacketMarker(dataStream, uniqueLength){
    for(let i = uniqueLength; i < dataStream.length; i++){
        if(allUnique([...dataStream.substring(i-uniqueLength, i)])){
            return i;
        }
    }
}

console.log({
    part1: getStartOfPacketMarker(line, 4),
    part2: getStartOfPacketMarker(line, 14)
})
