import loadLines from '../../LoadLines.js'

// const lines = loadLines('example.txt');
const lines = loadLines('input.txt');

const foods = lines.reduce((elfs, food) => {
    food.length ? elfs[elfs.length - 1] += Number(food) : elfs.push(0)
    return elfs;
}, []);

const [one,two,tree] = foods.sort((a,b)=>b-a);
console.log(one + two + tree);