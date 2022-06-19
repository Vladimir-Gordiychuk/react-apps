import './App.css';

import React from 'react';
import Rotation from './Rotation';
import StlInput from './StlInput';
import Scene from '../viewer/Scene';
import Loader from '../viewer/Loader';
import ColorTriangleShader from '../viewer/ColorTriangleShader';
import WireframeShader from '../viewer/WireframeShader';
import { initGL, loadTextResource } from '../viewer/util';
import { glMatrix, mat4 } from '../viewer/gl-matrix';

class App extends React.Component {

  state = {
    model: null,
    rotation : {
      x : 0,
      y : 0,
      z : 0
    },
    distance: 10.0
  };

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }


  load = (canvas) => {
    this.gl = initGL(canvas, true, false);
    this.scene = new Scene(this.gl);
 
    let shaders = [
      'shaders/color.vs.glsl',
      'shaders/color.fs.glsl',
      'shaders/wireframe.vs.glsl',
      'shaders/wireframe.fs.glsl'
    ];
  
    let loader = new Loader(shaders, (resources) => {
      this.init(canvas, resources)
    });
  
    shaders.forEach((shaderPath) => {
      loadTextResource(shaderPath, (error, shaderListing) => {
          if (error) {
              loader.setError(shaderPath, error);
          } else {
              loader.setResult(shaderPath, shaderListing);
          }
      });
    });
  
  };

  renderScene = () => {
    mat4.lookAt(this.viewMatrix, this.scene.cameraPosition, [0, 0, 0], [0, 1, 0]);

    this.gl.clearColor(0.7, 0.7, 0.9, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.gl.enable(this.gl.DEPTH_TEST);
    this.colorTriangleShader.use();
    this.colorTriangleShader.view = this.viewMatrix;
    this.colorTriangleShader.world = this.scene.rotationMatrix;
    if (this.scene.getObject())
      this.colorTriangleShader.drawObject(this.scene.getObject());

    this.gl.disable(this.gl.DEPTH_TEST);
    this.wireframeShader.use();
    this.wireframeShader.view = this.viewMatrix;
    this.wireframeShader.world = this.scene.rotationMatrix;
    if (this.scene.getObject())
      this.wireframeShader.drawObject(this.scene.getWireframeObject());

    //requestAnimationFrame(this.renderScene);
  };

  init = (canvas, resources) => {
    this.colorTriangleShader = new ColorTriangleShader(
      this.gl,
      resources['shaders/color.vs.glsl'].result,
      resources['shaders/color.fs.glsl'].result
      );

    this.wireframeShader = new WireframeShader(
      this.gl,
      resources['shaders/wireframe.vs.glsl'].result,
      resources['shaders/wireframe.fs.glsl'].result);
  
    this.viewMatrix = new Float32Array(16);
    this.projMatrix = new Float32Array(16);
  
    mat4.perspective(this.projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);
  
    this.colorTriangleShader.use();
    this.colorTriangleShader.projection = this.projMatrix;
    this.colorTriangleShader.setAmbientLightIntensity(0.1, 0.1, 0.1);
    this.colorTriangleShader.setSunLightIntensity(0.9, 0.9, 0.9);
    this.colorTriangleShader.setSunLightDirection(5.0, 0.0, -1.0);
    this.colorTriangleShader.setObjectColor(0.8, 0.2, 0.2, 1.0);
  
    this.wireframeShader.use();
    this.wireframeShader.projection = this.projMatrix;
    this.wireframeShader.setObjectColor(0.8, 0.2, 0.2, 1.0);
  
    //requestAnimationFrame(this.renderScene);
  }

  onModelChange = (model) => {
    console.log(model);
    this.setState({
      model
    });
    this.scene.bindStlModel(model);

    const size = Math.max(
      model.AABB.max.x - model.AABB.min.x,
      Math.max(
        model.AABB.max.y - model.AABB.min.y,
        model.AABB.max.z - model.AABB.min.z
      )
    );

    this.scene.cameraPosition = [0.0, 0.0, -size * 2]
  }

  onRotationChange = (rotation) => {
    console.log(rotation);
    this.setState({
      rotation
    });
    this.scene.rotation = rotation;
  }

  componentDidMount() {
    this.load(this.canvasRef.current);
  }  

  componentDidUpdate() {
    this.renderScene();
  }

  render() {
    return (

      <div className="ui container">
        <canvas ref={this.canvasRef} width="600" height="400" />
        <div className="ui segment">
          <StlInput onModelChange={this.onModelChange} />
          <Rotation
            rotation={this.state.rotation}
            onRotationChange={this.onRotationChange} />
        </div>
      </div>
    );
  }
}

export default App;
