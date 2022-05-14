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
        const adj = Array(this.nodeCount).fill([]);
        this.edgeList.forEach((edge) => {
            const { u, v } = edge;
            adj[u].push(v);
        });
        return adj;
    }

    get adjecencyMatrix(): number[][] {
        const mat = Array(this.nodeCount).fill(Array(this.nodeCount).fill(0));
        this.edgeList.forEach((edge) => {
            const { u, v, w } = edge;
            mat[u][v] = w;
        })
        return mat;
    }
}

export default Graph;
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
})
```

