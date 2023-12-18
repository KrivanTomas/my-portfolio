//@ts-nocheck


window.addEventListener("load", onLoad, false);


let canvas;
let canvasWrapper;
let gl;
let programInfo;
let mousePos = [-200,-200];
let mouseParticle = [-200,-200];
const startTime = (window.performance || Date).now();
function onLoad() {
  canvas = document.querySelector('#glcanvas');
  canvasWrapper = document.querySelector('#header');
  main();
  window.addEventListener("mousemove", onMouseMove);

  function onMouseMove(e: MouseEvent){
    //console.log(`x: ${e.clientX},y: ${e.clientX}`);
    mousePos = [e.pageX, e.pageY];
  }
  window.addEventListener("touchmove", onTouchMove);

  function onTouchMove(e: TouchEvent){
    //console.log(`x: ${e.clientX},y: ${e.clientX}`);
    mousePos = [e.touches[0].pageX, e.touches[0].pageY];
  }
  window.addEventListener("resize", onWindowResize, false);

  function onWindowResize() {
    canvas.width = canvasWrapper.clientWidth;
    canvas.height = canvasWrapper.clientHeight;
    //canvas.width = window.innerWidth;d
    //canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
}




//
// Start here
//
function main() {
  gl = canvas.getContext('webgl2');
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
      vec2 uv = gl_FragCoord.xy/(uResolution.y);
		//uv = floor(uv * 100.) / 100.;
        //uv -= .5;
        
        //vec2 o[5];
        float p_final = 0.;
        for(float i = 0.; i < 5.; i++){
          vec2 p = vec2(i / 5. - .5 / 5.,0.);
          p.y += (sin(uTime * .2 + i * 312.54)) * 1.2 + sin(uTime * 3.) * 0.01;
          p.x += sin(uTime * .5+ i * 312.54) * .1 + .5;

          float p_diff = length(p - uv) - .1;
          p_diff = 1. - p_diff;
          p_diff = clamp(p_diff, 0., 1.);

          p_final += pow(p_diff, 10.);
        }
                
        vec2 om = uMousePosition / uResolution.y;
        om.y = 1. - om.y;
        
        
        //float diff1 = length(o1 - uv) - .1;
        //diff1 = 1. - diff1;
        //diff1 = clamp(diff1, 0., 1.);
        
        float diffm = length(om - uv) - .1;
        diffm = 1. - diffm;
        diffm = clamp(diffm, 0., 1.);
        
        float topdiff = 1. - uv.y + .02;        
        topdiff = 1. - topdiff;
        topdiff = clamp(topdiff, 0., 1.);
        float bottomdiff = uv.y + .02;
        bottomdiff = 1. - bottomdiff;        
        bottomdiff = clamp(bottomdiff, 0., 1.);
        
        
        float final = pow(bottomdiff, 10.) + pow(topdiff, 10.) + pow(diffm, 10.) + p_final;
       	final = clamp(final,0.,1.);
       	final = step(1., final);
       	if (final > 1. || final < 0.) {
       		final += 100.;
        }
        //final = 0.01 / final;
        //final = clamp(final, 0., 1.);
        vec3 finalColor = final * vec3(0.525, 0.365, 1.);
        //finalColor = vec3(o3, .0);
        outColor = vec4(finalColor,1.0);
    }
  `;  

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attribute our shader program is using
  // for aVertexPosition and look up uniform locations.
  programInfo = {
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
  canvas.width = canvasWrapper.clientWidth;
  canvas.height = canvasWrapper.clientHeight;
  //canvas.width = window.innerWidth;
  //canvas.height = window.innerHeight;
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
  gl.uniform2f(programInfo.uniformLocations.resolution, canvas.width, canvas.height);  
  gl.uniform1f(programInfo.uniformLocations.time, ((window.performance || Date).now() - startTime) / 1000);
  mouseParticle = [mouseParticle[0] + (mousePos[0] - mouseParticle[0]) / 10,mouseParticle[1] + (mousePos[1] - mouseParticle[1]) / 10];
  
  gl.uniform2f(programInfo.uniformLocations.mousePosition, mouseParticle[0], mouseParticle[1]);
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