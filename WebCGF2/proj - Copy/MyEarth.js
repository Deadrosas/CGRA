class MyEarth extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
     */
    constructor(scene, slices, stacks) {
        super(scene);
        this.earthtexture = new CGFappearance(this.scene);
        this.earthtexture.loadTexture('images/earth.jpg');
        this.mysphere = new MySphere(this.scene, slices, stacks)
    }
  

  
    display(){
        this.scene.pushMatrix();
        this.earthtexture.apply();
        this.mysphere.display();
        this.scene.popMatrix();
    }  
}