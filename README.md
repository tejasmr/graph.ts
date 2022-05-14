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
}

export default Graph;
```

### DFS
```ts
import Graph from "../graph";

export function dfs(graph: Graph, visited: boolean[], node: number) {
    if(graph.nodeCount == 0)
        return [];
    if(visited[node])
        return undefined;
    const trav = [node]
    graph.adjecencyList[node].forEach((neighbour) => {
        const res = dfs(graph, visited, neighbour);
        if(res !== undefined)
            res.forEach((val) => trav.push(val));
    });
    return trav;
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
import { dfs } from "../src/traversals/dfs";

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
```

