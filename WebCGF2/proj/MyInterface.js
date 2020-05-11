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
        //this.gui.add(this.scene, 'objectComplexity', 4, 32,1).onChange(this.scene.updateObjectComplexity.bind(this.scene));

        //this.gui.add(this.scene, 'sizeBox', 5, 100,1).onChange(this.scene.updateBoxSize.bind(this.scene));

        var sceneFolder = this.gui.addFolder('Scene');
        sceneFolder.add(this.scene, 'periodFactor', 1, 50,1).onChange(this.scene.updatePeriodFactor.bind(this.scene));;

        var blimpFolder = this.gui.addFolder('Blimp');
        blimpFolder.add(this.scene, 'scaleFactor', 1, 100,1).onChange(this.scene.updateScaleFactor.bind(this.scene));
        blimpFolder.add(this.scene, 'speedFactor', 1, 100,1).onChange(this.scene.updateSpeedFactor.bind(this.scene));
        blimpFolder.add(this.scene, 'orientationFactor', 1, 100,1).onChange(this.scene.updateOrientationFactor.bind(this.scene));
        
        //Choosing elements in GUI
        //this.gui.add(this.scene, 'selectedObject', this.scene.objectIDs).name('Selected Object').onChange();
        
        this.initKeys();

        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;
        // disable the processKeyboard function
        this.processKeyboard=function(){};
        // create a named array to store which keys are being pressed
        this.activeKeys={};
    }
    
    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    };

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    };

    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    };
    
        
}