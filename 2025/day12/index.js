import loadLines from '../../LoadLines.js';
let bs=loadLines('input.txt', false).split('\r\n\r\n');
let rs=bs.pop().split('\r\n').map(l=>l.split(/\D+/));
let ss=bs.map(b=>b.match(/#/g).length);
console.log(rs.filter(([w,h,...q])=>w*h>=q.reduce((s,c,i)=>s+c*ss[i],0)).length);