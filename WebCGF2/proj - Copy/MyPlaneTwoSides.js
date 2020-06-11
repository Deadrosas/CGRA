class MyPlaneTwoSides extends CGFobject {
    constructor(scene, nDivs, size) {
        super(scene);
        nDivs = typeof nDivs !== 'undefined' ? nDivs : 1;

        this.nDivs = nDivs;
        this.size = size;
        this.patchLength = size / nDivs;

        this.plane = new MyPlane(nDivs, size);
    }

    display() {
        this.plane.display();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();
    }
}