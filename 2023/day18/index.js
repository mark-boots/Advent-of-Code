import loadLines from '../../LoadLines.js';

function getArea(part){
    const { length, coords } = loadLines("input.txt").reduce(( {length, coords}, line) => {
        const [dir, steps] = parse(line, part)
        coords.push({
            y: coords.at(-1).y += {'U': -steps, 'D': steps}[dir] || 0, 
            x: coords.at(-1).x += {'L': -steps, 'R': steps}[dir] || 0,
        })
        return { length: length += Number(steps), coords };     
    },{ length: 0, coords: [ {y: 0, x: 0} ] });
    
    const area = Math.abs(coords.reduce((s, c, i, a) => i == 0 ? s : s + a[i-1].x * c.y - c.x * a[i-1].y, 0) / 2) + 1;
    return length + (area - length / 2);
};
function parse(line, part){
    let [dir, steps, hex] = line.split(" ");
    if(part == 1) return [dir, Number(steps)];
    if(part == 2) {
        let [,steps,dir] = hex.slice(2, -1).match(/(.{5})(.)/).map(v => parseInt(v, 16));
        return ['RDLU'[dir], steps];
    };
};
console.log({ part1: getArea(1), part2: getArea(2) }) // { part1: 70253, part2: 131265059885080 } 