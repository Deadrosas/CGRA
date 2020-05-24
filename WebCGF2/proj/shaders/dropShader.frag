#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec4 normal;
uniform float drops;

void main() {

    if (coords.x < 1.0 - (drops / 5.0))
        gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
    else
        gl_FragColor = vec4(coords.x, 1.0-coords.x, 0.0, 1.0);
}