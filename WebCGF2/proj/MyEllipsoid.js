class MyEllipsoid extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene, slices, stacks) {
    super(scene);
    this.blimpMaterial = new CGFappearance(this.scene);
    this.blimpMaterial.setAmbient(2.5, 2.5, 2.5, 1);
    this.blimpMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
    this.blimpMaterial.setSpecular(0.2, 0.2, 0.2, 0.2);
    this.blimpMaterial.setShininess(10.0);

    this.mysphere = new MySphere(this.scene, slices, stacks)
  }
  

  
  display(){
    this.scene.pushMatrix();
    this.blimpMaterial.apply();
    this.scene.scale(2,1,1);
    this.mysphere.display();
    this.scene.popMatrix();
  }  
}
  