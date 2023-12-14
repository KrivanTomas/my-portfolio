//@ts-nocheck


window.addEventListener("load", onLoad, false);

let canvas;
const startTime = (window.performance || Date).now();
function onLoad() {
    canvas = document.querySelector('#glcanvas');
    main();
}


window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //gl.viewport(0, 0, canvas.width, canvas.height);
}

//
// Start here
//
function main() {
  const gl = canvas.getContext('webgl2');
  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  const vsSource = 
  ` #version 300 es  

    layout(location = 0) in vec4 aVertexPosition;

    void main() {
      gl_Position = aVertexPosition;
    }
  `;

  // Fragment shader program

  const fsSource = 
  ` #version 300 es

    precision mediump float;


    // Require resolution (canvas size) as an input
    uniform vec2 uResolution;
    uniform vec2 uMousePosition;
    uniform float uTime;
      
    out vec4 outColor;

    void main() {
        vec2 uv = gl_FragCoord.xy/uResolution.y;
        //uv -= .5;
        
        vec2 o = vec2(0.,0.);
        o.y  += tan(sin(uTime * .1)*2.) * .1 + sin(uTime * 3.) * 0.01  + .5;    
        o.x  += sin(uTime * .5) * .2 + .5;
        vec2 o2 = uMousePosition -0.5;
        
        vec2 o3 = vec2(0.,0.);
        o3.y  += tanh(uTime * .4) * .1 + sin(uTime * 3.) * 0.01  + .5;    
        o3.x  += sin(uTime * .6) * .2 + .5;
        
        float diff = length(o - uv) - .1;
        
        //diff = abs(diff);
        diff = smoothstep(0.01, 0.4, diff);
        //diff = .1 / diff;
        //diff = step(0.9, diff);
        
        float diff2 = length(o2 - uv) - .1;
        
        //diff2 = abs(diff2);
        diff = smoothstep(0.01, 0.4, diff);
        //diff2 = .1 / diff2;
        //diff2 = step(0.9, diff2);
        
        float diff3 = length(o3 - uv) - .1;
        
    
        diff3 = smoothstep(0.01, 0.4, diff3);
        
        float final = diff * diff2 * diff3;
        
        final = step(0.1, final);
        
        final = .1 / final;
        
        //outColor = vec4(uv, 0., 1.0);
        
        outColor = vec4(final * vec3(1., 0., 1.) ,1.0);
    }
  `;  

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attribute our shader program is using
  // for aVertexPosition and look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
      resolution: gl.getUniformLocation(shaderProgram, 'uResolution'),
      mousePosition: gl.getUniformLocation(shaderProgram, 'uMousePosition'),
      time: gl.getUniformLocation(shaderProgram, 'uTime'),
    },
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers = initBuffers(gl);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0,0, canvas.width, canvas.height);
  // Draw the scene

  (function frame() {
    drawScene(gl, programInfo, buffers);
    requestAnimationFrame(frame)
  })();
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple two-dimensional square.
//
function initBuffers(gl) {

  // Create a buffer for the square's positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the square.

  const positions = [
     1.0,  1.0,
    -1.0,  1.0,
     1.0, -1.0,
    -1.0, -1.0,
  ];

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(positions),
                gl.STATIC_DRAW);

  return {
    position: positionBuffer,
  };
}

//
// Draw the scene.
//
function drawScene(gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

//   const fieldOfView = 45 * Math.PI / 180;   // in radians
//   const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
//   const zNear = 0.1;
//   const zFar = 100.0;
//   const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  //mat4.perspective(projectionMatrix,
                //    fieldOfView,
                //    aspect,
                //    zNear,
                //    zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  //const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

//   mat4.translate(modelViewMatrix,     // destination matrix
//                  modelViewMatrix,     // matrix to translate
//                  [-0.0, 0.0, -6]);  // amount to translate

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

//   gl.uniformMatrix4fv(
//       programInfo.uniformLocations.projectionMatrix,
//       false,
//       projectionMatrix);
//   gl.uniformMatrix4fv(
//       programInfo.uniformLocations.modelViewMatrix,
//       false,
//       modelViewMatrix);
  
  gl.uniform2f(programInfo.uniformLocations.resolution, canvas.width, canvas.height);  
  gl.uniform1f(programInfo.uniformLocations.time, ((window.performance || Date).now() - startTime) / 1000);
  gl.uniform2f(programInfo.uniformLocations.mousePosition, 0,0);
  {
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}