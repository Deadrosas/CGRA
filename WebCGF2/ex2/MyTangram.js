/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
    super(scene);
    this.scene=scene
    
    }
    display(){
      this.diamond = new MyDiamond(this.scene);
      this.triangleBig = new MyTriangleBig(this.scene);
      this.triangleSmall = new MyTriangleSmall(this.scene);
      this.triangle = new MyTriangle(this.scene);
      this.paralelogram = new MyParalelogram(this.scene);
     //Draw square
     this.scene.pushMatrix();
     this.scene.translate(0,Math.sqrt(8)-Math.sqrt(2)/2,0,1);
     this.scene.rotate(Math.PI/4,0,0,1);
     this.diamond.display();
     this.scene.popMatrix();

     //Draw one Big Triangle
     this.scene.pushMatrix();
     this.scene.translate(Math.sqrt(2)/2,0,0,1);
     this.scene.rotate(Math.PI/4,0,0,1);
     this.triangleBig.display();
     this.scene.popMatrix();

     //Draw the second Big Triangle
     this.scene.pushMatrix();
     this.scene.translate(Math.sqrt(2)/2,0,0,1);
     this.scene.rotate(5*Math.PI/4,0,0,1);
     this.triangleBig.display();
     this.scene.popMatrix();
     //Draw the beek
     this.scene.pushMatrix();
     this.scene.translate(-Math.sqrt(2),Math.sqrt(8)-Math.sqrt(2)/2,0,1);
     this.scene.rotate(5*Math.PI/4,0,0,1);
     this.triangleSmall.display();
     this.scene.popMatrix();
     
     //Draw the feet
     this.scene.pushMatrix();
     this.scene.translate(Math.sqrt(2)/2,-Math.sqrt(16)/2-Math.sqrt(2)+1,0,1);
     this.triangleSmall.display();
     this.scene.popMatrix();

     //Draw first part of the Tail
     this.scene.pushMatrix();
     this.scene.translate(3/2*Math.sqrt(2),Math.sqrt(16)/2+Math.sqrt(2)-4,0,1);
     this.scene.rotate(-Math.PI/2,0,0,1);
     this.scene.scale(-1,1,1,1);
     this.paralelogram.display();
     this.scene.popMatrix();

     //Draw the second part of the Tail
     this.scene.pushMatrix();
     this.scene.translate(3/2*Math.sqrt(2)+2,Math.sqrt(16)/2+Math.sqrt(2)-2,0,1);
     this.scene.rotate(-Math.PI/2,0,0,1);
     this.triangle.display();
     this.scene.popMatrix();
    }
	 
}