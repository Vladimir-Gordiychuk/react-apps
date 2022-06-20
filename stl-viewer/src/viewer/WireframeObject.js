export default class WireframeObject {
    constructor(gl) {
        this.gl = gl;
        this.vertexBuffer = gl.createBuffer();
        this.edgeCount = 0;
    }

    getVertexBuffer = () => {
        return this.vertexBuffer;
    };

    getEdgeCount = () => {
        return this.edgeCount;
    };

    loadFromStl = (stlModel) => {
        const gl = this.gl;

        this.edgeCount = stlModel.getTriangleCount() * 3;
        const edges = WireframeObject.makeEdges(stlModel.getTriangles());

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, edges, gl.STATIC_DRAW);
    };

    static makeEdges(triangles) {
        const triangleCount = triangles.length / 9;

        //  edge is a 3 x vertex : 2*(FLOAT*3)
        //  triangle has 3 edges : 3*2*(FLOAT*3)
        const edges = new Float32Array(triangleCount * 3 * 2 * 3);

        const setVertex = function (index, vertex) {
            edges[index * 3 + 0] = vertex[0];
            edges[index * 3 + 1] = vertex[1];
            edges[index * 3 + 2] = vertex[2];
        };

        for (let i = 0; i < triangleCount; ++i) {
            const a = [
                triangles[i * 9 + 0],
                triangles[i * 9 + 1],
                triangles[i * 9 + 2],
            ];
            const b = [
                triangles[i * 9 + 3],
                triangles[i * 9 + 4],
                triangles[i * 9 + 5],
            ];
            const c = [
                triangles[i * 9 + 6],
                triangles[i * 9 + 7],
                triangles[i * 9 + 8],
            ];

            setVertex(i * 6 + 0, a);
            setVertex(i * 6 + 1, b);

            setVertex(i * 6 + 2, b);
            setVertex(i * 6 + 3, c);

            setVertex(i * 6 + 4, c);
            setVertex(i * 6 + 5, a);
        }

        return edges;
    }
}
