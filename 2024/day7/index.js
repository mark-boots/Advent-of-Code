// load + prepare
import loadLines from '../../LoadLines.js';
const equations = loadLines("input.txt").map(l => {
  const [result, ...values] = l.split(/: | /g).map(Number);
  return {result, values}
})

console.log({ 
  part1: calibrationResult("part1"), 
  part2: calibrationResult("part2")
}) // { part1: 3749, part2: 11387 }

// part 1 + 2
function calibrationResult(part){
  return equations.reduce((sum, equation) => {
    return hasPossibleEquation(equation, part) ? sum + equation.result: sum
  }, 0)
}

function hasPossibleEquation({ result, values}, part) {
  const buildAndCheck = (idx, currentValue) =>{
      if (idx === values.length) return currentValue === result;
        return (
          buildAndCheck(idx + 1, currentValue + values[idx]) ||
          buildAndCheck(idx + 1, currentValue * values[idx]) ||
          (part == 'part2' && buildAndCheck(idx + 1, parseInt(`${currentValue}${values[idx]}`)))
        )    
  }
  return buildAndCheck(1, values[0]);
}