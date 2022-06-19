import { compileShader, linkProgram } from './util';

export default class ColorTriangleShader {
    constructor(gl, vertexShader, fragmentShader) {
      this.gl = gl;
      this.vs = compileShader(this.gl, this.gl.VERTEX_SHADER, vertexShader);
      this.fs = compileShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShader);
      this.program = linkProgram(this.gl, this.vs, this.fs);
  
      this.positionAttributeLocation = this.gl.getAttribLocation(this.program, 'vertPosition');
      this.normalAttributeLocation = this.gl.getAttribLocation(this.program, 'vertNormal');
  
      this.matWorldUniformLocation = this.gl.getUniformLocation(this.program, 'mWorld');
      this.matViewUniformLocation = this.gl.getUniformLocation(this.program, 'mView');
      this.matProjUniformLocation = this.gl.getUniformLocation(this.program, 'mProj');
  
      this.ambientLightIntensityUL = this.gl.getUniformLocation(this.program, 'ambientLightIntensity');
      this.sunLightIntensityUL = this.gl.getUniformLocation(this.program, 'sun.color');
      this.sunLightDirectionUL = this.gl.getUniformLocation(this.program, 'sun.direction');
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
  
    setAmbientLightIntensity(r, g, b) {
      this.gl.uniform3f(this.ambientLightIntensityUL, r, g, b);
    }
  
    setSunLightIntensity(r, g, b) {
      this.gl.uniform3f(this.sunLightIntensityUL, r, g, b);
    }
  
    setSunLightDirection(r, g, b) {
      this.gl.uniform3f(this.sunLightDirectionUL, r, g, b);
    }
  
    setObjectColor(r, g, b, a) {
      this.gl.uniform4f(this.colorUL, r, g, b, a);
    }
  
    drawObject(trinormalObject) {
      const gl = this.gl;
  
      gl.enableVertexAttribArray(this.positionAttributeLocation);
      gl.enableVertexAttribArray(this.normalAttributeLocation);
  
      gl.bindBuffer(gl.ARRAY_BUFFER, trinormalObject.getVertexBuffer());
      gl.vertexAttribPointer(
        this.positionAttributeLocation, // Attribute location
        3,
        gl.FLOAT,
        gl.FALSE,
        3 * Float32Array.BYTES_PER_ELEMENT,
        0 // no offset
      );
  
      gl.bindBuffer(this.gl.ARRAY_BUFFER, trinormalObject.getNormalBuffer());
      gl.vertexAttribPointer(
        this.normalAttributeLocation,
        3,
        gl.FLOAT,
        gl.TRUE,
        3 * Float32Array.BYTES_PER_ELEMENT,
        0
      );
  
      gl.drawArrays(gl.TRIANGLES, 0, trinormalObject.getTriangleCount() * 3);
  
      this.disable();
    }
  
    disable() {
      this.gl.disableVertexAttribArray(this.normalAttributeLocation);
      this.gl.disableVertexAttribArray(this.positionAttributeLocation);
    }
  
    use() {
      this.gl.useProgram(this.program);
    }
  }