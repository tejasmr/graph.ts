import Graph from "../src/graph";
import dfs from "../src/toposort/dfs";

describe('testing empty graph', () => {
    const graph = new Graph(0, []);
    test('toposort dfs should be empty', () => {
        expect(dfs(graph)).toEqual([]);
    });
});

describe('testing single node graph with no edges', () => {
    const graph = new Graph(1, []);
    test('toposort dfs should be [0]', () => {
        expect(dfs(graph)).toEqual([0]);
    });
});

describe('testing two node graph with no edges', () => {
    const graph = new Graph(2, []);
    test('toposort dfs should be [1, 0]', () => {
        expect(dfs(graph)).toEqual([1, 0]);
    });
});

describe('testing two node graph with one edge', () => {
    const graph = new Graph(2, [{u: 0, v: 1, w: 1}]);
    test('toposort dfs should be [0, 1]', () => {
        expect(dfs(graph)).toEqual([0, 1]);
    });
});

describe('testing four node graph with five edges', () => {
    const graph = new Graph(4, [
        {u: 0, v: 1, w: 1},
        {u: 0, v: 2, w: 1},
        {u: 1, v: 2, w: 1},
        {u: 2, v: 3, w: 1},
        {u: 3, v: 3, w: 1},
    ]);
    test('toposort dfs should be [0, 1, 2, 3]', () => {
        expect(dfs(graph)).toEqual([0, 1, 2, 3]);
    });
});