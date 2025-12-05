import loadLines from '../../LoadLines.js';
const input = loadLines("input.txt").map(l => l.split('x').map(Number));


console.log(
    input.reduce((total, [l, w, h]) => {
        const sides = [l * w, w * h, h * l];
        const slack = Math.min(...sides);
        const surfaceArea = 2 * sides.reduce((a, b) => a + b, 0);
        total.part1 += surfaceArea + slack;
        
        const perimeters = [2 * (l + w), 2 * (w + h), 2 * (h + l)];
        const smallestPerimeter = Math.min(...perimeters);
        total.part2 += smallestPerimeter + (l * w * h);

        return total
    }, {part1: 0, part2: 0})
)
