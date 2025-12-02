import {readFileSync} from 'fs';
class MinHeapMap {
  /**
   * @param {T[]} arr 
   * @param {number} size 
   * @param {boolean} alreadyHeapified 
   * @param {function(T, T): number} cmp 
   * @param {boolean} trackPositions 
   */
  constructor(arr, size, alreadyHeapified, cmp, trackPositions) {
      /**
       * @type {any[]}
       */
      this.heap = arr;
      /**
       * @type {number}
       */
      this.size = size;
      /**
       * @type {function(T, T): number}
       */
      this.cmp = cmp;

      if(!alreadyHeapified) {
          this._heapify();
      }

      /**
       * @type {boolean}
       */
      this.trackPositions = trackPositions;
      if(trackPositions) {
          /**
           * @type {Map<T, number>}
           */
          this.idxByElem = new Map();
          for(let i = 0; i < size; ++i) {
              this.idxByElem.set(arr[i], i);
          }
      }
  }

  /**
   * @param {T} val 
   * @returns {boolean}
   */
  has(val) {
      if(!this.trackPositions) { throw new Error('not tracking value positions...'); }
      return this.idxByElem.has(val);
  }
  /**
   * @param {T} oldVal 
   * @param {T} newVal 
   */
  decrease(oldVal, newVal) {
      if(this.cmp(newVal, oldVal) > 0) { throw new Error('improper use of decrease'); }
      if(!this.trackPositions) { throw new Error('not tracking value positions...'); }
      let idx = /** @type {number} */ (this.idxByElem.get(oldVal));
      this.idxByElem.delete(oldVal);
      this.idxByElem.set(newVal, idx);
      this.heap[idx] = newVal;
      
      this._pushUp(idx);
  }
  /**
   * @param {T} oldVal 
   * @param {T} newVal 
   */
  increase(oldVal, newVal) {
      if(this.cmp(newVal, oldVal) < 0) { throw new Error('improper use of decrease'); }
      if(!this.trackPositions) { throw new Error('not tracking value positions...'); }
      let idx = /** @type {number} */ (this.idxByElem.get(oldVal));
      this.idxByElem.delete(oldVal);
      this.idxByElem.set(newVal, idx);
      this.heap[idx] = newVal;

      this._pushDown(idx);
  }
  /**
   * @returns {T}
   */
  peek() {
      if(this.size < 1) { throw new Error('out of bounds'); }

      return this.heap[0];
  }
  /**
   * @returns {T}
   */
  pop() {
      if(this.size < 1) { throw new Error('out of bounds'); }

      let ret = this.heap[0];
      if(this.trackPositions) { this.idxByElem.delete(ret); }
      
      this.size -= 1;
      if(this.size > 0) {
          this.heap[0] = this.heap[this.size];
          if(this.trackPositions) { this.idxByElem.set(this.heap[0], 0); }
          
          this._pushDown(0);
      }

      return ret;
  }
  /**
   * @param {T} e 
   */
  push(e) {
      if((this.heap.length-1) <= this.size) {
          this.heap.length = this.heap.length * 2;
      }
      if(this.trackPositions) { 
          if(this.idxByElem.has(e)) { throw new Error('already had element...'); }
          this.idxByElem.set(e, this.size);
      }
      this.heap[this.size] = e;
      
      this._pushUp(this.size);
      this.size += 1;
  }
  /**
   * @param {number} idx1 
   * @param {number} idx2 
   */
  _swp(idx1, idx2) {
      [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
      if(this.trackPositions) {
          this.idxByElem.set(this.heap[idx1], idx1);
          this.idxByElem.set(this.heap[idx2], idx2);
      }
  }
  /**
   * @param {number} idx 
   */
  _pushUp(idx) {
      while(idx > 0) {
          let p = Math.floor((idx-1)/2);
          
          let cmp = this.cmp(this.heap[idx], this.heap[p]);
          if(cmp < 0) {
              this._swp(idx, p);
              idx = p;
          } else {
              break;
          }
      }
  }
  /**
   * @param {number} idx 
   */
  _pushDown(idx) {
      while(true) {
          let l = idx*2 + 1;
          let r = l + 1;

          if(l >= this.size) { break; }

          let cmpL = this.cmp(this.heap[idx], this.heap[l]);
          let cmpR = -1;
          if(r < this.size) {
              cmpR = this.cmp(this.heap[idx], this.heap[r])
          }

          if(cmpL > 0 && cmpR > 0) {
              let cmpBoth = this.cmp(this.heap[l], this.heap[r]);
              let next = cmpBoth < 0 ? l : r;
              this._swp(idx, next);
              idx = next;
          } else if(cmpL > 0) {
              this._swp(idx, l);
              idx = l;
          } else if(cmpR > 0) {
              this._swp(idx, r);
              idx = r;
          } else {
              break;
          }
      }
  }

  _heapify() {
      for(let i= Math.floor(this.size/2) - 1; i>=0; --i) {
          this._pushDown(i);
      }
  }
}

function readInputToLines(filename, skipTrim) {
  let lines = readFileSync(filename, 'utf-8');
  if(!skipTrim) { lines = lines.trim(); }
  return lines.split(/\r?\n/);
}

let DIRECTIONS = [[-1, 0], [0, 1], [1, 0], [0, -1]]

export default function day16() {
    let input = readInputToLines('input.txt').map(x => x.split(''));


    let startX, startY, endX, endY;
    for(let i = 0; i < input.length; ++i) {
        for(let j = 0; j < input.length; ++j) {
            if(input[i][j] === 'S') {
                startX = j;
                startY = i;
            } else if(input[i][j] === 'E') {
                endX = j;
                endY = i;
            }
        }
    }

    let seen = new Array(input.length*input[0].length*4).fill(0);
    let h = new MinHeapMap([], 0, true, cmp, false);

    seen[startY*input[0].length*4 + startX + 1] = 1;

    //cost, x, y, direction
    h.push([0, startX, startY, 1]);
    while(h.size) {
        let [cost, x, y, direction] = h.pop();

        if(x === endX && y === endY) {
            return cost;
        }

        //l, r
        for(let dir of [(DIRECTIONS.length+(direction - 1))%DIRECTIONS.length, (DIRECTIONS.length+(direction + 1))%DIRECTIONS.length]) {
            let dpIdx = y*input[0].length*4 + x*4 + dir;
            if(seen[dpIdx]) { continue; }
            seen[dpIdx] = 1;

            h.push([cost + 1000, x, y, dir]);
        }

        //forwards
        {
            let newY = DIRECTIONS[direction][0] + y;
            let newX = DIRECTIONS[direction][1] + x;
            let dpIdx = newY*input[0].length*4 + newX*4 + direction;
            if(seen[dpIdx]) { continue; }
            if(input[newY][newX] === '#') { continue; }
            seen[dpIdx] = 1;
            
            h.push([cost+1, newX, newY, direction]);
        }
        
    }

    function cmp(a, b) {
        return a[0] - b[0];
    }
}

console.time()
console.log(day16());
console.timeEnd()