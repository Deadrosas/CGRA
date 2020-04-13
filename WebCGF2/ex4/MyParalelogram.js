/**
 * MyParalelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyParalelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			2, 0, 0,	//1
            1, 1, 0,	//2
			3, 1, 0	    //3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            0, 1, 2,
            2, 1, 0,
            2, 1, 3,
			2, 3, 1,
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];

		this.texCoords = [
			0.5, 1,
			1, 1,
			0.25, 0.75,
			0.75, 0.75
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the diamond
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}