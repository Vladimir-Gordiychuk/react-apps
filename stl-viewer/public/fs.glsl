precision mediump float;

struct DirectionalLight {
    vec3 direction;
    vec3 color;
};

varying vec3 fragNormal;

uniform vec3 ambientLightIntensity;
uniform DirectionalLight sun;
uniform vec4 color;

void main()
{
    vec3 surfaceNormal = normalize(fragNormal);
    vec3 sunLightDirection = normalize(sun.direction);

    vec3 lightIntensity = ambientLightIntensity + sun.color * max(dot(surfaceNormal, sunLightDirection), 0.0);

    gl_FragColor = vec4(color.xyz * lightIntensity, color.a);
}
