import fs from 'fs';

export default function loadLines(fileName, split = true) {
  const lines = fs.readFileSync(fileName, 'utf8');
  return split ? lines.split('\r\n') : lines;
}