/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.scene = scene;
        
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.paralelogram = new MyParalelogram(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);

        // red material
        this.redMaterial = new CGFappearance(this.scene);
        this.redMaterial.setAmbient(1, 0, 0, 1.0);
        this.redMaterial.setDiffuse(0, 0, 0, 1.0);
        this.redMaterial.setSpecular(1, 0, 0, 1.0);
        this.redMaterial.setShininess(10.0);

        // green material
        this.greenMaterial = new CGFappearance(this.scene);
        this.greenMaterial.setAmbient(0, 1, 0, 1.0);
        this.greenMaterial.setDiffuse(0, 0, 0, 1.0);
        this.greenMaterial.setSpecular(1, 0, 0, 1.0);
        this.greenMaterial.setShininess(10.0);

        // orange material
        this.orangeMaterial = new CGFappearance(this.scene);
        this.orangeMaterial.setAmbient(1, 0.5, 0, 1.0);
        this.orangeMaterial.setDiffuse(0, 0, 0, 1.0);
        this.orangeMaterial.setSpecular(1, 0, 0, 1.0);
        this.orangeMaterial.setShininess(10.0);

        // blue material
        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.setAmbient(0.5, 0.5, 1, 1.0);
        this.blueMaterial.setDiffuse(0, 0, 0, 1.0);
        this.blueMaterial.setSpecular(1, 0, 0, 1.0);
        this.blueMaterial.setShininess(10.0);

        // purple material
        this.purpleMaterial = new CGFappearance(this.scene);
        this.purpleMaterial.setAmbient(0.5, 0.2, 0.9, 1.0);
        this.purpleMaterial.setDiffuse(0, 0, 0, 1.0);
        this.purpleMaterial.setSpecular(1, 0, 0, 1.0);
        this.purpleMaterial.setShininess(10.0);

        // yellow material
        this.yellowMaterial = new CGFappearance(this.scene);
        this.yellowMaterial.setAmbient(1, 1, 0, 1.0);
        this.yellowMaterial.setDiffuse(0, 0, 0, 1.0);
        this.yellowMaterial.setSpecular(1, 0, 0, 1.0);
        this.yellowMaterial.setShininess(10.0);

        // pink material
        this.pinkMaterial = new CGFappearance(this.scene);
        this.pinkMaterial.setAmbient(0.9, 0.5, 0.9, 1.0);
        this.pinkMaterial.setDiffuse(0, 0, 0, 1.0);
        this.pinkMaterial.setSpecular(1, 0, 0, 1.0);
        this.pinkMaterial.setShininess(10.0);


    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.paralelogram.enableNormalViz();
        this.triangleSmall.enableNormalViz();
        this.triangleBig.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.paralelogram.disableNormalViz();
        this.triangleSmall.disableNormalViz();
        this.triangleBig.disableNormalViz();
    }
    
    display() {
        // draw diamond
        this.scene.pushMatrix();
        this.scene.translate(-0.5 - 1, 0.5, 0);
        this.scene.scale(1/Math.sqrt(2), 1/Math.sqrt(2), 1);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.materials[3].apply();
        this.diamond.display();
        this.scene.popMatrix();

        // draw left body
        this.scene.pushMatrix();
        this.scene.translate(-1, -1 , 0 , 1);
        this.scene.scale(2/Math.sqrt(8), 2/Math.sqrt(8), 1);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.orangeMaterial.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        // draw right body
        this.scene.pushMatrix();
        this.scene.translate(-1, -1 , 0 , 1);
        this.scene.scale(2/Math.sqrt(8), 2/Math.sqrt(8), 1);
        this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
        this.blueMaterial.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        // draw feets
        this.scene.pushMatrix();
        this.scene.translate(-1, -1/Math.sqrt(2) - 2 , 0 , 1);
        this.scene.scale(1/Math.sqrt(2), 1/Math.sqrt(2), 1);
        this.purpleMaterial.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();

        // draw beak
        this.scene.pushMatrix();
        this.scene.translate(-0.5 - 2, 0.5 , 0 , 1);
        this.scene.scale(1/Math.sqrt(2), 1/Math.sqrt(2), 1);
        this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
        this.redMaterial.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();

        // draw left tail
        this.scene.pushMatrix();
        this.scene.translate(0, -2/Math.sqrt(2), 0 , 1);
        this.scene.scale(1/Math.sqrt(2), -1/Math.sqrt(2), 1)
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.yellowMaterial.apply();
        this.paralelogram.display();
        this.scene.popMatrix();

        // draw right tail
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2), 0, 0, 1);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.pinkMaterial.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();
    }
}