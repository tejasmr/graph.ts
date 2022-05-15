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