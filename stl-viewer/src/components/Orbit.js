import React from "react";

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function period(value, min, max) {
    const t = max - min;
    if (value < min) {
        const distance = min - value;
        const count = Math.ceil(distance / t);
        return value + count * t;
    }
    if (value > max) {
        const distance = value - max;
        const count = Math.ceil(distance / t);
        return value - count * t;
    }
    return value;
}

/**
 * Convert spherical coordinates to cartesian.
 * @param {number} r Radius
 * @param {number} long Longtitude
 * @param {number} lat Latitude
 * @returns Cartesian vector for specified location.
 */
function cartesian(r, long, lat) {
    const x = rad(long);
    const y = rad(lat);
    return [
        r * Math.cos(y) * Math.cos(x),
        r * Math.cos(y) * Math.sin(x),
        r * Math.sin(y),
    ];
}

/**
 * Convert degrees to radians.
 * @param {number} degrees Angle degrees.
 * @returns {number} Angle value in radians.
 */
function rad(degrees) {
    return (degrees * Math.PI) / 180;
}

/**
 * Opposite vector (all components are negated).
 * @param {[number]} vector
 * @returns {[number]} Returns opposite vector.
 */
function neg(vector) {
    return [-vector[0], -vector[1], -vector[2]];
}

/**
 * Get sum of two vectors.
 * @param {[number]} a
 * @param {[number]} b
 * @returns
 */
function sum(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

/**
 * Dot product of two vectors.
 * @param {[number]} a
 * @param {[number]} b
 * @returns {number} Returns scalar value - dot product of two vectors.
 */
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * Get cross product of two vectors.
 * @param {[number]} a
 * @param {[number]} b
 * @returns Returns a vector - cross product of two vectors.
 */
function cross(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
    ];
}

/**
 * Get vector length squared.
 * @param {[number]} a
 * @returns
 */
function sqr(a) {
    return dot(a, a);
}
/**
 * Scale vector using specified factor.
 * @param {[number]} vector Source vector.
 * @param {number} alpha Scale factor.
 * @returns {[number]} Scaled vector.
 */
function scale(vector, alpha) {
    return [vector[0] * alpha, vector[1] * alpha, vector[2] * alpha];
}

/**
 * Get vector projection onto another vector.
 * @param {[number]} vector
 * @param {[number]} axis
 * @returns
 */
function projectOntoAxis(vector, axis) {
    return scale(axis, dot(vector, axis) / sqr(axis));
}

/**
 * Get vector projection onto a plane.
 * @param {[number]} vector Vector to project.
 * @param {[number]} normal Plane normal.
 * @returns Projected vector.
 */
function projectOntoPlane(vector, normal) {
    return sum(vector, neg(projectOntoAxis(vector, normal)));
}

/**
 *
 * @param {[number]} vector
 * @param {[number]} targetLength
 * @returns
 */
function setLength(vector, targetLength) {
    const length = Math.sqrt(sqr(vector));
    return scale(vector, targetLength / length);
}

export default class Orbit extends React.Component {
    state = {
        position: [0, 0, 1],
        up: [0, 1, 0],
    };

    onMouseMove = (event) => {
        if (this.tracking) {
            const r = this.props.radius || 1;

            const { position, up } = this.state;
            const normal = setLength(position, 1);
            const right = cross(normal, up);

            const displacement = sum(
                scale(up, (event.movementY / 64.0) * r),
                scale(right, (event.movementX / 64.0) * r)
            );

            const nextPosition = setLength(sum(position, displacement), r);
            const nextUp = setLength(projectOntoPlane(up, normal), 1.0);

            const nextState = {
                position: nextPosition,
                up: nextUp,
            };

            this.setState(nextState);

            this.props.onOrbitChange({
                ...nextState,
                radius: r,
            });
        }
    };

    onMouseDown = (event) => {
        this.tracking = true;
    };

    onMouseUp = (event) => {
        this.tracking = false;
    };

    render() {
        return (
            <div
                onMouseMove={this.onMouseMove}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
            >
                {this.props.children}
            </div>
        );
    }
}
