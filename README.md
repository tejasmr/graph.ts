# Graph
### Edge
```ts
export default interface Edge {
    u: number;
    v: number;
    w: number;
}

```

### Graph
```ts
import Edge from './edge';

class Graph {
    nodeCount: number;
    edgeList: Edge[];
    
    constructor(nodeCount: number, edgeList: Edge[]) {
        this.nodeCount = nodeCount;
        this.edgeList = edgeList;
    }

    get adjecencyList(): number[][] {
        const adj:number[][] = new Array(this.nodeCount);
        for(let i=0; i<this.nodeCount; i++)
            adj[i] = [];
        for(let i=0; i<this.edgeList.length; i++) {
            const { u, v, w } = this.edgeList[i];
            adj[u].push(v);
        }
        return adj;
    }

    get adjecencyMatrix(): number[][] {
        const mat: number[][] = new Array(this.nodeCount);
        for(let i=0; i<this.nodeCount; i++) {
            mat[i] = new Array(this.nodeCount).fill(0);
        }
        this.edgeList.forEach((edge) => {
            const { u, v, w } = edge;
            mat[u][v] = w;
        });
        return mat;
    }

    get indegree(): number[] {
        const indegree: number[] = Array(this.nodeCount).fill(0);
        this.edgeList.forEach((edge) => {
            indegree[edge[0]]++;
        });
        return indegree;
    }

    get outdegree(): number[] {
        const outdegree: number[] = Array(this.nodeCount).fill(0);
        this.edgeList.forEach((edge) => {
            outdegree[edge[1]]++;
        });
        return outdegree;
    }
}

export default Graph;
```


## Traversals
### DFS
```ts
import Graph from "../graph";

export default function dfs(graph: Graph, visited: boolean[], node: number): number[] {
    if(graph.nodeCount == 0)
        return [];
    if(visited[node])
        return undefined;
    visited[node] = true;
    const trav = [node]
    graph.adjecencyList[node].forEach((neighbour) => {
        const res = dfs(graph, visited, neighbour);
        if(res !== undefined)
            res.forEach((val) => trav.push(val));
    });
    return trav;
}
```

### BFS
```ts
import Graph from "../graph";

export default function bfs(graph: Graph, startNode: number): number[] {
    if(graph.nodeCount === 0)
        return [];
    const visited: boolean[] = Array(graph.nodeCount).fill(false);

    const trav: number[] = [];
    const q: number[] = [];

    visited[startNode] = true;
    q.push(startNode);
    
    while(q.length > 0) {
        const node = q.shift();
        trav.push(node);
        graph.adjecencyList[node].forEach((neighbour) => {
            if(!visited[neighbour]) {
                q.push(neighbour);
                visited[neighbour] = true;
            }
        });
    }
    return trav;
}
```


## Topological Sort
### Toposort using DFS
```ts
import Graph from "../graph";

function _dfs(graph: Graph, startNode: number, visited: boolean[], stack: number[]) {
    visited[startNode] = true;

    graph.adjecencyList[startNode].forEach((neighbour) => {
        if(!visited[neighbour])
            _dfs(graph, neighbour, visited, stack);
    });

    stack.push(startNode);
}

export default function dfs(graph: Graph) {
    if(graph.nodeCount === 0)
        return [];
    const visited: boolean[] = Array(graph.nodeCount).fill(false);
    const stack: number[] = []

    for(let i=0; i<graph.nodeCount; i++)
        if(!visited[i])
            _dfs(graph, i, visited, stack);
    
    return stack.reverse();
}
```

### Toposort using BFS
```ts
import Graph from "../graph";

export default function bfs(graph: Graph) {
    if(graph.nodeCount === 0)
        return [];
    const q: number[] = [];
    const indegree = graph.indegree;
    const visited = Array(graph.nodeCount).fill(false);
    const toposort = [];
    indegree.forEach((val, index) => {
        if(val === 0)
            q.push(index);
    });
    while(q.length > 0) {
        const node = q.shift();
        visited[node] = true;
        toposort.push(node);
        graph.adjecencyList[node].forEach((neighbour) => {
            indegree[neighbour]--;
            if(indegree[neighbour] === 0)
                q.push(neighbour);
        });
    }
    return toposort;
}
```


