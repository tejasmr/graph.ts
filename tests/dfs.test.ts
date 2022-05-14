import Graph from "../src/graph";
import { dfs } from "../src/traversals/dfs";

describe('testing empty graph', () => {
    const graph = new Graph(0, []);
    test('dfs should be empty', () => {
        expect(dfs(graph, Array(0).fill(false), 0)).toEqual([]);
    });
});

describe('testing single node graph with no edges', () => {
    const graph = new Graph(1, []);
    test('dfs should be [0]', () => {
        expect(dfs(graph, Array(1).fill(false), 0)).toEqual([0]);
    });
});

describe('testing single node graph with self loop', () => {
    const graph = new Graph(1, [{u: 0, v: 0, w: 1}]);
    test('dfs should be [0]', () => {
        expect(dfs(graph, Array(1).fill(false), 0)).toEqual([0]);
    });
});