/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
    super(scene);
    this.scene=scene
    
    }
    display(){
      this.quad = new MyQuad(this.scene);
      this.quad.display();
      this.scene.pushMatrix();
      this.scene.translate(0,-Math.sqrt(2),0);
      this.quad.display();
      this.scene.popMatrix();
      
      this.scene.pushMatrix();
      this.scene.translate(-Math.sqrt(2)/2,-Math.sqrt(2)/2,0);
      this.scene.rotate(Math.PI/2,0,0,1);
      this.quad.display();
      this.scene.popMatrix();
      
      this.scene.pushMatrix();
      this.scene.translate(Math.sqrt(2)/2,-Math.sqrt(2)/2,0);
      this.scene.rotate(Math.PI/2,0,0,1);
      this.quad.display();
      this.scene.popMatrix();
      
      this.scene.pushMatrix();
      this.scene.translate(0,-Math.sqrt(2)/2,Math.sqrt(2)/2);
      this.scene.rotate(Math.PI/2,1,0,0);
      this.quad.display();
      this.scene.popMatrix();
      
      this.scene.pushMatrix();
      this.scene.translate(0,-Math.sqrt(2)/2,-Math.sqrt(2)/2);
      this.scene.rotate(Math.PI/2,1,0,0);
      this.quad.display();
      this.scene.popMatrix();
    }
	 
}