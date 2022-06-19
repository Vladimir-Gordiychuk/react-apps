class ArrayBufferStreamReader {
    constructor(buffer) {
      this.buffer = buffer;
      this.view = new DataView(buffer);
      this.position = 0;
    }
  
    getPosition() {
      return this.position;
    }
  
    setPosition(position) {
      this.position = position;
    }
  
    skip(byteCount) {
      this.position += byteCount;
    }
  
    readUint32() {
      const value = this.view.getUint32(this.position, true);
      this.position += 4;
      return value;
    }
  
    readFloat32() {
      const value = this.view.getFloat32(this.position, true);
      this.position += 4;
      return value;
    }
  }
  
  export default class StlModel {
    constructor() {
      this.triangles = [];
      this.normals = [];
      this.aabb = {
        min : {
          x: Number.POSITIVE_INFINITY,
          y: Number.POSITIVE_INFINITY,
          z: Number.POSITIVE_INFINITY
        },
        max : {
          x: Number.NEGATIVE_INFINITY,
          y: Number.NEGATIVE_INFINITY,
          z: Number.NEGATIVE_INFINITY
        }
      };
  
      this.updateAABB = function(x, y, z) {
        if (x < this.aabb.min.x) this.aabb.min.x = x;
        if (x > this.aabb.max.x) this.aabb.max.x = x;
  
        if (y < this.aabb.min.y) this.aabb.min.y = y;
        if (y > this.aabb.max.y) this.aabb.max.y = y;
  
        if (z < this.aabb.min.z) this.aabb.min.z = z;
        if (z > this.aabb.max.z) this.aabb.max.z = z;
      }
    }
  
    get AABB() {
      return this.aabb;
    }
  
    getTriangles() {
      return this.triangles;
    }
  
    getNormals() {
      return this.normals;
    }
  
    getTriangleCount() {
      return this.triangles.length / 9;
    }
  
    getVertexCount() {
      return this.triangles.length / 3;
    }
  
    setVertex(vertexIndex, x, y, z) {
      this.updateAABB(x, y, z);
      this.triangles[vertexIndex * 3 + 0] = x;
      this.triangles[vertexIndex * 3 + 1] = y;
      this.triangles[vertexIndex * 3 + 2] = z;
    }
  
    setNormal(triangleIndex, x, y, z) {
      this.normals[triangleIndex * 3 + 0] = x;
      this.normals[triangleIndex * 3 + 1] = y;
      this.normals[triangleIndex * 3 + 2] = z;
    }
  
    readArrayBuffer(buffer) {
      const reader = new ArrayBufferStreamReader(buffer);
      reader.setPosition(80);
      const triangleCount = reader.readUint32();
  
      this.triangles = new Float32Array(triangleCount * 9);
      this.normals = new Float32Array(triangleCount * 3);
  
      for (let i = 0; i < triangleCount; ++i) {
        this.setNormal(i, reader.readFloat32(), reader.readFloat32(), reader.readFloat32());
  
        this.setVertex(i * 3 + 0, reader.readFloat32(), reader.readFloat32(), reader.readFloat32());
        this.setVertex(i * 3 + 1, reader.readFloat32(), reader.readFloat32(), reader.readFloat32());
        this.setVertex(i * 3 + 2, reader.readFloat32(), reader.readFloat32(), reader.readFloat32());
  
        reader.skip(2);
      }
    }
  };
  