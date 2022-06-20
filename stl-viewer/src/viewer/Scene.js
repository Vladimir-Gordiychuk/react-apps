import { mat4 } from "gl-matrix";
import TrinormalObject from "./TrinormalObject";
import WireframeObject from "./WireframeObject";

export default class Scene {
    constructor(gl) {
        this.gl = gl;

        this._rotation = [0.0, 0.0, 0.0];
        this._rotationSpeed = [0.0, 0.0, 0.0];

        this._camera = {
            position: [0.0, 0.0, -20.0],
            lookAt: [0.0, 0.0, 0.0],
            up: [0.0, 1.0, 0.0],
        };

        this.model = null;
        this.wireframeObject = null;

        this.identityMatrix = new Float32Array(16);
        mat4.identity(this.identityMatrix);
    }

    get rotation() {
        return this._rotation;
    }

    set rotation(rot) {
        this._rotation = [rot.x, rot.y, rot.z];
    }

    get rotationSpeed() {
        return this._rotationSpeed;
    }

    set rotationSpeed(rotSpeed) {
        this._rotationSpeed = [rotSpeed.x, rotSpeed.y, rotSpeed.z];
    }

    get cameraPosition() {
        return this._camera.position;
    }

    set cameraPosition(camPos) {
        this._camera.position = camPos;
    }

    get rotationMatrix() {
        const degresToRadians = (2.0 * Math.PI) / 360.0;

        const matrix = new Float32Array(16);
        mat4.identity(matrix);

        mat4.rotate(
            matrix,
            matrix,
            this._rotation[0] * degresToRadians,
            [1, 0, 0]
        );
        mat4.rotate(
            matrix,
            matrix,
            this._rotation[1] * degresToRadians,
            [0, 1, 0]
        );
        mat4.rotate(
            matrix,
            matrix,
            this._rotation[2] * degresToRadians,
            [0, 0, 1]
        );

        return matrix;
    }

    bindStlModel = (stlModel) => {
        this.model = new TrinormalObject(this.gl);
        this.model.loadFromStl(stlModel);

        this.wireframeObject = new WireframeObject(this.gl);
        this.wireframeObject.loadFromStl(stlModel);
    };

    getObject = () => {
        return this.model;
    };

    getWireframeObject = () => {
        return this.wireframeObject;
    };
}
