import React from "react";
import { glMatrix, mat4 } from "gl-matrix";

import Rotation from "./Rotation";
import StlInput from "./StlInput";
import RenderSettings from "./RenderSettings";
import Orbit from "./Orbit";

import Scene from "../viewer/Scene";
import Loader from "../viewer/Loader";
import ColorTriangleShader from "../viewer/ColorTriangleShader";
import WireframeShader from "../viewer/WireframeShader";
import { initGL, loadTextResource } from "../viewer/util";

function flipYZ(xyz) {
    return [xyz[0], xyz[2], xyz[1]];
}

export default class StlViewer extends React.Component {
    state = {
        initialized: false,
        resolution: {
            x: 640,
            y: 480,
        },
        model: null,
        cameraPosition: [1, 0, 0],
        up: [0, 1, 0],
        distance: 10,
        zoom: 1,
        rotation: {
            x: 0,
            y: 0,
            z: 0,
        },
        settings: {
            solid: true,
            wireframe: true,
        },
    };

    lastResolution = {
        x: 0,
        y: 0,
    };

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    load = (canvas) => {
        let shaders = [
            "shaders/color.vs.glsl",
            "shaders/color.fs.glsl",
            "shaders/wireframe.vs.glsl",
            "shaders/wireframe.fs.glsl",
        ];

        let loader = new Loader(shaders, (resources) =>
            this.init(canvas, resources)
        );

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
        const canvas = this.canvasRef.current;
        const w = canvas.width;
        const h = canvas.height;

        if (this.lastResolution.x !== w || this.lastResolution.y !== h) {
            // Update viewport size and projection matrix.

            this.gl.viewport(0, 0, w, h);

            mat4.perspective(
                this.projMatrix,
                glMatrix.toRadian(45),
                w / h,
                0.1,
                1000.0
            );
            this.lastResolution = {
                x: w,
                y: h,
            };
        }

        this.scene.cameraPosition = this.state.cameraPosition.map(
            (x) => x * this.state.zoom
        );
        // if (this.scene.getObject() !== this.state.model) {
        //     this.scene.bindStlModel(this.state.model);
        // }

        mat4.lookAt(
            this.viewMatrix,
            this.scene.cameraPosition,
            [0, 0, 0],
            this.state.up //[0, 1, 0]
        );

        this.gl.clearColor(0.7, 0.7, 0.7, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        if (!this.scene.getObject()) return;

        if (this.state.settings.solid) {
            this.gl.enable(this.gl.DEPTH_TEST);
            this.colorTriangleShader.use();
            this.colorTriangleShader.world = this.scene.rotationMatrix;
            this.colorTriangleShader.view = this.viewMatrix;
            this.colorTriangleShader.projection = this.projMatrix;
            this.colorTriangleShader.drawObject(this.scene.getObject());
        }

        if (this.state.settings.wireframe) {
            this.gl.disable(this.gl.DEPTH_TEST);
            this.wireframeShader.use();
            this.wireframeShader.world = this.scene.rotationMatrix;
            this.wireframeShader.view = this.viewMatrix;
            this.wireframeShader.projection = this.projMatrix;
            this.wireframeShader.drawObject(this.scene.getWireframeObject());
        }

        //requestAnimationFrame(this.renderScene);
    };

    init = (canvas, resources) => {
        this.gl = initGL(canvas, true, false);
        this.scene = new Scene(this.gl);

        this.colorTriangleShader = new ColorTriangleShader(
            this.gl,
            resources["shaders/color.vs.glsl"].result,
            resources["shaders/color.fs.glsl"].result
        );

        this.wireframeShader = new WireframeShader(
            this.gl,
            resources["shaders/wireframe.vs.glsl"].result,
            resources["shaders/wireframe.fs.glsl"].result
        );

        this.viewMatrix = new Float32Array(16);
        this.projMatrix = new Float32Array(16);

        this.colorTriangleShader.use();
        this.colorTriangleShader.setAmbientLightIntensity(0.1, 0.1, 0.1);
        this.colorTriangleShader.setSunLightIntensity(0.9, 0.9, 0.9);
        this.colorTriangleShader.setSunLightDirection(5.0, 0.0, -1.0);
        this.colorTriangleShader.setObjectColor(0.8, 0.2, 0.2, 1.0);

        this.wireframeShader.use();
        this.wireframeShader.setObjectColor(0.8, 0.2, 0.2, 1.0);

        this.setState({
            initialized: true,
        });
        //requestAnimationFrame(this.renderScene);
    };

    onModelChange = (model) => {
        const size = Math.max(
            model.AABB.max.x - model.AABB.min.x,
            Math.max(
                model.AABB.max.y - model.AABB.min.y,
                model.AABB.max.z - model.AABB.min.z
            )
        );

        this.setState({
            model,
            distance: size * 2,
            cameraPosition: [0.0, 0.0, -size * 2],
        });

        if (this.scene) {
            this.scene.bindStlModel(model);
        }
    };

    onRotationChange = (rotation) => {
        this.setState({
            rotation,
        });
        this.scene.rotation = rotation;
    };

    onOrbitChange = (orbit) => {
        console.log(orbit);
        this.setState({
            cameraPosition: orbit.position,
            up: orbit.up,
        });
    };

    onWheel = (event) => {
        event.preventDefault();

        let zoom = this.state.zoom * (event.deltaY > 0 ? 1.125 : 0.875);

        // Restrict scale
        zoom = Math.min(Math.max(0.125, zoom), 4);

        // Apply scale transform
        this.setState({
            zoom,
        });
    };

    onSettingsChange = (settings) => {
        this.setState({
            settings,
        });
    };

    updateCanvasResolution = () => {
        const canvas = this.canvasRef.current;
        const { width, height } = canvas.getBoundingClientRect();
        this.setState({
            resolution: {
                x: width,
                y: height,
            },
        });
    };

    componentDidMount() {
        const canvas = this.canvasRef.current;

        this.updateCanvasResolution();
        window.addEventListener("resize", this.updateCanvasResolution);
        canvas.addEventListener("wheel", this.onWheel, {
            passive: false,
        });
        this.load(canvas);
    }

    componentDidUpdate() {
        if (this.state.initialized) {
            this.renderScene();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateCanvasResolution);
        this.canvasRef.current.removeEventListener("wheel", this.onWheel);
    }

    renderControls() {
        if (!this.state.model) return null;

        return (
            <div className="ui grid">
                <div className="twelve wide column">
                    <div className="ui segment">
                        <Rotation
                            rotation={this.state.rotation}
                            onRotationChange={this.onRotationChange}
                        />
                    </div>
                </div>
                <div className="four wide column">
                    <RenderSettings onChange={this.onSettingsChange} />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Orbit
                    radius={Math.abs(this.state.distance)}
                    onOrbitChange={this.onOrbitChange}
                >
                    <canvas
                        ref={this.canvasRef}
                        style={{
                            width: "100%",
                            height: "50vh",
                            margin: "10px",
                        }}
                        width={this.state.resolution.x}
                        height={this.state.resolution.y}
                    />
                </Orbit>

                {this.renderControls()}
                <div className="ui segment">
                    <StlInput onModelChange={this.onModelChange} />
                </div>
            </div>
        );
    }
}
