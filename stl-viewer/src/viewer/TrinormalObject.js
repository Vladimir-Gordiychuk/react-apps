//  Объекты данного типа представлены в виде
//  треугольников, информация о которых храниться в двух буфферах:
//  1. буффер вершин (по три вершины на треугольник)
//  2. буффер нормалей (по три нормали на треугольник)
export default class TrinormalObject {
    constructor(gl) {
        this.gl = gl;
        this.vertexBuffer = gl.createBuffer();
        this.normalBuffer = gl.createBuffer();
        this.triangleCount = 0;

        this.triplify = function (normals) {
            const x3 = new Float32Array(normals.length * 3);
            const triangleCount = normals.length / 3;
            for (let i = 0; i < triangleCount; ++i) {
                x3[i * 9 + 0] = normals[i * 3 + 0];
                x3[i * 9 + 1] = normals[i * 3 + 1];
                x3[i * 9 + 2] = normals[i * 3 + 2];

                x3[i * 9 + 3] = normals[i * 3 + 0];
                x3[i * 9 + 4] = normals[i * 3 + 1];
                x3[i * 9 + 5] = normals[i * 3 + 2];

                x3[i * 9 + 6] = normals[i * 3 + 0];
                x3[i * 9 + 7] = normals[i * 3 + 1];
                x3[i * 9 + 8] = normals[i * 3 + 2];
            }
            return x3;
        };
    }

    getVertexBuffer = () => {
        return this.vertexBuffer;
    };

    getNormalBuffer = () => {
        return this.normalBuffer;
    };

    getTriangleCount = () => {
        return this.triangleCount;
    };

    loadFromStl = (stlModel) => {
        const gl = this.gl;

        this.triangleCount = stlModel.getTriangleCount();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, stlModel.getTriangles(), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            this.triplify(stlModel.getNormals()),
            gl.STATIC_DRAW
        );
    };
}
