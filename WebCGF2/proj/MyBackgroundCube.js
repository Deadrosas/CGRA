/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBackgroundCube extends CGFobject {
	constructor(scene, nDivs, size) {
        super(scene);
        this.nDivs = nDivs;
        this.size = size;
        this.patchlenght = size / nDivs;
        this.scene = scene;
        this.quad = new MyPlane(this.scene, nDivs, size);
        //this.quad = new MyTerrain(this.scene, nDivs, 0, size, 0, size);
        this.cubeMaterial = new CGFappearance(this.scene);
        this.cubeMaterial.setAmbient(2.5, 2.5, 2.5, 1);
        this.cubeMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
        this.cubeMaterial.setSpecular(0.2, 0.2, 0.2, 0.2);
        this.cubeMaterial.setShininess(10.0);

        this.topTexture = new CGFtexture(this.scene, 'images/split_cubemap3/top.png');
        this.bottomTexture = new CGFtexture(this.scene, 'images/split_cubemap3/bottom.png');
        this.backTexture = new CGFtexture(this.scene, 'images/split_cubemap3/back.png');
        this.frontTexture = new CGFtexture(this.scene, 'images/split_cubemap3/front.png');
        this.leftTexture = new CGFtexture(this.scene, 'images/split_cubemap3/left.png');
        this.rightTexture = new CGFtexture(this.scene, 'images/split_cubemap3/right.png');
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
        this.scene.translate(this.size/2 - this.patchlenght/2, 0, 0);
        //this.scene.translate(-this.size/2 + this.patchlenght/2, this.size/2 - this.patchlenght/2, this.size/2);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        // left face
        this.cubeMaterial.setTexture(this.leftTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.cubeMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -this.size/2 + this.patchlenght/2);
        //this.scene.translate(-this.size/2 + this.patchlenght/2, this.size/2 - this.patchlenght/2, this.size/2);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // right face
        this.cubeMaterial.setTexture(this.rightTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.cubeMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, this.size/2 - this.patchlenght/2);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();

        // Front face
        this.cubeMaterial.setTexture(this.frontTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.cubeMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(-this.size/2 + this.patchlenght/2, 0, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // bottom face
        this.cubeMaterial.setTexture(this.bottomTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.cubeMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, -this.size/2 + this.patchlenght/2, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // top face
        this.cubeMaterial.setTexture(this.topTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.cubeMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, this.size/2 - this.patchlenght/2, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        
        this.quad.display();
        this.scene.popMatrix();

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    }

    updateBuffers(complexity, size){
        this.nDivs =  complexity;
        this.size = size;
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

}