const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2,
}
class MySupply extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     */

    constructor(scene, nDivs, size, blimpPosition) {
        super(scene);

        this.position = blimpPosition;
        this.startHeight = blimpPosition[1]+21.8;

        this.nDivs = nDivs;
        this.size = size;
        this.patchlenght = size / nDivs;
        this.scene = scene;
        this.quad = new MyPlane(this.scene, nDivs, size);
        this.crateMaterial = new CGFappearance(this.scene);
        this.crateMaterial.setAmbient(2.5, 2.5, 2.5, 1);
        this.crateMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
        this.crateMaterial.setSpecular(0.2, 0.2, 0.2, 0.2);
        this.crateMaterial.setShininess(10.0);

        this.crateTexture = new CGFtexture(this.scene, 'images/crateTexture-2.jpg');
        this.crateMaterial.setTexture(this.crateTexture);
        
        this.currentState = SupplyStates.INACTIVE;
        
    }
    
  
    fallingDisplay() {
        //Back face
        this.crateMaterial.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(this.position[0] + this.size/2 - this.patchlenght/2, this.position[1], this.position[2]);
        //this.scene.translate(-this.size/2 + this.patchlenght/2, this.size/2 - this.patchlenght/2, this.size/2);
        //this.scene.rotate(-Math.PI, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        // left face
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]-this.size/2 + this.patchlenght/2);
        //this.scene.translate(-this.size/2 + this.patchlenght/2, this.size/2 - this.patchlenght/2, this.size/2);
        this.scene.rotate(-Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // right face

        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2] + this.size/2 - this.patchlenght/2);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();

        // Front face

        this.scene.pushMatrix();
        this.scene.translate(this.position[0]-this.size/2 + this.patchlenght/2, this.position[1], this.position[2]);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // top face

        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1]+this.size/2 - this.patchlenght/2, this.position[2]);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // bottom face

        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1]-this.size/2 + this.patchlenght/2, this.position[2]);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
    }

    landedDisplay() {
        //Back face
        this.crateMaterial.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(this.position[0] + this.size - this.patchlenght, this.position[1], this.position[2]);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        // left face
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]-this.size + this.patchlenght);
        this.scene.rotate(-Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // right face

        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2] + this.size - this.patchlenght);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Front face

        this.scene.pushMatrix();
        this.scene.translate(this.position[0]-this.size + this.patchlenght, this.position[1], this.position[2]);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // bottom face

        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
    }
    
    display(){
        this.fallingDisplay();
    }

    drop(blimpPosition) {
        this.position = blimpPosition;
        
    }

    updateFallPosition(period){
        
        if(this.position[1]>-this.startHeight){
            this.position = [this.position[0], this.position[1]-period/1000*this.startHeight/3, this.position[2]];

        }
        else{
            this.currentState = SupplyStates.LANDED;
        }
        
        //console.log(this.position);
    }

  }