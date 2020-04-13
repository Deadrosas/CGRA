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
            -0.5, -0.5, 0.5, // front down left
            0.5, -0.5, 0.5,	// front down right
            -0.5, 0.5, 0.5,	// front top left
            0.5, 0.5, 0.5,	// front top right
            -0.5, -0.5, -0.5, // back down left
            0.5, -0.5, -0.5, // back down right
            -0.5, 0.5, -0.5, // back top left
            0.5, 0.5, -0.5, // back top right

            -0.5, -0.5, 0.5, // front down left
            0.5, -0.5, 0.5,	// front down right
            -0.5, 0.5, 0.5,	// front top left
            0.5, 0.5, 0.5,	// front top right
            -0.5, -0.5, -0.5, // back down left
            0.5, -0.5, -0.5, // back down right
            -0.5, 0.5, -0.5, // back top left
            0.5, 0.5, -0.5, // back top right

            -0.5, -0.5, 0.5, // front down left
            0.5, -0.5, 0.5,	// front down right
            -0.5, 0.5, 0.5,	// front top left
            0.5, 0.5, 0.5,	// front top right
            -0.5, -0.5, -0.5, // back down left
            0.5, -0.5, -0.5, // back down right
            -0.5, 0.5, -0.5, // back top left
            0.5, 0.5, -0.5, // back top right
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            // front face
			0, 1, 2,
			2, 1, 0,
			1, 2, 3,
            3, 2, 1,

            // back face
            4, 5, 6,
            6, 5, 4,
            5, 6, 7,
            7, 6, 5,

            // down face
            0, 1, 4,
            4, 1, 0,
            1, 4, 5,
            5, 4, 1,

            // top face
            2, 3, 6,
            6, 3, 2,
            3, 6, 7,
            7, 6, 3,

            // left face
            0, 2, 4,
            4, 2, 0,
            2, 4, 6,
            6, 4, 2,

            // right face
            1, 3, 5,
            5, 3, 1,
            3, 5, 7,
            7, 5, 3

        ];
        
        this.normals = [
            -1, 0, 0,
            1, 0, 0,
            -1, 0, 0,
            1, 0, 0,
            -1, 0, 0,
            1, 0, 0,
            -1, 0, 0,
            1, 0, 0,
            
            0, -1, 0,
            0, -1, 0,
            0, 1, 0,
            0, 1, 0,
            0, -1, 0,
            0, -1, 0,
            0, 1, 0,
            0, 1, 0,

            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1
        ];


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}