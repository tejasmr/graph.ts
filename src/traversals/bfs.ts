import Graph from "../graph";

export default function bfs(graph: Graph, startNode: number): number[] {
    if(graph.nodeCount === 0)
        return [];
    const visited: boolean[] = Array(graph.nodeCount).fill(false);

    const trav: number[] = [];
    const q: number[] = [];
    q.push(startNode);

    while(q.length > 0) {
        const node = q.shift();
        visited[node] = true;
        trav.push(node);
        graph.adjecencyList[node].forEach((neighbour) => {
            if(!visited[neighbour])
                q.push(neighbour);
        });
    }
    return trav;
}