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