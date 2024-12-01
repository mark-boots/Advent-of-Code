<textarea id="input"></textarea>
<textarea id="output"></textarea>
<button id="btn" onclick="solve()">Solve</button>
<!--<script>
  function solve() {
    var input = document.getElementById("input").value;
    input = input.replace(/ /gm, "").split("\n").filter(x => !x.match(/^\s*$/gm));
    let solution = 0;

    let bricks = input.map(x => {
      let raw = x.split("~").map(y => y.split(",").map(z => parseInt(z)));
      return {
        start: { x: raw[0][0], y: raw[0][1], z: raw[0][2] },
        end: { x: raw[1][0], y: raw[1][1], z: raw[1][2] }
      };
    });

    //occupation
    let occ = new Map();
    bricks.forEach(b => {
      for (let x = b.start.x; x <= b.end.x; x++) {
        for (let y = b.start.y; y <= b.end.y; y++) {
          for (let z = b.start.z; z <= b.end.z; z++) {
            let key = `${x},${y},${z}`;
            if (occ.has(key)) {
              console.error("overlap");
            } else {
              occ.set(key, b);
            }
          }
        }
      }
    });

    //fall
    let step = true;
    while (step) {
      step = false;
      for (let brick of bricks) {
        let fall = true;
        for (let x = brick.start.x; x <= brick.end.x; x++) {
          for (let y = brick.start.y; y <= brick.end.y; y++) {
            for (let z = brick.start.z; z <= brick.end.z; z++) {
              if (z - 1 <= 0) {
                fall = false;
              } else {
                let key = `${x},${y},${z - 1}`;
                if (occ.has(key) && occ.get(key) != brick) {
                  fall = false;
                }
              }
            }
          }
        }
        if (fall) {
          step = true;
          for (let x = brick.start.x; x <= brick.end.x; x++) {
            for (let y = brick.start.y; y <= brick.end.y; y++) {
              for (let z = brick.start.z; z <= brick.end.z; z++) {
                let key = `${x},${y},${z}`;
                occ.delete(key);
              }
            }
          }
          brick.start.z--;
          brick.end.z--;
          for (let x = brick.start.x; x <= brick.end.x; x++) {
            for (let y = brick.start.y; y <= brick.end.y; y++) {
              for (let z = brick.start.z; z <= brick.end.z; z++) {
                let key = `${x},${y},${z}`;
                occ.set(key, brick);
              }
            }
          }
        }

      }
    }

    //dependencies
    let above = new Map();
    let below = new Map();
    for (let brick of bricks) {
      above.set(brick, new Set());
      below.set(brick, new Set());
    }
    for (let brick of bricks) {
      for (let x = brick.start.x; x <= brick.end.x; x++) {
        for (let y = brick.start.y; y <= brick.end.y; y++) {
          for (let z = brick.start.z; z <= brick.end.z; z++) {
            let key = `${x},${y},${z + 1}`;
            if (occ.has(key)) {
              let other = occ.get(key);
              if (other != brick) {
                above.get(brick).add(other);
                below.get(other).add(brick);
              }
            }
          }
        }
      }
    }

    console.log(above);
    console.log(below);

    //save to remove
    for (let brick of bricks) {
      let save = true;
      for (let brickAbove of above.get(brick)) {
        if (below.get(brickAbove).size == 1) {
          save = false;
        }
      }
      if (save) {
        solution++;
      }
    }

    var output = document.getElementById("output").value = solution;
  }


</script>-->
<script>
  function solve() {
    var input = document.getElementById("input").value;
    input = input.replace(/ /gm, "").split("\n").filter(x => !x.match(/^\s*$/gm));
    let solution = 0;

    let bricks = input.map(x => {
      let raw = x.split("~").map(y => y.split(",").map(z => parseInt(z)));
      return {
        start: { x: raw[0][0], y: raw[0][1], z: raw[0][2] },
        end: { x: raw[1][0], y: raw[1][1], z: raw[1][2] }
      };
    });

    //occupation
    let occ = new Map();
    bricks.forEach(b => {
      for (let x = b.start.x; x <= b.end.x; x++) {
        for (let y = b.start.y; y <= b.end.y; y++) {
          for (let z = b.start.z; z <= b.end.z; z++) {
            let key = `${x},${y},${z}`;
            if (occ.has(key)) {
              console.error("overlap");
            } else {
              occ.set(key, b);
            }
          }
        }
      }
    });

    //fall
    let step = true;
    while (step) {
      step = false;
      for (let brick of bricks) {
        let fall = true;
        for (let x = brick.start.x; x <= brick.end.x; x++) {
          for (let y = brick.start.y; y <= brick.end.y; y++) {
            for (let z = brick.start.z; z <= brick.end.z; z++) {
              if (z - 1 <= 0) {
                fall = false;
              } else {
                let key = `${x},${y},${z - 1}`;
                if (occ.has(key) && occ.get(key) != brick) {
                  fall = false;
                }
              }
            }
          }
        }
        if (fall) {
          step = true;
          for (let x = brick.start.x; x <= brick.end.x; x++) {
            for (let y = brick.start.y; y <= brick.end.y; y++) {
              for (let z = brick.start.z; z <= brick.end.z; z++) {
                let key = `${x},${y},${z}`;
                occ.delete(key);
              }
            }
          }
          brick.start.z--;
          brick.end.z--;
          for (let x = brick.start.x; x <= brick.end.x; x++) {
            for (let y = brick.start.y; y <= brick.end.y; y++) {
              for (let z = brick.start.z; z <= brick.end.z; z++) {
                let key = `${x},${y},${z}`;
                occ.set(key, brick);
              }
            }
          }
        }

      }
    }

    //dependencies
    let above = new Map();
    let below = new Map();
    for (let brick of bricks) {
      above.set(brick, new Set());
      below.set(brick, new Set());
    }
    for (let brick of bricks) {
      for (let x = brick.start.x; x <= brick.end.x; x++) {
        for (let y = brick.start.y; y <= brick.end.y; y++) {
          for (let z = brick.start.z; z <= brick.end.z; z++) {
            let key = `${x},${y},${z + 1}`;
            if (occ.has(key)) {
              let other = occ.get(key);
              if (other != brick) {
                above.get(brick).add(other);
                below.get(other).add(brick);
              }
            }
          }
        }
      }
    }

    console.log(above);
    console.log(below);

    //number of falls
    for (let brick of bricks) {
      let gone = new Set();
      gone.add(brick);

      let foundNewOne = true;
      while (foundNewOne) {
        foundNewOne = false;
        for (let goneBrick of gone) {
          for(let other of above.get(goneBrick)){
            if(!gone.has(other) && Array.from(below.get(other)).every(x => gone.has(x))){
              gone.add(other);
              foundNewOne = true;                                
            }
          }
        }
      }


      solution += gone.size - 1;
    }

    var output = document.getElementById("output").value = solution;
  }



</script>