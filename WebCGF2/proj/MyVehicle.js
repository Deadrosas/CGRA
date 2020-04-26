/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
	constructor(scene, nDivs, size, position, orientationLevel, velocity) {
        super(scene);
        this.orientationLevel = orientationLevel;
        this.orientations = [-Math.PI/3/1,-Math.PI/3/2,-Math.PI/3/3,-Math.PI/3/4,-Math.PI/3/5,-Math.PI/3/6,-Math.PI/3/7,-Math.PI/3/8,-Math.PI/3/9,-Math.PI/3/10,0,Math.PI/3/10,Math.PI/3/9,Math.PI/3/8,Math.PI/3/7,Math.PI/3/6,Math.PI/3/5,Math.PI/3/4,Math.PI/3/3,Math.PI/3/2,Math.PI/3/1]
        this.orientationAngle = 0;
        this.radiusSize = [-10^0, -10^1, -10^2, -10^3, -10^4, -10^5, -10^6, 10^20, 10^6, 10^5, 10^4, 10^3, 10^2, 10^1, 10^0];
        //for (int i)
        /*
        an = v^2/r
        W e S aumentam o V
        A e D aumentam e diminuem o r


        



        */

        this.position = position;
        this.velocity = velocity;
        
        this.nDivs = 2;
        this.size = this.nDivs/2;
        this.patchlenght = this.size / this.nDivs;
        this.scene = scene;
        this.quad = new MyPlane(this.scene, this.nDivs, this.size);
    }

    enableNormalViz() {
        this.quad.enableNormalViz();
    }

    disableNormalViz() {
        this.quad.disableNormalViz();
    }
    
    display() {
        //Back face
        this.scene.pushMatrix();
        this.scene.translate(-this.size/2 + this.patchlenght/2+this.position[0], 0+this.position[1], 0+this.position[2]);
        //this.scene.translate(-this.size/2 + this.patchlenght/2, this.size/2 - this.patchlenght/2, this.size/2);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        // left face

        this.scene.pushMatrix();
        this.scene.translate(0+this.position[0], 0+this.position[1], this.size/2 - this.patchlenght/2+this.position[2]);
        //this.scene.translate(-this.size/2 + this.patchlenght/2, this.size/2 - this.patchlenght/2, this.size/2);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // right face

        this.scene.pushMatrix();
        this.scene.translate(0+this.position[0], 0+this.position[1], -this.size/2 + this.patchlenght/2+this.position[2]);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();

        // Front face

        this.scene.pushMatrix();
        this.scene.translate(this.size/2 - this.patchlenght/2+this.position[0], 0+this.position[1], 0+this.position[2]);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // bottom face

        this.scene.pushMatrix();
        this.scene.translate(0+this.position[0], +this.size/2 - this.patchlenght/2+this.position[1], 0+this.position[2]);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // top face

        this.scene.pushMatrix();
        this.scene.translate(0+this.position[0], -this.size/2 + this.patchlenght/2+this.position[1], 0+this.position[2]);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        
        this.quad.display();
        this.scene.popMatrix();
    }

    /*updateBuffers(complexity, size){
        this.nDivs =  complexity;
        this.size = size;
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }*/

    updateVehicleMovement(t){
        this.position = [this.position[0]+this.velocity*Math.cos(t), 0, 0];
    }

}