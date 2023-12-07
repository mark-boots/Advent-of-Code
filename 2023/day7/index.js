import loadLines from '../../LoadLines.js'

console.log({
    part1: totalWinnings({deck:'23456789TJQKA'}),
    part2: totalWinnings({deck:'J23456789TQKA', joker: true})
});

function totalWinnings({deck, joker=false}){
    return loadLines('input.txt')
        .map(line => line.split(" "))
        .sort((a,b)=> score(a[0], joker) - score(b[0], joker) || weight(a[0], deck) - weight(b[0], deck))
        .reduce((winnings, hand, rank) => winnings += hand[1] * (rank + 1), 0);
}
function score([...cards], joker) {
    const scores = ['11111','2111','221','311','32','41','5'];
    const set = cards.reduce((obj,card)=> (obj[card] = (obj[card] || 0) + 1, obj), {})
    if(joker) {
        const jokers = set.J || 0;
        delete set.J;
        const sorted = Object.values(set).sort((a,b)=>b-a);
        sorted[0] = (sorted[0]|| 0) + jokers;
        return scores.indexOf(sorted.join("")); 
    } else return scores.indexOf(Object.values(set).sort((a,b)=>b-a).join(""));
}
function weight([...cards], deck){
    return cards.reduce((value, card)=> value += deck.indexOf(card).toString().padStart(2,"0"), "") * 1;
}