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