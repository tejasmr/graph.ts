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