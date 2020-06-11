attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {

	vec4 color = texture2D(uSampler, aTextureCoord);
	vec4 filter = texture2D(uSampler2, vec2(0.0,0.0)+aTextureCoord);

	vec3 offset = vec3(0.0,0.0,0.0);

	offset.z = filter.b;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);

	vTextureCoord = aTextureCoord;
}