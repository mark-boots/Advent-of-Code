import loadLines from '../../LoadLines.js';

const [links, from, to] = loadLines("input.txt").reduce(([links, from, to], line) => {
    const [name, ...components] = line.match(/\w+/g);
    console.log({name, components})
    for(let component of components) {
        links[name] ??= [];
        links[name].push(component);
        links[component] ??= [];
        links[component].push(name);
        from.add(name);
        to.add(component);
    }
    return [links, from, to];
},[{}, new Set(), new Set()])


console.log("all keys")
console.log(links);
// console.log("from")
// Array.from(from).forEach(f => console.log(f));
// console.log("to")
// Array.from(to).forEach(t => console.log(t));