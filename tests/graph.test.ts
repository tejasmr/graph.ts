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
    test('node count should be 1', () => {
        expect(graph.nodeCount).toBe(1);
    });
    test('edge list should be empty', () => {
        expect(graph.edgeList).toEqual([]);
    });
    test('adjecency list have one element which is empty', () => {
        expect(graph.adjecencyList).toEqual([[]]);
    });
    test('adjecency matrix should have one element which is [0]', () => {
        expect(graph.adjecencyMatrix).toEqual([[0]]);
    });
});

describe('testing creation of single node graph with self loop', () => {
    const graph = new Graph(1, [{u: 0, v: 0, w: 1}]);
    test('node count should be 1', () => {
        expect(graph.nodeCount).toBe(1);
    });
    test('edge list should have {u: 0, v: 0, w: 1}', () => {
        expect(graph.edgeList).toEqual([{u: 0, v: 0, w: 1}]);
    });
    test('adjecency list have one element which is [0]', () => {
        expect(graph.adjecencyList).toEqual([[0]]);
    });
    test('adjecency matrix should have one element which is [1]', () => {
        expect(graph.adjecencyMatrix).toEqual([[1]]);
    });
});

describe('testing creation of two node graph with no edges', () => {
    const graph = new Graph(2, []);
    test('node count should be 2', () => {
        expect(graph.nodeCount).toBe(2);
    });
    test('edge list should be empty', () => {
        expect(graph.edgeList).toEqual([]);
    });
    test('adjecency list have two elements which are empty', () => {
        expect(graph.adjecencyList).toEqual([[], []]);
    });
    test('adjecency matrix should have two elements which are [0, 0]', () => {
        expect(graph.adjecencyMatrix).toEqual([[0, 0], [0, 0]]);
    });
});

describe('testing creation of two node graph with one edge', () => {
    const graph = new Graph(2, [{u: 0, v: 1, w: 1}]);
    test('node count should be 2', () => {
        expect(graph.nodeCount).toBe(2);
    });
    test('edge list should have {u: 0, v: 1, w: 1}', () => {
        expect(graph.edgeList).toEqual([{u: 0, v: 1, w: 1}]);
    });
    test('adjecency list should be [[1], []]', () => {
        expect(graph.adjecencyList).toEqual([[1], []]);
    });
    test('adjecency matrix should be [[0, 1], [0, 0]]', () => {
        expect(graph.adjecencyMatrix).toEqual([[0, 1], [0, 0]]);
    });
});


describe('testing creation of two node graph with two edges', () => {
    const graph = new Graph(2, [{u: 0, v: 1, w: 1}, {u: 1, v: 0, w: 1}]);
    test('node count should be 2', () => {
        expect(graph.nodeCount).toBe(2);
    });
    test('edge list should have {u: 0, v: 1, w: 1}, {u: 1, v: 0, w: 1}', () => {
        expect(graph.edgeList).toEqual([{u: 0, v: 1, w: 1}, {u: 1, v: 0, w: 1}]);
    });
    test('adjecency list should be [[1], [0]]', () => {
        expect(graph.adjecencyList).toEqual([[1], [0]]);
    });
    test('adjecency matrix should be [[0, 1], [1, 0]]', () => {
        expect(graph.adjecencyMatrix).toEqual([[0, 1], [1, 0]]);
    });
});

describe('testing creation of two node graph with three edges', () => {
    const graph = new Graph(2, [{u: 0, v: 0, w: 1}, {u: 0, v: 1, w: 1}, {u: 1, v: 0, w: 1}]);
    test('node count should be 2', () => {
        expect(graph.nodeCount).toBe(2);
    });
    test('edge list should have {u: 0, v: 1, w: 1}, {u: 0, v: 1, w: 1}, {u: 1, v: 0, w: 1}', () => {
        expect(graph.edgeList).toEqual([{u: 0, v: 0, w: 1}, {u: 0, v: 1, w: 1}, {u: 1, v: 0, w: 1}]);
    });
    test('adjecency list should be [[0, 1], [0]]', () => {
        expect(graph.adjecencyList).toEqual([[0, 1], [0]]);
    });
    test('adjecency matrix should be [[1, 1], [1, 0]]', () => {
        expect(graph.adjecencyMatrix).toEqual([[1, 1], [1, 0]]);
    });
});

