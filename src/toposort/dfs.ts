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