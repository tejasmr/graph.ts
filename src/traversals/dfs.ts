import Graph from "../graph";

export function dfs(graph: Graph, visited: boolean[], node: number) {
    if(graph.nodeCount == 0)
        return [];
    if(visited[node])
        return undefined;
    const trav = []
    graph.adjecencyList[node].forEach((neighbour) => {
        const res = dfs(graph, visited, neighbour);
        if(res !== undefined)
            trav.push(res);
    });
    return trav;
}