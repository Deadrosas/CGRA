/**
 * MyRudder
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyRudder extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
	initBuffers() {
		this.vertices = [
            0, 0, 0,
            20, 0, 0,
            20, 0, 10,
            14, 0, 10,
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            0, 1, 2,
            2, 1, 0,
            2, 3, 0,
            0, 3, 2
		];

		//Facing Z positive
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
    }
    
    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.07,0.07,0.07);
        super.display();
        this.scene.popMatrix();
	}
}