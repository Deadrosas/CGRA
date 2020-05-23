class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);
        nDivs = typeof nDivs !== 'undefined' ? nDivs : 1;

        /*this.nDivs = nDivs;
        this.size = size;
        this.patchLength = size / nDivs;*/

        this.myBackground = MyPlane(10, 10);
        

        this.supplysBar = MyPlane(10, 10);
        this.dropShader = new CFGshader(scene.gl, "shaders/dropShader.vert", "shaders/dropShader.frag");

        this.support = MyPlane(10, 10);
        this.supportAppearance = new CGFappearance(this);
		this.supportAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.supportAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.supportAppearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.supportAppearance.setShininess(120);

        this.numberSupplies = 5;
        
        initMaterials();
    }

    initMaterials() {
        this.backgroundTexture = new CGFappearance(this.scene);
        this.backgroundTexture.loadTexture('images/mercedes-petronas4.jpg');
        
        this.supportAppearance = new CGFappearance(this.scene);
		this.supportAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.supportAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.supportAppearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.supportAppearance.setShininess(120);        
    }

    updateBillboardValues() {
        this.dropShader.setUniformsValues({drops: --this.numberSupplies});
    }

    reset(){
        this.numberSupplies = 5;
        this.dropShader.setUniformsValues({drops : 5});
    }
    
    display() {

        this.backgroundTexture.apply();
        this.scene.pushMatrix();
        this.myBackground.scale(2, 1, 1);
        this.myBackground.display();
        this.scene.popMatrix();

        this.progressShader.apply();
        this.scene.pushMatrix();
        this.support.scale(0.8, 0.2, 1);
        this.progressBar.display();
        this.scene.popMatrix();

        this.supportAppearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(-2.5, 0, 0);
        this.support.scale(0.1, 2, 1);
        this.support.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.5, 0, 0);
        this.support.scale(0.1, 2, 1);
        this.support.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.dropShader);
        this.scene.pushMatrix();
        this.scene.translate();//centro);
        this.scene.scale();//o necessario);
        this.supplysBar.display();
        this.scene.popMatrix();


        this.scene.setActiveShader(this.scene.defaultShader);
    }
}