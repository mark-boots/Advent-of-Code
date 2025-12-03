import loadLines from '../../LoadLines.js';
const input = loadLines("input.txt");

    let part1 = 0, part2 = 0;
    for(const bank of input){
        part1 += maxJoltageFromBank(bank, 2);
        part2 += maxJoltageFromBank(bank, 12);
    }
    console.log({ part1, part2 });

    function maxJoltageFromBank(bankDigits, digitsToKeep) {
    let removalsLeft = bankDigits.length - digitsToKeep;
    const stack = [];

    for (const digit of bankDigits) {
        while (removalsLeft > 0 && stack.at(-1) < digit) {
            stack.pop();
            removalsLeft--;
        }
        stack.push(digit);
    }

    return Number(stack.slice(0, digitsToKeep).join(""));
    }