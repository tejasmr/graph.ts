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