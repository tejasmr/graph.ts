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
})