## Tests
### Graph Test
```ts
import Graph from '../src/graph';

describe('testing creation of empty graph', () => {
    const graph = new Graph(0, []);
    test('node count should be 0', () => {
        expect(graph.nodeCount).toBe(0);
    });
    test('edge list should be empty', () => {
        expect(graph.edgeList).toEqual([]);
    });
    test('adjecency list should be empty', () => {
        expect(graph.adjecencyList).toEqual([]);
    });
    test('adjecency matrix should be empty', () => {
        expect(graph.adjecencyMatrix).toEqual([]);
    });
});

describe('testing creating of single node graph', () => {
    const graph = new Graph(1, []);
    test('node count should be 1', () => {
        expect(graph.nodeCount).toBe(1);
    });
    test('edge list should be empty', () => {
        expect(graph.edgeList).toEqual([]);
    });
    test('adjecency list have one element which is empty', () => {
        expect(graph.adjecencyList).toEqual([[]]);
    });
    test('adjecency matrix should have one element which is [0]', () => {
        expect(graph.adjecencyMatrix).toEqual([[0]]);
    });
});

describe('testing creation of single node graph with self loop', () => {
    const graph = new Graph(1, [{u: 0, v: 0, w: 1}]);
    test('node count should be 1', () => {
        expect(graph.nodeCount).toBe(1);
    });
    test('edge list should have {u: 0, v: 0, w: 1}', () => {
        expect(graph.edgeList).toEqual([{u: 0, v: 0, w: 1}]);
    });
    test('adjecency list have one element which is [0]', () => {
        expect(graph.adjecencyList).toEqual([[0]]);
    });
    test('adjecency matrix should have one element which is [1]', () => {
        expect(graph.adjecencyMatrix).toEqual([[1]]);
    });
});

describe('testing creation of two node graph with no edges', () => {
    const graph = new Graph(2, []);
    test('node count should be 2', () => {
        expect(graph.nodeCount).toBe(2);
    });
    test('edge list should be empty', () => {
        expect(graph.edgeList).toEqual([]);
    });
    test('adjecency list have two elements which are empty', () => {
        expect(graph.adjecencyList).toEqual([[], []]);
    });
    test('adjecency matrix should have two elements which are [0, 0]', () => {
        expect(graph.adjecencyMatrix).toEqual([[0, 0], [0, 0]]);
    });
});

describe('testing creation of two node graph with one edge', () => {
    const graph = new Graph(2, [{u: 0, v: 1, w: 1}]);
    test('node count should be 2', () => {
        expect(graph.nodeCount).toBe(2);
    });
    test('edge list should have {u: 0, v: 1, w: 1}', () => {
        expect(graph.edgeList).toEqual([{u: 0, v: 1, w: 1}]);
    });
    test('adjecency list should be [[1], []]', () => {
        expect(graph.adjecencyList).toEqual([[1], []]);
    });
    test('adjecency matrix should be [[0, 1], [0, 0]]', () => {
        expect(graph.adjecencyMatrix).toEqual([[0, 1], [0, 0]]);
    });
});


describe('testing creation of two node graph with two edges', () => {
    const graph = new Graph(2, [{u: 0, v: 1, w: 1}, {u: 1, v: 0, w: 1}]);
    test('node count should be 2', () => {
        expect(graph.nodeCount).toBe(2);
    });
    test('edge list should have {u: 0, v: 1, w: 1}, {u: 1, v: 0, w: 1}', () => {
        expect(graph.edgeList).toEqual([{u: 0, v: 1, w: 1}, {u: 1, v: 0, w: 1}]);
    });
    test('adjecency list should be [[1], [0]]', () => {
        expect(graph.adjecencyList).toEqual([[1], [0]]);
    });
    test('adjecency matrix should be [[0, 1], [1, 0]]', () => {
        expect(graph.adjecencyMatrix).toEqual([[0, 1], [1, 0]]);
    });
});

describe('testing creation of two node graph with three edges', () => {
    const graph = new Graph(2, [{u: 0, v: 0, w: 1}, {u: 0, v: 1, w: 1}, {u: 1, v: 0, w: 1}]);
    test('node count should be 2', () => {
        expect(graph.nodeCount).toBe(2);
    });
    test('edge list should have {u: 0, v: 1, w: 1}, {u: 0, v: 1, w: 1}, {u: 1, v: 0, w: 1}', () => {
        expect(graph.edgeList).toEqual([{u: 0, v: 0, w: 1}, {u: 0, v: 1, w: 1}, {u: 1, v: 0, w: 1}]);
    });
    test('adjecency list should be [[0, 1], [0]]', () => {
        expect(graph.adjecencyList).toEqual([[0, 1], [0]]);
    });
    test('adjecency matrix should be [[1, 1], [1, 0]]', () => {
        expect(graph.adjecencyMatrix).toEqual([[1, 1], [1, 0]]);
    });
});

describe('testing creation of two node graph with four edges', () => {
    const graph = new Graph(2, [{u: 0, v: 0, w: 1}, {u: 0, v: 1, w: 1}, {u: 1, v: 0, w: 1}, {u: 1, v: 1, w: 1}]);
    test('node count should be 2', () => {
        expect(graph.nodeCount).toBe(2);
    });
    test('edge list should have {u: 0, v: 1, w: 1}, {u: 0, v: 1, w: 1}, {u: 1, v: 0, w: 1}, {u: 1, v: 1, w: 1}', () => {
        expect(graph.edgeList).toEqual([{u: 0, v: 0, w: 1}, {u: 0, v: 1, w: 1}, {u: 1, v: 0, w: 1}, {u: 1, v: 1, w: 1}]);
    });
    test('adjecency list should be [[0, 1], [0]]', () => {
        expect(graph.adjecencyList).toEqual([[0, 1], [0, 1]]);
    });
    test('adjecency matrix should be [[1, 1], [1, 0]]', () => {
        expect(graph.adjecencyMatrix).toEqual([[1, 1], [1, 1]]);
    });
});

```

