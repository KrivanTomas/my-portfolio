#version 300 es

precision mediump float;

uniform vec2 uResolution;
uniform vec2 uMousePosition;
uniform float uTime;
  
out vec4 outColor;

void main() {
    // !! Uncomment for WebGL version


    vec2 uv = gl_FragCoord.xy / (uResolution.y);

    // mouse blobs
    vec2 om =  uMousePosition; //!!/ uResolution.y;
    //!!om.y = 1. - om.y; 
    
    float diffm = length(om - uv) - .1;
    diffm = 1. - diffm;
    diffm = clamp(diffm, 0., 1.);

    // random blobs
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
            
    
    // blob bounds
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

    vec3 finalColor = final * vec3(0.525, 0.365, 1.);
    outColor = vec4(finalColor,1.0);
}