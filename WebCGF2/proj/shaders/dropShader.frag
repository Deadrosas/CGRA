S#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;


varying vec4 coordinates;

uniform int drops;

void main(){


    gl_FragColor.rgb = vec4(1,1,1,1);
    
    
}