/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
	constructor(scene, nDivs, size, position, orientationAngle, velocity) {
        super(scene);
        this.orientationAngle = orientationAngle;
        

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
        this.scene.rotate(-this.orientationAngle,0,1,0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        // left face

        this.scene.pushMatrix();
        this.scene.translate(0+this.position[0], 0+this.position[1], this.size/2 - this.patchlenght/2+this.position[2]);
        this.scene.rotate(-this.orientationAngle,0,1,0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // right face

        this.scene.pushMatrix();
        this.scene.translate(0+this.position[0], 0+this.position[1], -this.size/2 + this.patchlenght/2+this.position[2]);
        this.scene.rotate(-this.orientationAngle,0,1,0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();

        // Front face

        this.scene.pushMatrix();
        this.scene.translate(this.size/2 - this.patchlenght/2+this.position[0], 0+this.position[1], 0+this.position[2]);
        this.scene.rotate(-this.orientationAngle,0,1,0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // bottom face

        this.scene.pushMatrix();
        this.scene.translate(0+this.position[0], +this.size/2 - this.patchlenght/2+this.position[1], 0+this.position[2]);
        this.scene.rotate(-this.orientationAngle,0,1,0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // top face

        this.scene.pushMatrix();
        this.scene.translate(0+this.position[0], -this.size/2 + this.patchlenght/2+this.position[1], 0+this.position[2]);
        this.scene.rotate(-this.orientationAngle,0,1,0);
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

    updateVehicleMovement(){
        this.position = [this.position[0]+this.velocity*Math.cos(this.orientationAngle), 0, this.position[2]+this.velocity*Math.sin(this.orientationAngle)];

    }

}