class MyHelix extends CGFobject {
    constructor(scene, slices, stacks,rotationlevel = 0) {
        super(scene);
        this.mysphere = new MySphere(this.scene, slices, stacks);
        this.myellipsoid = new MyEllipsoid(this.scene, slices, stacks);
        this.rotationlevel = rotationlevel;
    }
  

    display(){
        this.scene.pushMatrix()
        //console.log(this.rotationlevel);
        this.scene.rotate(this.rotationlevel, 1, 0, 0);

        this.scene.pushMatrix();
        this.mysphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 4, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.scale(1.5,0.4,0.4);
        this.myellipsoid.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -4, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.scale(1.5,0.4,0.4);
        this.myellipsoid.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        
    }

    incrementVelocity(v, period) {
        this.rotationlevel += (v*period);
    }
}