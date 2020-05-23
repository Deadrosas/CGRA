class MyBlimp extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
     */
    constructor(scene, slices, stacks) {
        super(scene);

        this.initMaterials();
        
    
        this.myellipsoid = new MyEllipsoid(this.scene, slices, stacks);
        this.rudder = new MyRudder(this.scene);
        this.cylinder = new MyCylinder(this.scene, 30);
        this.sphere = new MySphere(this.scene, 30, 30);
        this.helix = new MyHelix(this.scene, 50, 50, 0);
        this.flag = new MyPlane(this.scene,60,2);


        this.size = null;
        this.acceleration = null;
        this.angle = null;

        this.velocity = 0;
        this.turning = 0;
        this.position = [0, 0, 0];
        this.orientationAngle = 0;

        this.timePassed = 0;

        this.flagShader = new CGFshader(this.scene.gl, 'shaders/flag.vert', 'shaders/flag.frag');

        this.flagShader.setUniformsValues({blimpSpeed : this.velocity});

        this.flagShader_invert = new CGFshader(this.scene.gl, 'shaders/flag_invert.vert', 'shaders/flag.frag');

        this.flagShader_invert.setUniformsValues({blimpSpeed : this.velocity});
        
        this.autoPilot = false;

        this.supplies = [
            new MySupply(this.scene, 2, 2, this.position),
            new MySupply(this.scene, 2, 2, this.position),
            new MySupply(this.scene, 2, 2, this.position),
            new MySupply(this.scene, 2, 2, this.position),
            new MySupply(this.scene, 2, 2, this.position)
        ];

    }

    initMaterials(){
        this.blimpMaterial = new CGFappearance(this.scene);
        this.blimpMaterial.loadTexture('images/mercedes-petronas4.jpg');

        this.flagTexture = new CGFappearance(this.scene);
        this.flagTexture.loadTexture(this.scene,'images/mercedes-petronas3.jpg');

        this.flagTexture2 = new CGFtexture(this.scene, 'images/mercedes-petronas3.jpg');
    }
    drawSupplies(period){
        console.log(period);
        for(var i = 0; i<5; ++i){
            console.log(this.supplies[i].currentState);
            if(this.supplies[i].currentState == SupplyStates.INACTIVE){
                this.supplies[i].position = this.position;
            }else if(this.supplies[i].currentState == SupplyStates.FALLING){
                this.supplies[i].updateFallPosition(period);
                this.supplies[i].display();
            }else{
                this.supplies[i].display();
            }
            console.log(this.supplies[i].position);
        }
    }

    display(){
        this.blimpMaterial.apply();
        this.scene.pushMatrix();
        this.scene.scale(this.size, this.size, this.size);
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(-this.orientationAngle,0,1,0);
        //balao
        this.scene.pushMatrix();
        this.myellipsoid.display();
        this.scene.popMatrix();

        //-----
        
        //motores
        this.scene.pushMatrix();
        this.scene.translate(-0.65, -1.07, 0.3);
        this.scene.scale(0.1,0.1,0.1);
        this.myellipsoid.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.65, -1.07, -0.3);
        this.scene.scale(0.1,0.1,0.1);
        this.myellipsoid.display();
        this.scene.popMatrix();
        //-------------
        
        //helices

        //Helice 1
        this.scene.pushMatrix();
        this.scene.translate(-0.85, -1.07, 0.3);
        this.scene.scale(0.03, 0.03, 0.03);
        this.helix.display();
        this.scene.popMatrix();
        //-------------
        //Helice 2
        this.scene.pushMatrix();
        this.scene.translate(-0.85, -1.07, -0.3);
        this.scene.scale(0.03, 0.03, 0.03);
        this.helix.display();
        this.scene.popMatrix();
        // -----------------
        
        //esferas do cabo
        this.scene.pushMatrix();
        this.scene.translate(0.7, -1, 0);
        this.scene.scale(0.2,0.2,0.2);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.7, -1, 0);
        this.scene.scale(0.2,0.2,0.2);
        this.sphere.display();
        this.scene.popMatrix();
        //--------

        // lemos
        this.scene.pushMatrix();
        this.scene.translate(-0.8,0,0.3);
        this.scene.scale(-1,-1,1);
        this.rudder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.8,0,-0.3);
        this.scene.scale(-1,1,-1);
        this.rudder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.8,0.3,0);
        this.scene.scale(-1,1,-1);
        this.scene.rotate(Math.PI/16*this.turning,0,1,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.rudder.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.8,-0.3,0);
        this.scene.scale(-1,1,-1);
        this.scene.rotate(Math.PI/16*this.turning,0,1,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.rudder.display();
        this.scene.popMatrix();
        // --------------

        //cilindro passageiro
        this.scene.pushMatrix();
        this.scene.translate(-0.7,-1,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.scale(0.2,1.4,0.2);
        this.cylinder.display();
        this.scene.popMatrix();
        
        //flag
         
        this.scene.setActiveShader(this.flagShader);
        this.scene.pushMatrix();
        this.flagTexture2.bind();
        this.scene.translate(-7,0,0);
        //this.scene.rotate(Math.PI,0,1,0);
        this.scene.scale(3,-1,1);
        this.flag.display();

        this.scene.popMatrix();

        this.scene.setActiveShader(this.flagShader_invert);
        this.scene.pushMatrix();
        this.flagTexture2.bind();
        this.scene.translate(-7,0,0);
        this.scene.scale(3,1,1);
        this.flag.display();

        this.scene.popMatrix();

        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);


    }

    setAutoPilot(newAutoPilot) {
        this.autoPilot = newAutoPilot;
    }

    isAutoPilot() {
        return this.autoPilot;
    }

    dropSupply() {
        for (var i = 0; i < 5; i++) {
            if (this.supplies[i].currentState == SupplyStates.INACTIVE) {
                this.supplies[i].currentState = SupplyStates.FALLING;
                return;
            }
        }
    }

    calculateAutoPilotCenter() {
        return [this.position[0]]
    }

    accelerate(val) {
        this.velocity += val;
    }

    turn(val) {
        if (this.velocity == 0) {
            return;
        }
        if (val < 0)
            this.turning = -this.velocity/Math.abs(this.velocity);
        else
            this.turning = this.velocity/Math.abs(this.velocity);
        this.orientationAngle += val;
    }
    
    updatePosition(period) {
        //console.log(this.position);
        this.position = [this.position[0]+this.velocity*Math.cos(this.orientationAngle), 0, this.position[2]+this.velocity*Math.sin(this.orientationAngle)];
        this.helix.updatePosition(this.velocity, period);

        

        this.timePassed+=period;

        this.flagShader.setUniformsValues({t : this.timePassed});

        this.flagShader.setUniformsValues({blimpSpeed : this.velocity});

        this.flagShader_invert.setUniformsValues({t : this.timePassed});

        this.flagShader_invert.setUniformsValues({blimpSpeed : this.velocity});

    }

    updateSize(scaleFactor) {
        this.size = scaleFactor/10;
    }

    reset() {
        this.velocity = 0;
        this.turning = 0;
        this.position = [0, 0, 0];
        this.orientationAngle = 0;
    }
} 