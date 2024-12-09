// load + prepare
import loadLines from '../../LoadLines.js';
const numbers = loadLines("input.txt",false).split("").map(Number);


console.log({
  part1: solve(numbers, 1), //6334655979668
  part2: solve(numbers, 2)  //6349492251099
})

function solve(numbers, part) {
  const disk = [];
  let fileId = 0;
  numbers.forEach((length, index) => disk.push(...Array(length).fill(index % 2 ? "." : fileId++)));

  const compactedDisk = part == 1 ? compactDiskPart1(disk) : compactDiskPart2(disk)
  return compactedDisk.reduce((sum, fileId, pos) => fileId === "." ? sum : sum + pos * fileId, 0);
}

// part 1
function compactDiskPart1([...disk]){
  while (true) {
    const firstGap = disk.indexOf(".");
    if (firstGap === -1) break;

    let lastFilePos = disk.length - 1;
    while (lastFilePos >= 0 && disk[lastFilePos] === ".") {
      lastFilePos--;
    }

    if (lastFilePos <= firstGap) break;

    disk[firstGap] = disk[lastFilePos];
    disk[lastFilePos] = ".";
  }
  return disk;
}

// part 2
function compactDiskPart2([...disk]){
  const files = findFiles(disk).sort((a, b) => b.id - a.id)
  for (const file of files) {
    const newPos = findFreeSpace(disk, file.start, file.length);
    if (newPos !== -1) moveFile(disk, file, newPos);
  }
  return disk
}

function findFiles(disk) {
  const files = new Map();
  for (let i = 0; i < disk.length; i++) {
    const id = disk[i];
    if (id === ".") continue;
    if (!files.has(id)) files.set(id, { id, start: i, length: 1});
    else files.get(id).length++;  
  }
  return [...files.values()]
}
function findFreeSpace(disk, start, length) {
  let currentLength = 0;
  let currentStart = -1;

  for (let i = 0; i < start; i++) {
    if (disk[i] === ".") {
      if (currentStart === -1) currentStart = i;
      currentLength++;
      if (currentLength === length) return currentStart;
    } else {
      currentLength = 0;
      currentStart = -1;
    }
  }
  return -1;
}
function moveFile(disk, file, newStart) {
  for (let i = file.start; i < file.start + file.length; i++) disk[i] = ".";
  for (let i = 0; i < file.length; i++) disk[newStart + i] = file.id;
  return disk
}