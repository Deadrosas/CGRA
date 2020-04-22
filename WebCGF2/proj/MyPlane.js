class MyPlane extends CGFobject {
    constructor(scene, nDivs, size) {
        super(scene);
        nDivs = typeof nDivs !== 'undefined' ? nDivs : 1;

        this.nDivs = nDivs;
        this.size = size;
        this.patchLength = size / nDivs;

        this.initBuffers();
    }

    initBuffers() {
        /* example for nDivs = 3 :
        (numbers represent index of point in array)
        ('x's represent vertices which are drawn but not stored

        y
        ^
        |
        0    2    4    6    
        |
        1    3    5    7
        |
        x	 x	  x    x
        |
        x----x----x----x---> x
        */

        // Generate vertices
        this.vertices = [];
        /*var xCoord = -size/2;
        for (var i = 0; i <= this.nDivs; i++) {
            this.vertices.push(xCoord, size/2, 0);
            this.vertices.push(xCoord, size/2 - this.patchLength, 0);
            xCoord += this.patchLength;
        }*/

        for (var x = 0; x < this.size; x += this.patchLength) {
            for (var y = 0; y < this.size; y += this.patchLength) {
                this.vertices.push(x, y, 0);
            }
        }

        // Generating indices
        /* for nDivs = 3 output will be [0, 1, 2, 3, 4, 5, 6, 7].
        Interpreting this index list as a TRIANGLE_STRIP will draw a row of the plane. */
        this.indices = [];
        

        for(var i = 0 ; i < this.nDivs - 1; i++){
            for (var j = 0; j < this.nDivs; j++) {
                if(j!=this.nDivs-1){
                    this.indices.push(i*this.nDivs+j);
                    this.indices.push(i*this.nDivs+j + 1);
                    this.indices.push(i*this.nDivs+j + this.nDivs);
                    
                }  
                if(j!=0){
                    this.indices.push(i*this.nDivs+j);
                    this.indices.push(i*this.nDivs+j + this.nDivs);
                    this.indices.push(i*this.nDivs+j + this.nDivs -1);
                    
                }
            }
        } 
    
        // Generating normals
        /*
        As this plane is being drawn on the xy plane, the normal to the plane will be along the positive z axis.
        So all the vertices will have the same normal, (0, 0, 1).
        */
        this.normals = [];
        for (var i = 0; i <= this.nDivs*this.nDivs; i++) {
            this.normals.push(0, 0, 1);
        }

        
        this.texCoords = [];

        for(var i = 0; i < this.nDivs; i++) {
            for(var j = 0; j < this.nDivs; j++) {
                this.texCoords.push((this.patchLength*j)/this.nDivs, this.patchLength*i/this.nDivs);
            }
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(-this.size/2+this.patchLength/2, this.patchLength/2-this.size/2, 0);
        super.display();
        this.scene.popMatrix();
    }

    updateBuffers(complexity, size){
        this.nDivs = complexity;
        this.patchLength = size /  nDivs;

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}