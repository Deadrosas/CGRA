/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			0, -1, 0,	//1
			0, 1, 0,	//2
            1, 0, 0,	//3
            -1, 0, Math.sqrt(2),	//4
			0, -1, Math.sqrt(2),	//5
			0, 1, Math.sqrt(2),		//6
            1, 0, Math.sqrt(2)		//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
            1, 2, 3,
            4, 5, 6,
            6, 5, 7,
            7, 5, 1,
            7, 1, 3,
            6, 7, 3,
            6, 3, 2,
            4, 6, 2,
            4, 2, 0,
            5, 4, 0,
            5, 0, 1,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}