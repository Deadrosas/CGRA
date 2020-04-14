/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBackgroundCube extends CGFobject {
	constructor(scene) {
        super(scene);
        this.scene = scene;
        this.quad = new MyQuad(this.scene);
        this.cubeMaterial = new CGFappearance(this.scene);
        this.cubeMaterial.setAmbient(1.0, 1.0, 1.0, 1);
        this.cubeMaterial.setDiffuse(1.0, 1.0, 1.0, 1);
        this.cubeMaterial.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.cubeMaterial.setShininess(10.0);

        this.topTexture = new CGFtexture(this.scene, 'images/split_cubemap/top.png');
        this.bottomTexture = new CGFtexture(this.scene, 'images/split_cubemap/bottom.png');
        this.backTexture = new CGFtexture(this.scene, 'images/split_cubemap/back.png');
        this.frontTexture = new CGFtexture(this.scene, 'images/split_cubemap/front.png');
        this.leftTexture = new CGFtexture(this.scene, 'images/split_cubemap/left.png');
        this.rightTexture = new CGFtexture(this.scene, 'images/split_cubemap/right.png');
    }

    enableNormalViz() {
        this.quad.enableNormalViz();
    }

    disableNormalViz() {
        this.quad.disableNormalViz();
    }
    
    display() {

        //Back face
        this.cubeMaterial.setTexture(this.backTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.cubeMaterial.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 30);
        this.quad.display();
        this.scene.popMatrix();
        
        // left face
        this.cubeMaterial.setTexture(this.leftTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.cubeMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(30, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // right face
        this.cubeMaterial.setTexture(this.rightTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.cubeMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(-30, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Front face
        this.cubeMaterial.setTexture(this.frontTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.cubeMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -30);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // bottom face
        this.cubeMaterial.setTexture(this.bottomTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.cubeMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, -30, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // top face
        this.cubeMaterial.setTexture(this.topTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.cubeMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, 30, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        
        this.quad.display();
        this.scene.popMatrix();

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    }

}