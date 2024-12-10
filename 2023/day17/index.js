import loadLines from '../../LoadLines.js';
const directions = [ [0, 1], [1, 0], [0, -1], [-1, 0] ];
const eqArr = (arr1, arr2) =>  JSON.stringify(arr1) == JSON.stringify(arr2);
const withinGrid = (grid, row, col) => 0 <= row && row < grid.length && 0 <= col && col < grid[0].length;
const key = (arr) => JSON.stringify(arr);

const grid = loadLines("input.txt").map(l => l.split('').map(Number));
const start = { startRow: 0, startCol: 0 };
const end = { endRow: grid.length - 1, endCol: grid[0].length - 1 };

console.log({
//   part1: getSumPathLeastHeatLoss(grid, start, end, { minConsec: 1, maxConsec: 3 }), // 861
  part2: getSumPathLeastHeatLoss(grid, start, end, { minConsec: 4, maxConsec: 10}), // 1037
})

function getSumPathLeastHeatLoss(grid, { startRow, startCol }, { endRow, endCol }, { minConsec, maxConsec }) {
	const queue = [ { cost: 0, row: startRow, col: startCol, dirRow: 0, dirCol: 0, consec: 0 } ];
	const seen = new Set();

	while (queue.length) {
		const { cost, row, col, dirRow, dirCol, consec } = queue.sort((prev, next) => next.cost - prev.cost).pop();

		if(row === endRow && col === endCol && consec >= minConsec) return cost;

		const seenkey = key([row, col, dirRow, dirCol, consec]);
		if(seen.has(seenkey)) continue;
		seen.add(seenkey);

		if(consec < maxConsec && !(dirRow === 0 && dirCol === 0)){
			const newRow = row + dirRow;
			const newCol = col + dirCol;

			if(withinGrid(grid, newRow, newCol)){
				queue.push( { 
					cost: cost + grid[newRow][newCol], 
					row: newRow, 
					col: newCol, 
					dirRow, 
					dirCol, 
					consec: consec + 1,
				});
			}
		}

		if(consec >= minConsec || (dirRow === 0 && dirCol === 0)){
			directions.forEach(([newDirRow, newDirCol])=>{
				if(!eqArr([newDirRow, newDirCol], [dirRow, dirCol]) && !eqArr([newDirRow, newDirCol], [-dirRow, -dirCol])){
					const newRow = row + newDirRow;
					const newCol = col + newDirCol;

					if(withinGrid(grid, newRow, newCol)){
						queue.push({
							cost: cost + grid[newRow][newCol], 
							row: newRow, 
							col: newCol, 
							dirRow: newDirRow, 
							dirCol: newDirCol, 
							consec: 1,
						})
					}
				}
			})
			
		}
	}

	return 0;
}