### DFS Test
```ts
import Graph from "../src/graph";
import dfs from "../src/traversals/dfs";

describe('testing empty graph', () => {
    const graph = new Graph(0, []);
    test('dfs should be empty', () => {
        expect(dfs(graph, Array(0).fill(false), 0)).toEqual([]);
    });
});

describe('testing single node graph with no edges', () => {
    const graph = new Graph(1, []);
    test('dfs should be [0]', () => {
        expect(dfs(graph, Array(1).fill(false), 0)).toEqual([0]);
    });
});

describe('testing single node graph with self loop', () => {
    const graph = new Graph(1, [{u: 0, v: 0, w: 1}]);
    test('dfs should be [0]', () => {
        expect(dfs(graph, Array(1).fill(false), 0)).toEqual([0]);
    });
});

describe('testing two node graph with no edges', () => {
    const graph = new Graph(2, []);
    test('dfs starting from 0 should be [0]', () => {
        expect(dfs(graph, Array(2).fill(false), 0)).toEqual([0]);
    });
    test('dfs starting from 1 should be [1]', () => {
        expect(dfs(graph, Array(2).fill(false), 1)).toEqual([1]);
    });
});

describe('testing two node graph with one edge', () => {
    const graph = new Graph(2, [{u: 0, v: 1, w: 1}]);
    test('dfs starting from 0 should be [0, 1]', () => {
        expect(dfs(graph, Array(2).fill(false), 0)).toEqual([0, 1]);
    });
    test('dfs starting from 1 should be [1]', () => {
        expect(dfs(graph, Array(2).fill(false), 1)).toEqual([1]);
    });
});

describe('testing two node graph with two edges', () => {
    const graph = new Graph(2, [{u: 0, v: 1, w: 1}, {u: 1, v: 0, w: 1}]);
    test('dfs starting from 0 should be [0, 1]', () => {
        expect(dfs(graph, Array(2).fill(false), 0)).toEqual([0, 1]);
    });
    test('dfs starting from 1 should be [1, 0]', () => {
        expect(dfs(graph, Array(2).fill(false), 1)).toEqual([1, 0]);
    });
});

describe('testing four node graph with six edges', () => {
    const graph = new Graph(4, [
        {u: 0, v: 1, w: 1},
        {u: 0, v: 2, w: 1},
        {u: 1, v: 2, w: 1},
        {u: 2, v: 0, w: 1},
        {u: 2, v: 3, w: 1},
        {u: 3, v: 3, w: 1},
    ]);
    test('dfs starting from 0 should be [0, 1, 2, 3]', () => {
        expect(dfs(graph, Array(4).fill(false), 0)).toEqual([0, 1, 2, 3]);
    });
    test('dfs starting from 1 should be [1, 2, 0, 3]', () => {
        expect(dfs(graph, Array(4).fill(false), 1)).toEqual([1, 2, 0, 3]);
    });
    test('dfs starting from 2 should be [2, 0, 1, 3]', () => {
        expect(dfs(graph, Array(4).fill(false), 2)).toEqual([2, 0, 1, 3]);
    });
    test('dfs starting from 3 should be [3]', () => {
        expect(dfs(graph, Array(4).fill(false), 3)).toEqual([3]);
    });
});
```

