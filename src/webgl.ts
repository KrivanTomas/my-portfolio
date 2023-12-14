window.addEventListener("load", setupWebGL, false);
let gl: WebGL2RenderingContext | WebGLRenderingContext;
let program: WebGLProgram;

const NUM_VERTICES = 4;

function getRenderingContext() {
  const canvas: HTMLCanvasElement | null = document.querySelector("canvas");
  if(!canvas) return null;
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  const gl: WebGL2RenderingContext | WebGLRenderingContext | null =
  canvas.getContext("webgl2") || canvas.getContext("webgl");// || canvas.getContext("experimental-webgl");
  if (!gl) {
    const paragraph: any = document.querySelector("p");
    paragraph.innerHTML =
      "Failed to get WebGL context." +
      "Your browser or device may not support WebGL.";
    return null;
  }
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return gl;
}


function setupWebGL(evt: Event) {
  window.removeEventListener(evt.type, setupWebGL, false);
  let testGL: WebGL2RenderingContext | WebGLRenderingContext | null;
  if (!(testGL = getRenderingContext())) return;
  gl = testGL;
  let source = 
  `#version 300 es

  layout(location = 0) in vec4 aVertexPosition;

  void main() {
    gl_Position = aVertexPosition;
    //gl_PointSize = 30.0;
  }`;
  const vertexShader: WebGLShader | null = gl.createShader(gl.VERTEX_SHADER);
  if(!vertexShader) return null;
  gl.shaderSource(vertexShader, source);
  gl.compileShader(vertexShader);

  source = 
  `#version 300 es

  precision mediump float;

  uniform vec2 uResolution;
  uniform float uTime;

  out vec4 fragColor;

  void main() {
    vec2 uv = gl_FragCoord.xy/uResolution;
    fragColor = vec4(uv * 0.001, 1.,1.0);
  }`;
  const fragmentShader: WebGLShader | null = gl.createShader(gl.FRAGMENT_SHADER);
  if(!fragmentShader) return null;
  gl.shaderSource(fragmentShader, source);
  gl.compileShader(fragmentShader);
  let p: WebGLProgram | null = gl.createProgram();
  if(!p) return null;
  program = p;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.detachShader(program, vertexShader);
  gl.detachShader(program, fragmentShader);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const linkErrLog = gl.getProgramInfoLog(program);
    cleanup();
    console.log(`Shader program did not link successfully. Error log: ${linkErrLog}`);
    return;
  }

  initializeAttributes();

  gl.useProgram(program);
  //gl.drawArrays(gl.POINTS, 0, 1);
  //cleanup();
  const timeUniformLocation = gl.getUniformLocation(program, "uTime");
    const startTime = (window.performance || Date).now();
    const resolutionUniformLocation = gl.getUniformLocation(program, "uResolution");
    const canvas: HTMLCanvasElement | null = document.querySelector("canvas");
    if(!canvas) return null;

    gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);

    const vertexAttribLoacation = gl.getAttribLocation(program, 'aVertexPosition');
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(
      vertexAttribLoacation,
      numComponents,
      type,
      normalize,
      stride,
      offset);
  gl.enableVertexAttribArray(
    vertexAttribLoacation);

(function frame() {
    gl.uniform1f(timeUniformLocation, ((window.performance || Date).now() - startTime) / 1000);
  
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
    requestAnimationFrame(frame);
  })();
  
}

let buffer: any;
function initializeAttributes() {
  gl.enableVertexAttribArray(0);
  buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
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
               
}

function cleanup() {
  gl.useProgram(null);
  if (buffer) {
    gl.deleteBuffer(buffer);
  }
  if (program) {
    gl.deleteProgram(program);
  }
}   