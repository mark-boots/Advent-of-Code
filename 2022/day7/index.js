import loadLines from '../../LoadLines.js'

// const lines = loadLines('example.txt');
const lines = loadLines('input.txt');

const dirs = getDirectorySizes(lines);
const part1 = getSumOfTotalSizes(dirs);
const part2 = getSmallestDirToDelete(dirs);
console.log({part1, part2})

function getDirectorySizes(lines) {
    const dirs = new Map();
    let currentDirectory = ["."];

    for (let line of lines) {
        if (getType(line) === 'command') {
        let [, command, arg] = line.split(' ');

            if (command === 'cd') {
                if (arg === '/') currentDirectory.splice(1);
                else if (arg === '..') currentDirectory.pop();
                else currentDirectory.push(arg)
            }
        }

        if (getType(line) === 'file') {
            const [size] = line.split(' ');
            const key = currentDirectory.join('/');

            dirs.set(key, (dirs.get(key) || 0) + Number(size));

            if (currentDirectory.length > 1) {
                for (let i = currentDirectory.length - 1; i > 0; i--) {
                    const parentKey = currentDirectory.slice(0, i).join('/');
                    dirs.set(parentKey, (dirs.get(parentKey) || 0) + Number(size));
                }
            }
        }
    }

    return dirs;
}

function getType(line) {
    if (line.startsWith('$')) return 'command';
    if (line.startsWith('dir')) return 'directory';
    return 'file';
}

function getSumOfTotalSizes(dirs) {    
    let total = 0;
    for (let size of dirs.values()) {
      if (size <= 100_000) {
        total += size;
      }
    }
    return total;
}

function getSmallestDirToDelete(dirs) {

    const minRequired = dirs.get(".") - (70_000_000 - 30_000_000);
    let smallest = Infinity;
  
    for (let size of dirs.values()) {
      if (size >= minRequired && size < smallest) {
        smallest = size;
      }
    }
  
    return smallest;
  }