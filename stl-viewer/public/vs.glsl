precision mediump float;

attribute vec3 vertPosition;
attribute vec3 vertNormal;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

varying vec3 fragNormal;

void main()
{
 fragNormal = (mWorld * vec4(vertNormal, 0.0)).xyz;
 gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
}
