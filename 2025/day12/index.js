import loadLines from '../../LoadLines.js';
const bs = loadLines('input.txt', false).split('\r\n\r\n');
const rs = bs.pop().split('\r\n').map(l=>l.split(/\D+/));
const ss = bs.map(b=>b.match(/#/g).length);
console.log(rs.filter(([w,h,...q])=>w*h>=q.reduce((s,c,i)=>s+c*ss[i],0)).length);