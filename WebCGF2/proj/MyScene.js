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

        this.terrainAppearance = new CGFappearance(this);
		this.terrainAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.terrainAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.terrainAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.terrainAppearance.setShininess(120);

        this.terrainTexture = new CGFtexture(this, "images/terrain.jpg");
        this.terrainAppearance.setTexture(this.terrainTexture);
        this.terrainAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.terrainHeightTexture = new CGFtexture(this, "images/heightmap - Copy.jpg");

        this.terrainShader = new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        this.terrainShader.setUniformsValues({uSampler2: 1});

        this.setUpdatePeriod(this.periodFactor);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);

        this.myBackground = new MyBackgroundCube(this, 50, 50);

        this.myblimp = new MyBlimp(this,50,50);
        this.terrain = new MyTerrain(this, 50);
        this.billboard = new MyBillboard(this);


        //Objects connected to MyInterface
        this.scaleFactor = 10;
        this.speedFactor = 10;
        this.orientationFactor = 10;
        this.displayAxis = true;
        //this.objectComplexity = 6;
        //this.sizeBox = 30;
        
        var d = new Date();
        var n = d.getTime();
        this.previousT = n;
        this.period = 0;

        this.dropReleaseRate = 3000;

        this.blimpAcceleration = 0;
        this.blimpAngle = 0

        this.myblimp.updateSize(this.scaleFactor);
        //this.myblimp.updateAcceleration(this.speedFactor, this.periodFactor);
        //this.myblimp.updateOrientationAngle(this.orientationFactor, this.periodFactor);
        

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
            if (!this.myblimp.isAutoPilot())
                this.myblimp.accelerate(this.blimpAcceleration);
        }

        if (this.gui.isKeyPressed("KeyS")) {
            if (!this.myblimp.isAutoPilot())
                this.myblimp.accelerate(-this.blimpAcceleration);
        }
        
        if (this.gui.isKeyPressed("KeyA")) {
            if (!this.myblimp.isAutoPilot())
                this.myblimp.turn(-this.blimpAngle);
        }

        if (this.gui.isKeyPressed("KeyD")) {
            if (!this.myblimp.isAutoPilot())
                this.myblimp.turn(this.blimpAngle);
        }

        if (this.gui.isKeyPressed("KeyP")) {
            if(!this.myblimp.isAutoPilot()){
                this.myblimp.setAutoPilot(true);
            }else {
                this.myblimp.setAutoPilot(false);
            }
        }

        if (this.gui.isKeyPressed("KeyL")) {
            if(this.dropReleaseRate>1000){
                this.myblimp.dropSupply();
                this.billboard.updateBillboardValues();
                this.dropReleaseRate = 0;
            }
            
        }

        if (this.gui.isKeyPressed("KeyR")) {
            this.myblimp.reset();
            this.billboard.reset();
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

        if (this.gui.isKeyPressed("KeyA") == this.gui.isKeyPressed("KeyD")) {
            this.myblimp.turning = 0;
        }
        
        /*if (this.gui.isKeyPressed("KeyR")){
            this.init(application);
        }*/

    }
                
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        
        console.log("scene period: " + this.period);

        

        var d = new Date();
        var n = d.getTime();
        this.period = n - this.previousT;
        this.previousT = n;

        this.checkKeys();
        
        this.dropReleaseRate+=this.period;

        this.myblimp.updatePosition(this.period);
        
        

      
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

    updatePeriodFactor() {
        this.setUpdatePeriod(this.periodFactor);
        this.updateSpeedFactor();
        this.updateOrientationFactor();
    }

    updateScaleFactor() {
        this.myblimp.updateSize(this.scaleFactor);
    }

    updateSpeedFactor() {
        //this.myblimp.updateAcceleration(this.speedFactor, this.periodFactor);
        this.blimpAcceleration = this.speedFactor*this.period/10000;
    }

    updateOrientationFactor() {
        //this.myblimp.updateOrientationAngle(this.orientationFactor, this.periodFactor);
        this.blimpAngle = (Math.PI*this.orientationFactor/10000)*this.period;
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


        

		// activate selected shader


        // ---- BEGIN Primitive drawing section
        this.updatePeriodFactor();
        this.updateSpeedFactor();
        this.updateOrientationFactor();
        

        //this.setActiveShader(this.terrainShader);

        this.myBackground.display();
        this.myblimp.display();
        this.billboard.display();

        

        this.pushMatrix();
        this.myblimp.drawSupplies(this.period);
        this.popMatrix();
        
        
        this.terrainAppearance.apply();
        
        this.terrainHeightTexture.bind(1);

        this.setActiveShader(this.terrainShader);
        this.pushMatrix();
        

        this.translate(0,-25,0);
        this.rotate(-Math.PI/2,1,0,0);
        this.scale(50,50,8);
        this.terrain.display();
        this.popMatrix();

        this.setActiveShader(this.defaultShader);

        // ---- END Primitive drawing section
    }
}