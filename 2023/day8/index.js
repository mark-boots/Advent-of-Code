import loadLines from '../../LoadLines.js';

const lines = loadLines('input.txt');
const instructions = lines[0];
const nodes = lines.slice(2).reduce((nodes, node)=>{
    const [key,L,R] = node.match(/\w{3}/g);
    nodes[key]={L,R};
    return nodes;
},{})

console.log({
    part1: getSteps({from: "AAA", to: "ZZZ"}), // 20777
    part2: getSteps({from: "..A", to: "..Z"})  // 13289612809129
})

function getSteps({from, to}){
    const current = Object.keys(nodes).filter(node => new RegExp(from).test(node));
    const steps = Array(current.length).fill(0);
    current.forEach((node, idx) => {
        while(!new RegExp(to).test(node)){
            const instruction = instructions[steps[idx] % instructions.length];
            node = nodes[node][instruction];
            steps[idx]++;
        }
    })
    const gcd = (a, b) => a ? gcd(b % a, a) : b;
    const lcm = (a, b) => a * b / gcd(a, b);
    return steps.length ? steps.reduce(lcm) : 0;
}