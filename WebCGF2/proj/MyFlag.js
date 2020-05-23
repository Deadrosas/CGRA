class MyFlag extends CGFobject {
    constructor(scene, nDivs, size) {
        super(scene);
        nDivs = typeof nDivs !== 'undefined' ? nDivs : 1;

        this.nDivs = nDivs;
        this.size = size;
        this.patchLength = size / nDivs;

        this.myRectangle = new MyPlane(scene,nDivs,size);
    }



    display(){
        this.scene.pushMatrix()
        this.myRectangle.display();
        
        this.scene.popMatrix();
    }

}