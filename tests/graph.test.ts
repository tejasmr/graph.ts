import Graph from '../src/graph';

describe('testing creation of empty graph', () => {
    const graph = new Graph(0, []);
    test('node count should be 0', () => {
        expect(graph.nodeCount).toBe(0);
    });
    test('edge list should be empty', () => {
        expect(graph.edgeList).toEqual([]);
    });
    test('adjecency list should be empty', () => {
        expect(graph.adjecencyList).toEqual([]);
    });
    test('adjecency matrix should be empty', () => {
        expect(graph.adjecencyMatrix).toEqual([]);
    });
});

describe('testing creating of single node graph', () => {
    const graph = new Graph(1, []);
    test('node count should be 0', () => {
        expect(graph.nodeCount).toBe(1);
    });
    test('edge list should be empty', () => {
        expect(graph.edgeList).toEqual([]);
    });
    test('adjecency list have one element which is empty', () => {
        expect(graph.adjecencyList).toEqual([[]]);
    });
    test('adjecency matrix should have one element which is 0', () => {
        expect(graph.adjecencyMatrix).toEqual([[0]]);
    });
});

describe('testing creation of single node graph with self loop', () => {
    const graph = new Graph(1, [{u: 0, v: 0, w: 1}]);
    test('node count should be 0', () => {
        expect(graph.nodeCount).toBe(1);
    });
    test('edge list should be empty', () => {
        expect(graph.edgeList).toEqual([{u: 0, v: 0, w: 1}]);
    });
    test('adjecency list have one element which is [0]', () => {
        expect(graph.adjecencyList).toEqual([[0]]);
    });
    test('adjecency matrix should have one element which is 1', () => {
        expect(graph.adjecencyMatrix).toEqual([[1]]);
    });
});