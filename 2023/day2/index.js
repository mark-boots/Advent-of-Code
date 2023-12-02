import loadLines from '../../LoadLines.js'

const lines = loadLines('input.txt');
const games = lines.reduce((games, line) => {
    const [id, reaches] = line.split(": ");
    const gameId = Number(id.split(" ")[1]);
    const game = {gameId, "red": 0, "green": 0, "blue": 0};
    reaches.split("; ").forEach(reach => {
        reach.split(", ").forEach(color => {
            const [amount, name] = color.split(" ");
            if(game[name] < Number(amount)) game[name] = Number(amount);
        });
    });
    games.push(game);
    return games;
}, []);
console.log(games);

//part1
const part1 = games.reduce((sum, game) => sum += (game.red <= 12 && game.green <= 13 && game.blue <= 14) ? game.gameId : 0, 0);
console.log(part1);

//part2
const part2 = games.reduce((sum, game) => sum += game.red * game.green * game.blue, 0);
console.log(part2);