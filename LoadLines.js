import fs from 'fs';

export default function loadLines(fileName, split = true){
    const lines = fs.readFileSync(fileName, 'utf8');
    if(!split) return lines;  
    return lines.split('\r\n')
}
