import loadLines from "../../LoadLines.js";
const map = loadLines("input.txt").map((line) => line.split(""));
const directions = [[-1, 0],[0, 1],[1, 0],[0, -1]];
const height = map.length;
const width = map[0].length;
const visited = new Set();
const key = (...args) => args.join(",");
const unkey = (str) => str.split(",").map(Number);
const result = { part1: 0, part2: 0 };


for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (visited.has(key(y,x))) continue;
    const region = findRegion(y, x);
    result.part1 += region.size * calculatePerimeter(region);
    result.part2 += region.size * calculateSides(region);
  }
}
console.log(result); // { part1: 1464678, part2: 877492 }

function findRegion(startY, startX) {
  const region = new Set([`${startY},${startX}`]);
  const regionValue = map[startY][startX];
  const queue = [[startY, startX]];
  const getCellValue = (y, x) => y < 0 || x < 0 || y >= height || x >= width ? null : map[y][x];

  while (queue.length > 0) {
    const [currentY, currentX] = queue.shift();

    for (const [dy, dx] of directions) {
      const neighborY = currentY + dy;
      const neighborX = currentX + dx;
      const neighborKey = key(neighborY,neighborX);

      if (getCellValue(neighborY, neighborX) === regionValue && !visited.has(neighborKey)){
        visited.add(neighborKey);
        region.add(neighborKey);
        queue.push([neighborY, neighborX]);
      }
    }
  }
  return region;
}

function calculatePerimeter(region) {
  let perimeter = 0;
  for (const cell of region) {
    const [y, x] = unkey(cell);
    for (const [dy, dx] of directions) {
      const ny = y + dy;
      const nx = x + dx;
      if (!region.has(key(ny,nx))) perimeter++;
    }
  }
  return perimeter;
}

function calculateSides(region) {
  const seenSides = new Set();
  let sideCount = 0;

  for (const cell of region) {
    const [y, x] = cell.split(",").map(Number);

    for (const [dy, dx] of directions) {
      if (region.has(key(y+dy,x+dx))) continue;
      let [edgeY, edgeX] = [y, x];
      while (region.has(key(edgeY+dx, edgeX+dy)) && !region.has(key(edgeY+dy,edgeX+ dx))){
        edgeY += dx;
        edgeX += dy;
      }

      const sideKey = key(edgeY,edgeX,dy,dx);
      if (!seenSides.has(sideKey)) {
        seenSides.add(sideKey);
        sideCount++;
      }
    }
  }

  return sideCount;
}
