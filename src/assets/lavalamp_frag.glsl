#version 300 es

precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMousePosition;

out vec4 outColor;

void main()
{
    vec2 uv = gl_FragCoord.xy/uResolution;
    uv -= .5;
    
    vec2 o = vec2(0.,0.);
    o.y  += tan(sin(uTime * .1)*2.) * .1 + sin(uTime * 3.) * 0.01;    
    o.x  += sin(uTime * .5) * .2;
    vec2 o2 = uMousePosition -0.5;
    
    vec2 o3 = vec2(0.,0.);
    o3.y  += tanh(uTime * .4) * .1 + sin(uTime * 3.) * 0.01;    
    o3.x  += sin(uTime * .5) * .2;
    
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
    
    //outColor = vec4(final * vec3(1.), 1.0);
    
    outColor = vec4(final * vec3(1., 0., 1.) ,1.0);
}