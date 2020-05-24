class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);
        //nDivs = typeof nDivs !== 'undefined' ? nDivs : 1;

        /*this.nDivs = nDivs;
        this.size = size;
        this.patchLength = size / nDivs;*/

        this.plane = new MyPlane(this.scene, 10, 10);

        this.dropShader = new CGFshader(this.scene.gl, "shaders/dropShader.vert", "shaders/dropShader.frag");
        this.dropShader.setUniformsValues({drops: 5});

        this.numberSupplies = 5;
        
        this.initMaterials();
    }

    initMaterials() {
        this.backgroundTexture = new CGFappearance(this.scene);
        this.backgroundTexture.loadTexture('images/mercedes-petronas4.jpg');
        
        this.supportAppearance = new CGFappearance(this.scene);
		this.supportAppearance.setAmbient(2, 2, 2, 1);
		this.supportAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.supportAppearance.setSpecular(0.3, 0.5, 0.7, 1);
        this.supportAppearance.setShininess(50);        
    }

    updateBillboardValues() {
        this.numberSupplies -= 1;
        this.dropShader.setUniformsValues({drops: this.numberSupplies});
    }

    reset(){
        this.numberSupplies = 5;
        this.dropShader.setUniformsValues({drops : 5});
    }
    
    display() {

        this.scene.pushMatrix();

        this.scene.translate(0, -10, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);

        this.backgroundTexture.apply();
        this.scene.pushMatrix();
        this.scene.scale(1, 0.5, 1);
        this.plane.display();
        this.scene.popMatrix();

        this.supportAppearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(-4.25, -4.5, 0);
        this.scene.scale(0.05, 0.5, 1);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(4.25, -4.5, 0);
        this.scene.scale(0.05, 0.5, 1);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.dropShader);
        this.scene.pushMatrix();
        this.scene.scale(0.8, 0.2, 1);
        this.scene.translate(0, 0, -0.02);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();
    }
}