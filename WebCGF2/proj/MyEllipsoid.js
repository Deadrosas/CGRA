class MyEllipsoid extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene, slices, stacks) {
    super(scene);
    //this.blimpMaterial = new CGFappearance(this.scene);
    //this.blimpMaterial.loadTexture('images/nuclear4.png');

    this.mysphere = new MySphere(this.scene, slices, stacks)
  }
  

  
  display(){
    this.scene.pushMatrix();
    //this.blimpMaterial.apply();
    this.scene.scale(2,1,1);
    this.mysphere.display();
    this.scene.popMatrix();
  }  
}
  