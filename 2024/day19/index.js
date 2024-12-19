import loadLines from '../../LoadLines.js';
const [patterns, designs] = loadLines("input.txt", false).split("\r\n\r\n").map(l => l.match(/\w+/g));

let possibleDesigns = 0, totalWays = 0;
for (const design of designs) {
  const dp = Array(design.length + 1).fill(0);
  dp[0] = 1; 
  for (let i = 1; i <= design.length; i++) {
    patterns.forEach(pattern => {
      if (i >= pattern.length && design.slice(i - pattern.length, i) === pattern) {
        dp[i] += dp[i - pattern.length];
      }
    });
  }
  if (dp[design.length] > 0) {
    possibleDesigns++;
    totalWays += dp[design.length];
  }
}
console.log({ possibleDesigns, totalWays });