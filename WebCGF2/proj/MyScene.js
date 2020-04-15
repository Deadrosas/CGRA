/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);

        this.myBackground = new MyBackgroundCube(this, 8, 8);

        this.mycylinder = new MyCylinder(this,6);
        this.mysphere = new MySphere(this, 30, 30);
        this.myplane = new MyPlane(this, 8, 8);
        this.myvehicle = new MyVehicle(this, 6, 6);
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.objectComplexity = 6;
        this.sizeBox = 30;

        this.objects = [this.mycylinder, this.mysphere, this.myplane, this.myvehicle]
        this.objectIDs = { 'Cylinder': 0, 'Sphere': 1, 'Plane': 2, 'Vehicle': 3};
        this.selectedObject = 0;
        
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }


    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        //To be done...
    }

    updateObjectComplexity(){
        this.mycylinder.updateBuffers(this.objectComplexity);

        this.myvehicle.updateBuffers(this.objectComplexity);
        //this.myplane.updateBuffers(this.objectComplexity, this.sizeBox);
    }

    updateBoxSize(){
        //this.MyBackgroundCube.updateBuffers(this.objectComplexity, this.sizeBox);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        this.myBackground.display();
        this.objects[this.selectedObject].display();

        // ---- END Primitive drawing section
    }
}