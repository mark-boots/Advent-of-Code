import loadLines from '../../LoadLines.js';

const bounds = (x1,y1,x2,y2) => [ Math.min(x1,x2), Math.min(y1,y2), Math.max(x1,x2), Math.max(y1,y2) ];
const area = (x1,y1,x2,y2) => (x2-x1+1)*(y2-y1+1);
const areaDesc = (a,b) => area(...b)-area(...a);

const red = loadLines("input.txt").map(s => s.split(",").map(Number));
const pairs = red.flatMap((p,i) => red.slice(i+1).map(q => bounds(...p,...q))).sort(areaDesc);
const lines = red.map((p,i) => bounds(...p,...red[(i+1) % red.length])).sort(areaDesc);
const good = pairs.find(([l,t,r,b]) => !lines.find(([lx,ly,rx,ry]) => lx<r && ly<b && rx>l && ry>t));

console.log({ p1: area(...pairs[0]), p2: area(...good) });