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