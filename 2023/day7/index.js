import loadLines from '../../LoadLines.js'

console.log({
    part1: getScore('part1'),
    part2: getScore('part2')
});

function getScore(part){
    const lines = loadLines('input.txt');
    const hands = lines.map((line)=>{
        const [hand, bid] = line.split(" ");
        const cards = hand.split("");
        return {
            cards,
            bid: Number(bid),
            combVal: getcombVal(cards, part),
            cardsVal: getcardsVal(cards, part),
        }
    }).sort((a,b)=> a.combVal - b.combVal || a.cardsVal - b.cardsVal);
    return hands.reduce((score, hand, rank) => score += hand.bid * (rank + 1), 0);
}

function getcombVal(cards, part) {
    const combinations = ['11111','2111','221','311','32','41','5'];
    const set = cards.reduce((obj,card)=> (obj[card] = (obj[card] || 0) + 1, obj), {})
        
    if(part == 'part1 ') {
        return combinations.indexOf(Object.values(set).sort((a,b)=>b-a).join(""));
    } else if(part =='part2') {
        const jokers = set.J || 0;
        delete set.J;
        const sorted = Object.values(set).sort((a,b)=>b-a);
        sorted[0] = (sorted[0]|| 0) + jokers;
        return combinations.indexOf(sorted.join(""));
    }
}
function getcardsVal(cards, part){
    let cardValues = { part1: '23456789TJQKA', part2: 'J23456789TQKA' };
    const totalValue = cards.reduce((value, card)=> value += cardValues[part].indexOf(card).toString().padStart(2,"0"), "");
    return Number(totalValue);
}