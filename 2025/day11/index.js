import loadLines from '../../LoadLines.js';

    const graph = loadLines('input.txt').reduce((obj, line) => {
      const [dev, ...outputs] = line.match(/\w{3}/g);
      obj[dev] = outputs;
      return obj;
    }, {});

    console.log({ 
      part1: count('you'), 
      part2: count('svr', new Set(['dac', 'fft'])) 
    });

    function count (node, req = null, memo = {}, stack = new Set()){
      if (node === 'out') return req === null || req.size === 0;
      if (stack.has(node)) return 0;
      
      const key = req ? `${node}:${[...req].sort()}` : node;
      if (key in memo) return memo[key];
      
      const newReq = req && new Set(req);
      newReq?.delete(node);
      
      stack.add(node);
      const result = (graph[node] || []).reduce((s, n) => s + count(n, newReq, memo, stack), 0);
      stack.delete(node);
      
      return memo[key] = result;
    };