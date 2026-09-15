// Custom GLSL Shader for Zarbo 3D Particle Orb
// Modeled precisely after the undulating wavy particle sphere reference

export const ZarboVertexShader = `
  uniform float uTime;
  uniform float uAudioLevel;
  uniform float uState; // 0=IDLE, 1=LISTENING, 2=PROCESSING, 3=RESPONDING
  uniform float uScrollFactor;

  attribute float aSize;
  attribute vec3 aNormal;
  attribute float aRingIndex;

  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vAudio;
  varying float vElevation;

  // Simplex-style 3D noise approximation
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vNormal = aNormal;
    vAudio = uAudioLevel;

    // Base coordinates
    vec3 pos = position;

    // Undulating concentric wave folds (matching the reference image 1527.jpg)
    float speed = (uState == 2.0) ? 2.5 : (uState == 1.0) ? 1.8 : 0.6;
    float wavePattern = sin(pos.y * 5.0 + uTime * speed) * cos(pos.x * 4.0 - uTime * speed * 0.8) * 0.18;
    float fineNoise = snoise(pos * 1.8 + vec3(0.0, uTime * 0.2, 0.0)) * 0.12;

    // Audio ripple displacement along surface normals
    float audioDisplacement = uAudioLevel * (0.35 + 0.25 * sin(pos.y * 12.0 - uTime * 8.0));

    // State signatures
    float stateContract = (uState == 1.0) ? -0.12 : 0.0; // Listening: contraction
    float churn = (uState == 2.0) ? sin(pos.z * 10.0 + uTime * 4.0) * 0.15 : 0.0; // Processing

    float totalDisplacement = wavePattern + fineNoise + audioDisplacement + stateContract + churn;
    pos += aNormal * totalDisplacement;

    vPosition = pos;
    vElevation = totalDisplacement;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Point attenuation based on depth and audio
    float baseSize = aSize * (1.0 + uAudioLevel * 0.8 + (uState == 1.0 ? 0.3 : 0.0));
    gl_PointSize = baseSize * (260.0 / -mvPosition.z);
  }
`;

export const ZarboFragmentShader = `
  uniform float uTime;
  uniform float uAudioLevel;
  uniform float uState;

  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vAudio;
  varying float vElevation;

  void main() {
    // Make circular point
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    // Soft Gaussian falloff
    float alpha = smoothstep(0.5, 0.05, dist);

    // Color Palette:
    // Core: dark subtle violet (nearly dark at idle)
    // Lower rim: warm ember glow (#f59e0b to #ea580c)
    // Crown: cool spectral highlight (#38bdf8 to #e0f2fe)
    // Flare highlights on high elevation and audio peaks

    // Crisp, saturated colors inspired by the reference wavy sphere on light background:
    vec3 charcoalCore = vec3(0.14, 0.16, 0.24); // deep rich indigo/charcoal
    vec3 amberRim   = vec3(0.85, 0.45, 0.05);   // rich warm amber/gold
    vec3 cyanCrown  = vec3(0.02, 0.52, 0.82);   // electric sapphire/cyan
    vec3 platinum   = vec3(0.96, 0.65, 0.15);   // golden amber burst on speech

    // Vertical height blend
    float heightFactor = clamp(vPosition.y * 0.35 + 0.5, 0.0, 1.0);
    vec3 baseColor = mix(amberRim, cyanCrown, heightFactor);

    // Core depth
    float depthFactor = clamp(length(vPosition) * 0.32, 0.0, 1.0);
    vec3 finalColor = mix(charcoalCore, baseColor, depthFactor);

    // Elevation & normal rim highlights (like in reference image 1527.jpg)
    float rim = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
    finalColor = mix(finalColor, mix(amberRim, cyanCrown, heightFactor), rim * 0.8);

    // Active voice flare
    if (uState == 3.0 || uAudioLevel > 0.05) {
      finalColor = mix(finalColor, platinum, uAudioLevel * 0.7);
      alpha = min(1.0, alpha * (1.2 + uAudioLevel * 0.5));
    } else if (uState == 1.0) {
      // Listening shimmer
      finalColor = mix(finalColor, cyanCrown, 0.5);
    } else if (uState == 2.0) {
      // Processing churn
      finalColor = mix(finalColor, amberRim, 0.6);
    }

    gl_FragColor = vec4(finalColor, alpha * 0.82);
  }
`;