### BFS Test
```ts
import Graph from "../src/graph"
import bfs from "../src/traversals/bfs";

describe('testing empty graph', () => {
    const graph = new Graph(0, []);
    test('bfs should be empty', () => {
        expect(bfs(graph, 0)).toEqual([]);
    });
});

describe('testing single node graph with no edges', () => {
    const graph = new Graph(1, []);
    test('bfs should be [0]', () => {
        expect(bfs(graph, 0)).toEqual([0]);
    });
});

describe('testing single node graph with self loop', () => {
    const graph = new Graph(1, [{u: 0, v: 0, w: 1}]);
    test('bfs should be [0]', () => {
        expect(bfs(graph, 0)).toEqual([0]);
    });
});

describe('testing two node graph with no edges', () => {
    const graph = new Graph(2, []);
    test('bfs starting from 0 should be [0]', () => {
        expect(bfs(graph, 0)).toEqual([0]);
    });
    test('bfs starting from 1 should be [1]', () => {
        expect(bfs(graph, 1)).toEqual([1]);
    });
});

describe('testing two node graph with one edge', () => {
    const graph = new Graph(2, [{u: 0, v: 1, w: 1}]);
    test('bfs starting from 0 should be [0, 1]', () => {
        expect(bfs(graph, 0)).toEqual([0, 1]);
    });
    test('bfs starting from 1 should be [1]', () => {
        expect(bfs(graph, 1)).toEqual([1]);
    });
});

describe('testing two node graph with two edges', () => {
    const graph = new Graph(2, [{u: 0, v: 1, w: 1}, {u: 1, v: 0, w: 1}]);
    test('bfs starting from 0 should be [0, 1]', () => {
        expect(bfs(graph, 0)).toEqual([0, 1]);
    });
    test('bfs starting from 1 should be [1, 0]', () => {
        expect(bfs(graph, 1)).toEqual([1, 0]);
    });
});

describe('testing four node graph with six edges', () => {
    const graph = new Graph(4, [
        {u: 0, v: 1, w: 1},
        {u: 0, v: 2, w: 1},
        {u: 1, v: 2, w: 1},
        {u: 2, v: 0, w: 1},
        {u: 2, v: 3, w: 1},
        {u: 3, v: 3, w: 1},
    ]);
    test('dfs starting from 0 should be [0, 1, 2, 3]', () => {
        expect(bfs(graph, 0)).toEqual([0, 1, 2, 3]);
    });
    test('dfs starting from 1 should be [1, 2, 0, 3]', () => {
        expect(bfs(graph, 1)).toEqual([1, 2, 0, 3]);
    });
    test('dfs starting from 2 should be [2, 0, 1, 3]', () => {
        expect(bfs(graph, 2)).toEqual([2, 0, 3, 1]);
    });
    test('dfs starting from 3 should be [3]', () => {
        expect(bfs(graph, 3)).toEqual([3]);
    });
});
```

### Toposort.DFS Test
```ts
import Graph from "../src/graph";
import dfs from "../src/toposort/dfs";

describe('testing empty graph', () => {
    const graph = new Graph(0, []);
    test('toposort dfs should be empty', () => {
        expect(dfs(graph)).toEqual([]);
    });
});

describe('testing single node graph with no edges', () => {
    const graph = new Graph(1, []);
    test('toposort dfs should be [0]', () => {
        expect(dfs(graph)).toEqual([0]);
    });
});

describe('testing two node graph with no edges', () => {
    const graph = new Graph(2, []);
    test('toposort dfs should be [1, 0]', () => {
        expect(dfs(graph)).toEqual([1, 0]);
    });
});

describe('testing two node graph with one edge', () => {
    const graph = new Graph(2, [{u: 0, v: 1, w: 1}]);
    test('toposort dfs should be [0, 1]', () => {
        expect(dfs(graph)).toEqual([0, 1]);
    });
});

describe('testing four node graph with five edges', () => {
    const graph = new Graph(4, [
        {u: 0, v: 1, w: 1},
        {u: 0, v: 2, w: 1},
        {u: 1, v: 2, w: 1},
        {u: 2, v: 3, w: 1},
        {u: 3, v: 3, w: 1},
    ]);
    test('toposort dfs should be [0, 1, 2, 3]', () => {
        expect(dfs(graph)).toEqual([0, 1, 2, 3]);
    });
});
```

### Toposort.BFS Test
```ts
import Graph from "../src/graph";
import bfs from "../src/toposort/bfs";

describe('testing empty graph', () => {
    const graph = new Graph(0, []);
    test('toposort bfs should be empty', () => {
        expect(bfs(graph)).toEqual([]);
    });
});

describe('testing single node graph with no edges', () => {
    const graph = new Graph(1, []);
    test('toposort bfs should be [0]', () => {
        expect(bfs(graph)).toEqual([0]);
    });
});

describe('testing two node graph with no edges', () => {
    const graph = new Graph(2, []);
    test('toposort bfs should be [0, 1]', () => {
        expect(bfs(graph)).toEqual([0, 1]);
    });
});

describe('testing two node graph with one edge', () => {
    const graph = new Graph(2, [{u: 0, v: 1, w: 1}]);
    test('toposort bfs should be [0, 1]', () => {
        expect(bfs(graph)).toEqual([0, 1]);
    });
});

describe('testing four node graph with six edges', () => {
    const graph = new Graph(4, [
        {u: 0, v: 1, w: 1},
        {u: 0, v: 2, w: 1},
        {u: 1, v: 2, w: 1},
        {u: 2, v: 0, w: 1},
        {u: 2, v: 3, w: 1},
        {u: 3, v: 3, w: 1},
    ]);
    test('toposort bfs should be [0, 1, 2, 3]', () => {
        expect(bfs(graph)).toEqual([0, 1, 2, 3]);
    });
});
```
