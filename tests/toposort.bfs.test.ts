import Graph from "../src/graph";
import bfs from "../src/toposort/bfs";

describe('testing empty graph', () => {
    const graph = new Graph(0, []);
    test('toposort bfs should be empty', () => {
        expect(bfs(graph)).toEqual([]);
    });
});

describe('testing single node graph with no edges', () => {
    const graph = new Graph(1, []);
    test('toposort bfs should be [0]', () => {
        expect(bfs(graph)).toEqual([0]);
    });
});

describe('testing two node graph with no edges', () => {
    const graph = new Graph(2, []);
    test('toposort bfs should be [0, 1]', () => {
        expect(bfs(graph)).toEqual([0, 1]);
    });
});

describe('testing two node graph with one edge', () => {
    const graph = new Graph(2, [{u: 0, v: 1, w: 1}]);
    test('toposort bfs should be [0, 1]', () => {
        expect(bfs(graph)).toEqual([0, 1]);
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
    test('toposort bfs should be [0, 1, 2, 3]', () => {
        expect(bfs(graph)).toEqual([0, 1, 2, 3]);
    });
});