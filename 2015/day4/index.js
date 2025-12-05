import md5 from 'md5';
const input = "iwrupvqb";
console.log({
    part1: mine(5),
    part2: mine(6),
})

function mine(leadingZeros){
    let index = 0;
    const target = '0'.repeat(leadingZeros);
    while(true){
        const hash = md5(input + index);
        if(hash.startsWith(target)) return index;
        index++;
    }
}
