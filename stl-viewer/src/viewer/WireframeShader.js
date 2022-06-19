import { compileShader, linkProgram } from './util';

export default class WireframeShader {
    constructor(gl, vertexShader, fragmentShader) {
      this.gl = gl;
      this.vs = compileShader(this.gl, this.gl.VERTEX_SHADER, vertexShader);
      this.fs = compileShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShader);
      this.program = linkProgram(this.gl, this.vs, this.fs);
  
      this.positionAttributeLocation = this.gl.getAttribLocation(this.program, 'vertPosition');
  
      this.matWorldUniformLocation = this.gl.getUniformLocation(this.program, 'mWorld');
      this.matViewUniformLocation = this.gl.getUniformLocation(this.program, 'mView');
      this.matProjUniformLocation = this.gl.getUniformLocation(this.program, 'mProj');
  
      this.colorUL = this.gl.getUniformLocation(this.program, 'color');
    }
  
    //  worldMatrix = Float32Array(16)
    set world(worldMatrix) {
      this.gl.uniformMatrix4fv(this.matWorldUniformLocation, this.gl.FALSE, worldMatrix);
    }
  
    set view(viewMatrix) {
      this.gl.uniformMatrix4fv(this.matViewUniformLocation, this.gl.FALSE, viewMatrix);
    }
  
    set projection(projectionMatrix) {
      this.gl.uniformMatrix4fv(this.matProjUniformLocation, this.gl.FALSE, projectionMatrix);
    }
  
    setObjectColor(r, g, b, a) {
      this.gl.uniform4f(this.colorUL, r, g, b, a);
    }
  
    drawObject(wireframeObject) {
      const gl = this.gl;
  
      gl.enableVertexAttribArray(this.positionAttributeLocation);
  
      gl.bindBuffer(gl.ARRAY_BUFFER, wireframeObject.getVertexBuffer());
      gl.vertexAttribPointer(
        this.positionAttributeLocation, // Attribute location
        3,
        gl.FLOAT,
        gl.FALSE,
        3 * Float32Array.BYTES_PER_ELEMENT,
        0 // no offset
      );
  
      gl.drawArrays(gl.LINES, 0, wireframeObject.getEdgeCount() * 2);
  
      this.disable();
    }
  
    disable() {
      this.gl.disableVertexAttribArray(this.positionAttributeLocation);
    }
  
    use() {
      this.gl.useProgram(this.program);
    }
  }