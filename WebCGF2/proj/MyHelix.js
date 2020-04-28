class MyHelix extends CGFobject {
    constructor(scene, slices, stacks,rotationlevel = 0) {
        super(scene);
        this.earthtexture = new CGFappearance(this.scene);
        this.earthtexture.loadTexture('images/earth.jpg');
        this.mysphere = new MySphere(this.scene, slices, stacks);
        this.myellipsoid = new MyEllipsoid(this.scene, slices, stacks);
        this.rotationlevel = rotationlevel;
    }
  

  
    display(){
        this.scene.pushMatrix()
        this.rotationlevel = (Math.PI) * (this.rotationlevel)%60;
        console.log(this.rotationlevel%60);
        this.scene.rotate(this.rotationlevel, 1, 0, 0);

        
        this.scene.pushMatrix();
        this.mysphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 7, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.scale(3,0.8,0.8);
        this.myellipsoid.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -7, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.scale(3,0.8,0.8);
        this.myellipsoid.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        
    }  
}