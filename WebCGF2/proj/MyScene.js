/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
        //this.gui = null;
    }
    init(application) {
        super.init(application);

        this.periodFactor = 5;
        this.cameraZoomFactor = 1;
        this.cameraZoom = 0;

        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        
        /*this.testShaders = [
            new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag")
        ];
        
        this.shadersList = {
            'Terrain': 11
        }*/

        this.terrainShader = new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        this.setUpdatePeriod(this.periodFactor);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);

        this.myBackground = new MyBackgroundCube(this, 200, 200);

        this.mycylinder = new MyCylinder(this,6);
        this.myearth = new MyEarth(this, 30, 30);
        this.myblimp = new MyBlimp(this,50,50);
        this.myplane = new MyPlane(this, 8, 8);
        this.myvehicle = new MyVehicle(this, 6, 6, [0, 0, 0], 0, 0);
        //Objects connected to MyInterface
        this.displayAxis = true;
        //this.objectComplexity = 6;
        //this.sizeBox = 30;
        this.scaleFactor = 20;
        this.speedFactor = 1;
        this.orientationFactor = 12;

        this.myblimp.updateSize(this.scaleFactor);
        this.myblimp.updateAcceleration(this.speedFactor, this.periodFactor);
        this.myblimp.updateOrientationAngle(this.orientationFactor, this.periodFactor);
        this.velocity = 0;

        //this.objects = [this.mycylinder, this.myearth, this.myplane, this.myvehicle, this.myblimp];
        //this.objectIDs = { 'Cylinder': 0, 'Earth': 1, 'Plane': 2, 'Vehicle': 3, 'Blimp': 4};
        //this.selectedObject = 0;
        
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(50, 50, 50), vec3.fromValues(0, 0, 0));
    }
    
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    checkKeys() {
        
        if (this.gui.isKeyPressed("KeyW")) {
            this.myblimp.accelerate();
        }
        if (this.gui.isKeyPressed("KeyS")) {
            this.myblimp.decelerate();
        }
        
        if (this.gui.isKeyPressed("KeyA")) {
            this.myblimp.orientLeft();
            this.myblimp.updateTurningLeft();
        }

        if (this.gui.isKeyPressed("KeyD")) {
            this.myblimp.orientRight();
            this.myblimp.updateTurningRight();
        }

        if (this.gui.isKeyPressed("KeyZ")) {
            this.zoomIn();
        }

        if (this.gui.isKeyPressed("KeyX")) {
            this.zoomOut();
        }

        if (this.gui.isKeyPressed("KeyC")) {
            this.zoomSetDefault();
        }

        if (this.gui.isKeyPressed("KeyA") == this.gui.isKeyPressed("KeyD")){
            this.myblimp.turning = 0;
        }
        
        /*if (this.gui.isKeyPressed("KeyR")){
            this.init(application);
        }*/

    }
                
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        //console.log(this.velocity);
        /*this.myvehicle.updateVehicleMovement();
        this.myvehicle.display();
        console.log("Position: " + this.myvehicle.position + "\n");*/
        this.myblimp.updatePosition(this.periodFactor);
        this.myblimp.display();
        
        //this.display();
    }

    /*updateObjectComplexity(){
        this.mycylinder.updateBuffers(this.objectComplexity);

        this.myvehicle.updateBuffers(this.objectComplexity);
    }*/

    /*updateBoxSize(){
        //this.MyBackgroundCube.updateBuffers(this.objectComplexity, this.sizeBox);
    }*/

    zoomIn() {
        this.camera.zoom(this.cameraZoomFactor);
        this.cameraZoom += this.cameraZoomFactor;
    }

    zoomOut() {
        this.camera.zoom(-this.cameraZoomFactor);
        this.cameraZoom -= this.cameraZoomFactor;
    }

    zoomSetDefault() {
        while (this.cameraZoom != 0) {
            if (this.cameraZoom > 0) {
                this.zoomOut();
            }

            else if (this.cameraZoom < 0) {
                this.zoomIn();
            }
        }
    }

    updateScaleFactor() {
        this.myblimp.updateSize(this.scaleFactor);
    }

    updateSpeedFactor() {
        this.myblimp.updateAcceleration(this.speedFactor, this.periodFactor);
    }

    updateOrientationFactor() {
        this.myblimp.updateOrientationAngle(this.orientationFactor, this.periodFactor);
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

        //this.setActiveShader(this.terrainShader);

        //This sphere does not have defined texture coordinates
        this.myBackground.display();
        this.myblimp.display();

        //this.setActiveShader(this.shadersList[0]);
        //this.myvehicle.display();

        // ---- END Primitive drawing section
    }
}