#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler1;

uniform float blimpSpeed;
uniform float t;

void main(){
    vTextureCoord = aTextureCoord;

    vec3 offset  = vec3(0.0,0.0,0.0);

    offset.z = sin(aVertexPosition.x +(t*0.01) + (blimpSpeed*20.0) * (aVertexPosition.x));

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset,1);
}