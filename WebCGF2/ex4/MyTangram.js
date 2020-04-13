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
        this.redMaterial.loadTexture('images/tangram.png');

        // green material
        this.greenMaterial = new CGFappearance(this.scene);
        this.greenMaterial.loadTexture('images/tangram.png');

        // orange material
        this.orangeMaterial = new CGFappearance(this.scene);
        this.orangeMaterial.loadTexture('images/tangram.png');  

        // blue material
        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.loadTexture('images/tangram.png');

        // purple material
        this.purpleMaterial = new CGFappearance(this.scene);
        this.purpleMaterial.loadTexture('images/tangram.png');

        // yellow material
        this.yellowMaterial = new CGFappearance(this.scene);
        this.yellowMaterial.loadTexture('images/tangram.png');

        // pink material
        this.pinkMaterial = new CGFappearance(this.scene);
        this.pinkMaterial.loadTexture('images/tangram.png');
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
        this.greenMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        // draw left body
        this.scene.pushMatrix();
        this.scene.translate(-1, -1 , 0 , 1);
        this.scene.scale(2/Math.sqrt(8), 2/Math.sqrt(8), 1);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.triangleBig.updateTexCoords([
			1, 0,
			1, 1,
			0.5, 0.5
		]); 
        this.orangeMaterial.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        // draw right body
        this.scene.pushMatrix();
        this.scene.translate(-1, -1 , 0 , 1);
        this.scene.scale(2/Math.sqrt(8), 2/Math.sqrt(8), 1);
        this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
        this.triangleBig.updateTexCoords([
            0, 0,
            1, 0,
            0.5, 0.5
        ]);
        this.blueMaterial.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        // draw feets
        this.scene.pushMatrix();
        this.scene.translate(-1, -1/Math.sqrt(2) - 2 , 0 , 1);
        this.scene.scale(1/Math.sqrt(2), 1/Math.sqrt(2), 1);
        this.triangleSmall.updateTexCoords([
			0, 0,
			0, 0.5,
			0.25, 0.25
		]);
        this.purpleMaterial.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();

        // draw beak
        this.scene.pushMatrix();
        this.scene.translate(-0.5 - 2, 0.5 , 0 , 1);
        this.scene.scale(1/Math.sqrt(2), 1/Math.sqrt(2), 1);
        this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
        this.redMaterial.apply();
        this.triangleSmall.updateTexCoords([
			0.25, 0.75,
			0.75, 0.75,
			0.5, 0.5
		]);
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
        this.triangleSmall.updateTexCoords([
			0, 0.5,
			0.5, 1,
			0, 1
		]);
        this.triangleSmall.display();
        this.scene.popMatrix();
    }
}