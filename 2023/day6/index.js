const ways = (time, dist) => {
    let count = 0;
    for(let i = 0; i < time; i++) {
        if((time - i) * i > dist ) count++;
    }
    return count;
}

console.log({
    part1: [[47,207],[84,1394],[74,1209],[67,1014]].reduce((prod,val)=> prod *= ways(...val), 1),
    part2: ways(47847467,207139412091014)
})