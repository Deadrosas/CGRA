class MyCylinder extends CGFobject {
    constructor(scene, nDivs) {
        super(scene);
        nDivs = typeof nDivs !== 'undefined' ? nDivs : 1;

        this.nDivs = nDivs;
        this.patchLength = 1.0 / nDivs;

        this.initBuffers();
    }

    initBuffers() {
        // Generate vertices
        this.vertices = [];
        for (var i = 0; i <= this.nDivs; i++) {
            this.vertices.push(Math.cos(i*2*Math.PI/this.nDivs), 0, Math.sin(i*2*Math.PI/this.nDivs));
        }

        for (var i = 0; i <= this.nDivs; i++) {
            this.vertices.push(Math.cos(i*2*Math.PI/this.nDivs), 1, Math.sin(i*2*Math.PI/this.nDivs));
        }

        // Generating indices
        /* for nDivs = 3 output will be [0, 1, 2, 3, 4, 5, 6, 7].
        Interpreting this index list as a TRIANGLE_STRIP will draw a row of the plane. */

        this.indices = [];

        //Drawing Bottom
        for (var i = 1; i <= this.nDivs-2; i++) {
            this.indices.push(0);
            this.indices.push(i);
            this.indices.push(i+1);
        }

        //Drawing Sides
        for (var i = 0; i < this.nDivs+1; i++) {
            if(i%2 == 0){
                this.indices.push(i);
                this.indices.push(i+this.nDivs+1);
                this.indices.push(i+1);
                
            }else{
                this.indices.push(i+this.nDivs+1);
                this.indices.push(i);
                this.indices.push(i+this.nDivs);
            }
        }
        
        for (var i = 1; i < this.nDivs+2; i++) {
            if(i%2 == 0){
                this.indices.push(i-1);
                this.indices.push(i+this.nDivs);
                this.indices.push(i);
            }else{
                this.indices.push(i+this.nDivs);
                this.indices.push(i-1);
                this.indices.push(i+this.nDivs-1);
            }
        } 

        //Drawing Top
        for (var i = this.nDivs+2; i <= 2*this.nDivs; i++) {
            this.indices.push(i+1);
            this.indices.push(i);
            this.indices.push(this.nDivs+2);   
        }
        



        // Generating normals
        /*
        As this plane is being drawn on the xy plane, the normal to the plane will be along the positive z axis.
        So all the vertices will have the same normal, (0, 0, 1).
        */

        
       this.normals = [];
       for (var i = 0; i <= this.nDivs; i++) {
           this.normals.push(Math.cos(i*2*Math.PI/this.nDivs), 0, Math.sin(i*2*Math.PI/this.nDivs));
       }

       for (var i = 0; i <= this.nDivs; i++) {
           this.normals.push(Math.cos(i*2*Math.PI/this.nDivs), 0, Math.sin(i*2*Math.PI/this.nDivs));
       }
        

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    

    updateBuffers(complexity){
        this.nDivs =  complexity;

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}