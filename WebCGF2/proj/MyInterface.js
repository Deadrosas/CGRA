/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'objectComplexity', 4, 32,1).onChange(this.scene.updateObjectComplexity.bind(this.scene));

        this.gui.add(this.scene, 'sizeBox', 5, 100,1).onChange(this.scene.updateBoxSize.bind(this.scene));
        
        //Choosing elements in GUI
        this.gui.add(this.scene, 'selectedObject', this.scene.objectIDs).name('Selected Object').onChange();
        return true;
    }
}