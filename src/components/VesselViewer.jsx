import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VesselViewer({ isExploded, setIsExploded, onLoaded }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // References for React-to-Three communication
  const explodeTweenRef = useRef(null);
  const cameraTweenRef = useRef(null);
  const explodeStateRef = useRef({ t: 0 });
  const isExplodedRef = useRef(isExploded);

  // Refs to share Three.js objects between the two effects
  const modelRef = useRef(null);
  const sceneRef = useRef(null);
  const labelRegistryRef = useRef([]);

  // Update ref when prop changes
  useEffect(() => {
    isExplodedRef.current = isExploded;
  }, [isExploded]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const heroEl = containerRef.current;
    const canvas = canvasRef.current;

    /* ================================================================
       0. CONFIG & DEVICE DETECTION
       ================================================================ */
    // "Request Desktop Site" spoofs the UA string and can widen window.innerWidth,
    // but it can't fake touch support or the device's real physical screen size —
    // so we detect on those instead to avoid rendering full desktop quality on mobile GPUs.
    const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const smallPhysicalScreen = Math.min(window.screen.width, window.screen.height) < 900;
    const isMobile = (hasTouch && smallPhysicalScreen) || window.innerWidth < 820 || /Android|iPhone|iPad/i.test(navigator.userAgent);
    const PIXEL_RATIO = Math.min(window.devicePixelRatio, isMobile ? 1.15 : 1.75);

    const initialWidth = heroEl.clientWidth || window.innerWidth || 800;
    const initialHeight = heroEl.clientHeight || window.innerHeight || 600;

    /* ================================================================
       1. RENDERER
       ================================================================ */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(PIXEL_RATIO);
    renderer.setSize(initialWidth, initialHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.useLegacyLights = false;

    /* ================================================================
       2. SCENE + CAMERA
       ================================================================ */
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(36, initialWidth / initialHeight, 0.1, 2000);
    const CAMERA_HOME = new THREE.Vector3(3.8, 1.5, 5.1);
    camera.position.copy(CAMERA_HOME);
    camera.lookAt(0, 0, 0);

    const cameraCatchLight = new THREE.PointLight(0xcfe0f2, 0.08, 30, 2);
    camera.add(cameraCatchLight);
    scene.add(camera);

    const CAM_FORWARD_HOME = new THREE.Vector3(0, 0, 0).sub(CAMERA_HOME).normalize();
    const CAM_RIGHT_HOME = new THREE.Vector3().crossVectors(CAM_FORWARD_HOME, new THREE.Vector3(0, 1, 0)).normalize();
    const SUN_DIR = new THREE.Vector3()
      .addScaledVector(CAM_FORWARD_HOME, 0.55)
      .addScaledVector(CAM_RIGHT_HOME, 0.7)
      .add(new THREE.Vector3(0, 0.28, 0))
      .normalize();

    /* ================================================================
       3. GENERATED HDRI ENVIRONMENT
       ================================================================ */
    function buildEnvironment(renderer) {
      const pmrem = new THREE.PMREMGenerator(renderer);
      pmrem.compileEquirectangularShader();

      const envScene = new THREE.Scene();

      const skyGeo = new THREE.SphereGeometry(50, 32, 32);
      const skyMat = new THREE.ShaderMaterial({
        side: THREE.BackSide,
        uniforms: {
          top: { value: new THREE.Color(0x24406b) },
          bottom: { value: new THREE.Color(0x04070f) },
        },
        vertexShader: `
          varying vec3 vPos;
          void main(){
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vPos;
          uniform vec3 top;
          uniform vec3 bottom;
          void main(){
            float h = normalize(vPos).y * 0.5 + 0.5;
            gl_FragColor = vec4(mix(bottom, top, h), 1.0);
          }
        `,
      });
      const skyMesh = new THREE.Mesh(skyGeo, skyMat);
      envScene.add(skyMesh);

      const sunHighlight = new THREE.Mesh(
        new THREE.SphereGeometry(5.5, 20, 20),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(3.4, 3.9, 4.6) })
      );
      sunHighlight.position.copy(SUN_DIR).multiplyScalar(30);
      envScene.add(sunHighlight);

      const ringCount = 8;
      for (let i = 0; i < ringCount; i++) {
        const angle = (i / ringCount) * Math.PI * 2;
        const height = i % 2 === 0 ? 10 : -6;
        const pos = new THREE.Vector3(Math.cos(angle) * 26, height, Math.sin(angle) * 26);
        const cool = i % 3 === 0;
        const color = cool ? new THREE.Color(2.2, 2.6, 3.2) : new THREE.Color(2.0, 1.9, 3.0);
        const m = new THREE.Mesh(new THREE.SphereGeometry(2.6, 14, 14), new THREE.MeshBasicMaterial({ color }));
        m.position.copy(pos);
        envScene.add(m);
      }

      const highlightDefs = [
        { pos: [-14, 6, -16], color: 0x8a6fff, size: 2.2 },
        { pos: [0, -10, 14], color: 0x00d9ff, size: 1.4 },
      ];
      highlightDefs.forEach((h) => {
        const m = new THREE.Mesh(
          new THREE.SphereGeometry(h.size, 16, 16),
          new THREE.MeshBasicMaterial({ color: h.color })
        );
        m.position.set(...h.pos);
        envScene.add(m);
      });

      const rt = pmrem.fromScene(envScene, 0.035);
      skyGeo.dispose();
      skyMat.dispose();
      sunHighlight.geometry.dispose();
      sunHighlight.material.dispose();
      pmrem.dispose();
      return rt.texture;
    }

    scene.environment = buildEnvironment(renderer);

    /* ================================================================
       4. SPACE BACKDROP
       ================================================================ */
    function buildLayeredStarfield() {
      const group = new THREE.Group();

      // 1. Distant faint starfield
      const distantCount = isMobile ? 600 : 3000;
      const distantGeo = new THREE.BufferGeometry();
      const distantPos = new Float32Array(distantCount * 3);
      for (let i = 0; i < distantCount; i++) {
        const r = 350 + Math.random() * 150;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        distantPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        distantPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        distantPos[i * 3 + 2] = r * Math.cos(phi);
      }
      distantGeo.setAttribute('position', new THREE.BufferAttribute(distantPos, 3));
      const distantMat = new THREE.PointsMaterial({
        color: 0x8a9bb8,
        size: 0.65,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      group.add(new THREE.Points(distantGeo, distantMat));

      // 2. Medium background starfield
      const medCount = isMobile ? 400 : 1600;
      const medGeo = new THREE.BufferGeometry();
      const medPos = new Float32Array(medCount * 3);
      for (let i = 0; i < medCount; i++) {
        const r = 300 + Math.random() * 150;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        medPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        medPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        medPos[i * 3 + 2] = r * Math.cos(phi);
      }
      medGeo.setAttribute('position', new THREE.BufferAttribute(medPos, 3));
      const medMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.15,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      group.add(new THREE.Points(medGeo, medMat));

      // 3. Bright foreground starfield
      const colors = [0x00d9ff, 0xffd18a, 0xffffff, 0xcbe5ff];
      const brightCountPerColor = isMobile ? 20 : 80;
      colors.forEach((col) => {
        const cGeo = new THREE.BufferGeometry();
        const cPos = new Float32Array(brightCountPerColor * 3);
        for (let i = 0; i < brightCountPerColor; i++) {
          const r = 250 + Math.random() * 200;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          cPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          cPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          cPos[i * 3 + 2] = r * Math.cos(phi);
        }
        cGeo.setAttribute('position', new THREE.BufferAttribute(cPos, 3));
        const cMat = new THREE.PointsMaterial({
          color: col,
          size: 1.7,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0.9,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        group.add(new THREE.Points(cGeo, cMat));
      });

      return group;
    }
    const starfield = buildLayeredStarfield();
    scene.add(starfield);

    // Subtle nebula
    const nebulaMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec3 vDir;
        void main(){
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vDir;
        uniform float uTime;

        float hash(vec3 p){
          p = fract(p * 0.3183099 + 0.1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }
        float noise(vec3 x){
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(mix(hash(i+vec3(0.0,0.0,0.0)), hash(i+vec3(1.0,0.0,0.0)), f.x),
                mix(hash(i+vec3(0.0,1.0,0.0)), hash(i+vec3(1.0,1.0,0.0)), f.x), f.y),
            mix(mix(hash(i+vec3(0.0,0.0,1.0)), hash(i+vec3(1.0,0.0,1.0)), f.x),
                mix(hash(i+vec3(0.0,1.0,1.0)), hash(i+vec3(1.0,1.0,1.0)), f.x), f.y),
            f.z
          );
        }
        float fbm(vec3 p){
          float v = 0.0;
          float a = 0.5;
          for(int i=0;i<2;i++){
            v += a * noise(p);
            p *= 2.02;
            a *= 0.5;
          }
          return v;
        }

        void main(){
          vec3 p = vDir * 2.4 + vec3(0.0, 0.0, uTime * 0.003);
          float n = fbm(p);
          n = smoothstep(0.48, 0.85, n);

          vec3 baseInd = vec3(0.03, 0.01, 0.09);
          vec3 brightPurple = vec3(0.35, 0.05, 0.25);
          vec3 brightCyan = vec3(0.04, 0.22, 0.35);

          vec3 nebulaColor = mix(baseInd, brightPurple, vDir.y * 0.5 + 0.5);
          float gasPattern = n; // reuse base sample instead of a second full fbm() call
          nebulaColor = mix(nebulaColor, brightCyan, gasPattern * 0.55);

          vec3 col = nebulaColor * n * 1.45;
          gl_FragColor = vec4(col, n * 0.38);
        }
      `,
    });
    const nebulaMesh = new THREE.Mesh(new THREE.SphereGeometry(280, 24, 24), nebulaMat);
    scene.add(nebulaMesh);

    // Background Earth-like planet
    function buildEarthTexture() {
      const W = 1024, H = 512;
      const c = document.createElement('canvas');
      c.width = W;
      c.height = H;
      const ctx = c.getContext('2d');

      const ocean = ctx.createLinearGradient(0, 0, 0, H);
      ocean.addColorStop(0, '#0c3d63');
      ocean.addColorStop(0.5, '#124a75');
      ocean.addColorStop(1, '#0c3d63');
      ctx.fillStyle = ocean;
      ctx.fillRect(0, 0, W, H);

      const blob = (cx, cy, r, hue) => {
        ctx.fillStyle = hue;
        ctx.beginPath();
        const pts = 10;
        for (let i = 0; i <= pts; i++) {
          const a = (i / pts) * Math.PI * 2;
          const rr = r * (0.7 + Math.random() * 0.6);
          const x = cx + Math.cos(a) * rr;
          const y = cy + Math.sin(a) * rr * 0.6;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
      };
      const landColors = ['#3a5f3a', '#4c6b3a', '#6b5a3a', '#557a4a'];
      for (let i = 0; i < 14; i++) {
        blob(Math.random() * W, H * 0.15 + Math.random() * H * 0.7, 40 + Math.random() * 90, landColors[i % landColors.length]);
      }

      ctx.fillStyle = 'rgba(235,245,255,0.9)';
      ctx.fillRect(0, 0, W, H * 0.06);
      ctx.fillRect(0, H * 0.94, W, H * 0.06);

      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      for (let i = 0; i < 40; i++) {
        ctx.lineWidth = 4 + Math.random() * 10;
        const y = Math.random() * H,
          x = Math.random() * W,
          len = 60 + Math.random() * 140;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x + len * 0.3, y - 20, x + len * 0.7, y + 20, x + len, y);
        ctx.stroke();
      }

      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    const EARTH_DIR = new THREE.Vector3(-2.4, 2.0, 6.4).normalize();
    const earthTexture = buildEarthTexture();
    const earthMesh = new THREE.Mesh(
      new THREE.SphereGeometry(22, 48, 48),
      new THREE.MeshStandardMaterial({ map: earthTexture, roughness: 0.85, metalness: 0.0 })
    );
    earthMesh.position.copy(EARTH_DIR).multiplyScalar(210);
    scene.add(earthMesh);

    const earthAtmo = new THREE.Mesh(
      new THREE.SphereGeometry(22.9, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x6ec8ff, transparent: true, opacity: 0.18, side: THREE.BackSide, depthWrite: false })
    );
    earthAtmo.position.copy(earthMesh.position);
    scene.add(earthAtmo);

    /* ================================================================
       5. LIGHTING RIG
       ================================================================ */
    const ambient = new THREE.AmbientLight(0x0a0f1d, 0.08);
    scene.add(ambient);

    const hemiFill = new THREE.HemisphereLight(0x1a2f63, 0x020306, 0.10);
    scene.add(hemiFill);

    const keyLight = new THREE.DirectionalLight(0xdbe9ff, 1.95);
    keyLight.position.copy(SUN_DIR).multiplyScalar(12);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(isMobile ? 512 : 1536, isMobile ? 512 : 1536);
    keyLight.shadow.bias = -0.0004;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const planetBounceLight = new THREE.DirectionalLight(0x5cb2ff, 0.45);
    planetBounceLight.position.copy(EARTH_DIR).multiplyScalar(12);
    scene.add(planetBounceLight);

    const rimLight = new THREE.DirectionalLight(0x00d9ff, 1.4);
    rimLight.position.set(-4, 3, -8);
    scene.add(rimLight);

    const engineGlowA = new THREE.PointLight(0xff1e3a, 1.0, 6, 2);
    const engineGlowB = new THREE.PointLight(0x00d9ff, 0.7, 5, 2);
    scene.add(engineGlowA, engineGlowB);

    // Visible sun core
    const sunCanvas = document.createElement('canvas');
    sunCanvas.width = sunCanvas.height = 256;
    const sunCtx = sunCanvas.getContext('2d');
    const sunGrad = sunCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
    sunGrad.addColorStop(0.0, 'rgba(255,246,214,1)');
    sunGrad.addColorStop(0.15, 'rgba(255,120,150,0.9)');
    sunGrad.addColorStop(0.45, 'rgba(255,30,58,0.35)');
    sunGrad.addColorStop(1.0, 'rgba(255,30,58,0)');
    sunCtx.fillStyle = sunGrad;
    sunCtx.fillRect(0, 0, 256, 256);
    const sunTexture = new THREE.CanvasTexture(sunCanvas);
    const sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: sunTexture, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    sunSprite.scale.setScalar(46);
    sunSprite.position.copy(SUN_DIR).multiplyScalar(260);
    scene.add(sunSprite);

    const sunCoreCanvas = document.createElement('canvas');
    sunCoreCanvas.width = sunCoreCanvas.height = 128;
    const sunCoreCtx = sunCoreCanvas.getContext('2d');
    const coreGrad = sunCoreCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    coreGrad.addColorStop(0.0, 'rgba(255,252,230,1)');
    coreGrad.addColorStop(0.5, 'rgba(255,232,170,0.9)');
    coreGrad.addColorStop(1.0, 'rgba(255,210,120,0)');
    sunCoreCtx.fillStyle = coreGrad;
    sunCoreCtx.fillRect(0, 0, 128, 128);
    const sunCoreSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(sunCoreCanvas), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    sunCoreSprite.scale.setScalar(14);
    sunCoreSprite.position.copy(sunSprite.position);
    scene.add(sunCoreSprite);

    /* ================================================================
       6. GROUND / CONTACT SHADOW CATCHER
       ================================================================ */
    const shadowCatcher = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.ShadowMaterial({ opacity: 0.35 })
    );
    shadowCatcher.rotation.x = -Math.PI / 2;
    shadowCatcher.position.y = -2.4;
    shadowCatcher.receiveShadow = true;
    scene.add(shadowCatcher);

    /* ================================================================
       7. MODEL LOADING
       ================================================================ */
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    let model = null;
    let modelBaseY = 0;

    let pulseMaterials = [];
    let categoryGroups = {};
    let explodableParts = [];
    let labelRegistry = [];
    let shipRadius = 1;

    // Procedural gunmetal hull texture
    function buildHullDetailTextures(repeat = 5) {
      const SIZE = 512;
      const detail = document.createElement('canvas');
      detail.width = detail.height = SIZE;
      const dctx = detail.getContext('2d');
      dctx.fillStyle = '#808080';
      dctx.fillRect(0, 0, SIZE, SIZE);

      const img = dctx.getImageData(0, 0, SIZE, SIZE);
      for (let i = 0; i < img.data.length; i += 4) {
        const n = 128 + (Math.random() - 0.5) * 30;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = n;
      }
      dctx.putImageData(img, 0, 0);

      dctx.globalAlpha = 0.14;
      dctx.strokeStyle = '#ffffff';
      for (let i = 0; i < 500; i++) {
        const y = Math.random() * SIZE;
        dctx.lineWidth = Math.random() * 1.1;
        dctx.beginPath();
        dctx.moveTo(0, y);
        dctx.lineTo(SIZE, y + (Math.random() - 0.5) * 5);
        dctx.stroke();
      }
      dctx.globalAlpha = 1;

      const cols = 7, rows = 7;
      const colX = [], rowY = [];
      for (let c = 0; c <= cols; c++) colX.push((c / cols) * SIZE + (Math.random() - 0.5) * 12);
      for (let r = 0; r <= rows; r++) rowY.push((r / rows) * SIZE + (Math.random() - 0.5) * 12);

      dctx.strokeStyle = 'rgba(15,15,15,0.65)';
      dctx.lineWidth = 2;
      colX.forEach(x => { dctx.beginPath(); dctx.moveTo(x, 0); dctx.lineTo(x, SIZE); dctx.stroke(); });
      rowY.forEach(y => { dctx.beginPath(); dctx.moveTo(0, y); dctx.lineTo(SIZE, y); dctx.stroke(); });

      dctx.fillStyle = 'rgba(30,30,30,0.85)';
      colX.forEach(x => rowY.forEach(y => {
        if (Math.random() > 0.45) return;
        dctx.beginPath();
        dctx.arc(x, y, SIZE * 0.0035, 0, Math.PI * 2);
        dctx.fill();
      }));

      const src = dctx.getImageData(0, 0, SIZE, SIZE).data;
      const nCanvas = document.createElement('canvas');
      nCanvas.width = nCanvas.height = SIZE;
      const nctx = nCanvas.getContext('2d');
      const nOut = nctx.createImageData(SIZE, SIZE);
      const strength = 2.4;
      const hAt = (x, y) => {
        x = (x + SIZE) % SIZE; y = (y + SIZE) % SIZE;
        return src[(y * SIZE + x) * 4] / 255;
      };
      for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
          const dx = (hAt(x - 1, y) - hAt(x + 1, y)) * strength;
          const dy = (hAt(x, y - 1) - hAt(x, y + 1)) * strength;
          const len = Math.sqrt(dx * dx + dy * dy + 1);
          const idx = (y * SIZE + x) * 4;
          nOut.data[idx] = (dx / len * 0.5 + 0.5) * 255;
          nOut.data[idx + 1] = (dy / len * 0.5 + 0.5) * 255;
          nOut.data[idx + 2] = (1 / len * 0.5 + 0.5) * 255;
          nOut.data[idx + 3] = 255;
        }
      }
      nctx.putImageData(nOut, 0, 0);

      const rCanvas = document.createElement('canvas');
      rCanvas.width = rCanvas.height = SIZE;
      const rctx = rCanvas.getContext('2d');
      rctx.drawImage(detail, 0, 0);
      rctx.globalCompositeOperation = 'difference';
      rctx.fillStyle = '#ffffff';
      rctx.fillRect(0, 0, SIZE, SIZE);
      rctx.globalCompositeOperation = 'source-over';

      const normalMap = new THREE.CanvasTexture(nCanvas);
      const roughnessMap = new THREE.CanvasTexture(rCanvas);
      [normalMap, roughnessMap].forEach(tex => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(repeat, repeat);
        tex.needsUpdate = true;
      });

      return { normalMap, roughnessMap };
    }
    const hullDetail = buildHullDetailTextures(5);

    const loader = new GLTFLoader();
    loader.load('/models/spaceship.glb', (gltf) => {
      model = gltf.scene;
      modelRef.current = model;

      function buildMaterialFor(old) {
        const name = (old.name || '').toLowerCase();

        if (name === 'shiphull') {
          const baseColor = (old.color ? old.color.clone() : new THREE.Color(0xffffff)).lerp(new THREE.Color(0x9aa7b3), 0.55);
          return new THREE.MeshPhysicalMaterial({
            map: old.map || null,
            color: baseColor,
            metalness: 1.0,
            roughness: 0.24,
            roughnessMap: hullDetail.roughnessMap,
            normalMap: hullDetail.normalMap,
            normalScale: new THREE.Vector2(0.75, 0.75),
            envMapIntensity: 1.1,
            clearcoat: 0.35,
            clearcoatRoughness: 0.14,
          });
        }
        if (name === 'glass') {
          return new THREE.MeshPhysicalMaterial({
            color: 0x0a1420, metalness: 0, roughness: 0.05,
            transmission: 1.0, thickness: 0.4, ior: 1.4,
            envMapIntensity: 1.5, clearcoat: 1.0
          });
        }
        if (name === 'mat black') {
          return new THREE.MeshStandardMaterial({ color: 0x0c0e12, metalness: 0.5, roughness: 0.55, envMapIntensity: 1.0 });
        }
        if (name === 'plasma' || name === 'glow' || name === 'glow.001') {
          const baseColor = old.color ? old.color.clone() : new THREE.Color(0x00d9ff);
          const intensity = name === 'plasma' ? 2.4 : 1.5;
          const mat = new THREE.MeshStandardMaterial({
            color: baseColor, emissive: baseColor.clone(), emissiveIntensity: intensity,
            metalness: 0, roughness: 0.3, envMapIntensity: 0.6
          });
          pulseMaterials.push({ material: mat, base: intensity, isPlasma: name === 'plasma' });
          return mat;
        }
        const baseColor = (old.color ? old.color.clone() : new THREE.Color(0xffffff)).lerp(new THREE.Color(0x9aa7b3), 0.4);
        return new THREE.MeshStandardMaterial({ color: baseColor, metalness: 0.8, roughness: 0.4, envMapIntensity: 0.95 });
      }

      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) child.material = buildMaterialFor(child.material);
        }
      });

      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);
      model.position.sub(center);

      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 5.4 / maxDim;
      model.scale.setScalar(scale);

      modelGroup.add(model);
      modelBaseY = 0;
      model.updateMatrixWorld(true);

      const CAT = {
        BRIDGE: 'Bridge', COMMAND: 'Command Module', HULL: 'Main Hull',
        REACTOR: 'Reactor Core', PLASMA: 'Plasma Chamber', ENGINE: 'Engine Array',
        THRUSTER: 'Thruster', SENSOR: 'Sensor Module', WEAPON: 'Weapon Turret',
        SIDE: 'Side Modules', BOTTOM: 'Bottom Modules', LIGHTS: 'Lights', HIDDEN: '__hidden__'
      };
      const LABELED = new Set([CAT.BRIDGE, CAT.COMMAND, CAT.HULL, CAT.REACTOR, CAT.PLASMA, CAT.ENGINE, CAT.THRUSTER, CAT.SENSOR, CAT.WEAPON]);

      function classifyByName(name) {
        const n = (name || '').toLowerCase();
        if (/reactor/.test(n) && /plasma/.test(n)) return CAT.PLASMA;
        if (/reactor/.test(n)) return CAT.REACTOR;
        if (/thruster/.test(n)) return CAT.THRUSTER;
        if (/engine/.test(n) && /flame|nozzle|exhaust/.test(n)) return CAT.ENGINE;
        if (/light/.test(n)) return CAT.LIGHTS;
        if (/bridge|cockpit/.test(n)) return CAT.BRIDGE;
        if (/command/.test(n)) return CAT.COMMAND;
        if (/sensor|antenna|radar/.test(n)) return CAT.SENSOR;
        if (/weapon|turret|gun|cannon/.test(n)) return CAT.WEAPON;
        if (/^cube$/.test(n) || /^text$/.test(n)) return CAT.HIDDEN;
        return null;
      }

      function hasMeshDescendant(obj) {
        let found = false;
        obj.traverse((c) => { if (c.isMesh) found = true; });
        return found;
      }

      const meshUnits = model.children.filter(hasMeshDescendant);
      const assignments = [];
      const pool = [];

      meshUnits.forEach((unit) => {
        const cat = classifyByName(unit.name);
        if (cat === CAT.HIDDEN) { unit.visible = false; return; }
        if (cat) assignments.push({ unit, category: cat });
        else pool.push(unit);
      });

      if (pool.length) {
        const poolBox = new THREE.Box3();
        pool.forEach((u) => poolBox.expandByObject(u));
        const pSize = new THREE.Vector3(); poolBox.getSize(pSize);
        const xMid = (poolBox.min.x + poolBox.max.x) / 2;
        const yMid = (poolBox.min.y + poolBox.max.y) / 2;

        pool.forEach((u) => {
          const b = new THREE.Box3().setFromObject(u);
          const c = new THREE.Vector3(); b.getCenter(c);
          const zFrac = pSize.z > 0 ? (c.z - poolBox.min.z) / pSize.z : 0.5;
          const xOff = pSize.x > 0 ? (c.x - xMid) / (pSize.x / 2) : 0;
          const yOff = pSize.y > 0 ? (c.y - yMid) / (pSize.y / 2) : 0;

          let category;
          if (zFrac < 0.16) category = CAT.BRIDGE;
          else if (zFrac < 0.34) category = CAT.COMMAND;
          else if (zFrac > 0.86) category = CAT.THRUSTER;
          else if (yOff > 0.28) category = CAT.SENSOR;
          else if (yOff < -0.28) category = CAT.BOTTOM;
          else if (Math.abs(xOff) > 0.45 && zFrac < 0.62) category = CAT.WEAPON;
          else if (Math.abs(xOff) > 0.45) category = CAT.SIDE;
          else category = CAT.HULL;

          assignments.push({ unit: u, category });
        });
      }

      const shipBox = new THREE.Box3().setFromObject(model);
      const shipCenter = shipBox.getCenter(new THREE.Vector3());
      const shipSize = shipBox.getSize(new THREE.Vector3());
      shipRadius = shipSize.length() / 2;

      const DIST_FACTOR = {
        [CAT.BRIDGE]: 0.95, [CAT.COMMAND]: 0.68, [CAT.HULL]: 0.05,
        [CAT.REACTOR]: 0.36, [CAT.PLASMA]: 0.48, [CAT.ENGINE]: 0.9,
        [CAT.THRUSTER]: 0.72, [CAT.SENSOR]: 0.62, [CAT.WEAPON]: 0.56,
        [CAT.SIDE]: 0.5, [CAT.BOTTOM]: 0.5, [CAT.LIGHTS]: 0.3
      };

      assignments.forEach(({ unit, category }) => {
        if (!categoryGroups[category]) {
          const g = new THREE.Group();
          g.name = 'Explode:' + category;
          model.add(g);
          categoryGroups[category] = g;
        }
        categoryGroups[category].attach(unit);
      });

      const labelLayer = document.getElementById('labelLayer');
      if (labelLayer) labelLayer.innerHTML = '';

      Object.entries(categoryGroups).forEach(([category, group]) => {
        const gBox = new THREE.Box3().setFromObject(group);
        const gCenter = gBox.getCenter(new THREE.Vector3());
        let dir = gCenter.clone().sub(shipCenter);
        if (dir.lengthSq() < 1e-6) dir.set(0, -1, 0);
        dir.normalize();

        const dist = shipRadius * (DIST_FACTOR[category] ?? 0.5);
        const jitter = () => THREE.MathUtils.degToRad(2 + Math.random() * 3) * (Math.random() < 0.5 ? -1 : 1);

        group.userData.explode = {
          home: new THREE.Vector3(0, 0, 0),
          offset: dir.multiplyScalar(dist),
          rotJitter: new THREE.Euler(jitter(), jitter(), jitter()),
          floatPhase: Math.random() * Math.PI * 2,
          floatFreq: 0.35 + Math.random() * 0.25
        };
        explodableParts.push(group);

        const localGCenter = group.worldToLocal(gCenter.clone());
        const gDiag = gBox.getSize(new THREE.Vector3()).length() || 1;
        const crowdBoost = group.children.length > 4 ? 1.35 : 1.0;

        group.children.forEach((unit) => {
          const uBox = new THREE.Box3().setFromObject(unit);
          const uWorldCenter = uBox.getCenter(new THREE.Vector3());
          const uLocalCenter = group.worldToLocal(uWorldCenter.clone());
          let uDir = uLocalCenter.clone().sub(localGCenter);
          if (uDir.lengthSq() < 1e-6) uDir.set(0, 0, 1);
          uDir.normalize();

          unit.userData.explode = {
            home: unit.position.clone(),
            offset: uDir.multiplyScalar(gDiag * 0.55 * crowdBoost),
            rotJitter: new THREE.Euler(jitter(), jitter(), jitter()),
            floatPhase: Math.random() * Math.PI * 2,
            floatFreq: 0.4 + Math.random() * 0.3
          };
          explodableParts.push(unit);

          const subParts = unit.children.filter(hasMeshDescendant);
          if (subParts.length) {
            const unitBox = new THREE.Box3().setFromObject(unit);
            const unitCenterWorld = unitBox.getCenter(new THREE.Vector3());
            const unitDiag = unitBox.getSize(new THREE.Vector3()).length() || 0.3;
            const invMatrix = unit.matrixWorld.clone().invert();

            subParts.forEach((sub) => {
              const subBox = new THREE.Box3().setFromObject(sub);
              const subCenterWorld = subBox.getCenter(new THREE.Vector3());
              let subDirWorld = subCenterWorld.clone().sub(unitCenterWorld);
              if (subDirWorld.lengthSq() < 1e-6) subDirWorld.set(0, 1, 0);
              subDirWorld.normalize();
              const subDirLocal = subDirWorld.clone().transformDirection(invMatrix).normalize();

              sub.userData.explode = {
                home: sub.position.clone(),
                offset: subDirLocal.multiplyScalar(unitDiag * 0.6),
                rotJitter: new THREE.Euler(jitter(), jitter(), jitter()),
                floatPhase: Math.random() * Math.PI * 2,
                floatFreq: 0.5 + Math.random() * 0.3
              };
              explodableParts.push(sub);
            });
          }
        });

        if (LABELED.has(category)) {
          const el = document.createElement('div');
          el.className = 'part-label';
          el.innerHTML = `<span class="dot"></span><span class="chip">${category}</span>`;
          el.style.opacity = isExplodedRef.current ? 1 : 0;
          if (labelLayer) labelLayer.appendChild(el);
          labelRegistry.push({ el, target: group });
          labelRegistryRef.current = labelRegistry;
        }
      });

      const scaledBox = new THREE.Box3().setFromObject(model);
      engineGlowA.position.set(0, scaledBox.min.y + 0.4, scaledBox.min.z + 0.4);
      engineGlowB.position.set(0.6, scaledBox.min.y + 0.6, scaledBox.min.z + 0.8);

      const fogCanvas = document.createElement('canvas');
      fogCanvas.width = fogCanvas.height = 256;
      const fogCtx = fogCanvas.getContext('2d');
      const fogGrad = fogCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
      fogGrad.addColorStop(0.0, 'rgba(140,180,255,0.35)');
      fogGrad.addColorStop(0.5, 'rgba(110,150,220,0.12)');
      fogGrad.addColorStop(1.0, 'rgba(110,150,220,0)');
      fogCtx.fillStyle = fogGrad;
      fogCtx.fillRect(0, 0, 256, 256);
      const fogTexture = new THREE.CanvasTexture(fogCanvas);

      const fogSize = new THREE.Vector3();
      scaledBox.getSize(fogSize);
      const fogCenter = new THREE.Vector3();
      scaledBox.getCenter(fogCenter);
      const fogSpriteMat = new THREE.SpriteMaterial({
        map: fogTexture, transparent: true, depthWrite: false,
        blending: THREE.AdditiveBlending, opacity: 0.5
      });
      const fogAnchors = [
        [0, -0.1, 0, 1.0],
        [0.35, 0.0, 0.25, 0.7],
        [-0.3, 0.05, -0.2, 0.65],
        [0, 0.35, -0.35, 0.6]
      ];
      fogAnchors.forEach(([fx, fy, fz, fs]) => {
        const spr = new THREE.Sprite(fogSpriteMat.clone());
        spr.position.set(
          fogCenter.x + fx * fogSize.x,
          fogCenter.y + fy * fogSize.y,
          fogCenter.z + fz * fogSize.z
        );
        const s = Math.max(fogSize.x, fogSize.y, fogSize.z) * fs;
        spr.scale.set(s, s, 1);
        spr.renderOrder = 1;
        modelGroup.add(spr);
      });

      // Finish ship load, start space station load
      onModelLoaded();
    }, undefined, (err) => {
      console.error('Ship load error:', err);
    });

    /* ================================================================
       7.5 SPACE STATION
       ================================================================ */
    let stationGroup = null;

    function loadImageTexture(dataURI, colorSpace) {
      const tex = new THREE.Texture();
      const img = new Image();
      img.onload = () => {
        tex.image = img;
        if (colorSpace) tex.colorSpace = colorSpace;
        tex.needsUpdate = true;
      };
      img.src = dataURI;
      return tex;
    }

    async function loadSpaceStation() {
      try {
        const badge = document.getElementById('stationDebugBadge');
        if (badge) badge.textContent = 'station: parsing…';

        const texResponse = await fetch('/models/stationTextures.json');
        const texMap = await texResponse.json();

        const stationLoader = new GLTFLoader();
        stationLoader.load('/models/spacestation.glb', (gltf) => {
          const station = gltf.scene;
          let meshCount = 0;

          station.traverse((child) => {
            if (child.isMesh) {
              meshCount++;
              child.castShadow = true;
              child.receiveShadow = true;
              child.frustumCulled = true;

              const mat = child.material;
              if (mat) {
                mat.envMapIntensity = 2.4;
                const slots = texMap[mat.name];
                if (slots) {
                  if (slots.baseColor) mat.map = loadImageTexture(slots.baseColor, THREE.SRGBColorSpace);
                  if (slots.emissive) {
                    mat.emissiveMap = loadImageTexture(slots.emissive, THREE.SRGBColorSpace);
                    mat.emissiveIntensity = 4.5;
                  }
                  if (slots.normal) mat.normalMap = loadImageTexture(slots.normal, THREE.NoColorSpace);
                }
                const matName = (mat.name || '').toLowerCase();
                if (matName.includes('light') || matName.includes('window') || matName.includes('glow') || matName.includes('emissive')) {
                  if (!mat.emissiveMap) {
                    mat.emissive.setHex(0xffaa44);
                    mat.emissiveIntensity = 3.5;
                  }
                }
                mat.needsUpdate = true;
              }
            }
          });

          const box = new THREE.Box3().setFromObject(station);
          const size = new THREE.Vector3();
          const center = new THREE.Vector3();
          box.getSize(size);
          box.getCenter(center);
          station.position.sub(center);

          const maxDim = Math.max(size.x, size.y, size.z);
          const STATION_TARGET_SIZE = 55;
          const stationScale = maxDim > 0 ? STATION_TARGET_SIZE / maxDim : 1;

          stationGroup = new THREE.Group();
          stationGroup.add(station);
          stationGroup.scale.setScalar(stationScale);
          stationGroup.position.set(-8.6, -0.85, -9.4);
          stationGroup.rotation.set(0.12, 1.1, 0);

          const stationSunTarget = new THREE.Object3D();
          stationSunTarget.position.copy(stationGroup.position);
          scene.add(stationSunTarget);

          // Add station lighting
          const sunLightPos = new THREE.Vector3().copy(stationGroup.position).addScaledVector(SUN_DIR, 26);
          const stationSun = new THREE.DirectionalLight(0xfff4e0, 1.8);
          stationSun.position.copy(sunLightPos);
          stationSun.target = stationSunTarget;
          stationSun.castShadow = false; // saved: avoid a second full shadow map alongside keyLight
          scene.add(stationSun);

          const stationFill = new THREE.DirectionalLight(0x00d9ff, 1.8);
          stationFill.position.set(CAMERA_HOME.x + 4, CAMERA_HOME.y + 3, CAMERA_HOME.z + 2);
          stationFill.target = stationSunTarget;
          scene.add(stationFill);

          const stationFill2 = new THREE.DirectionalLight(0xff1e3a, 1.25);
          stationFill2.position.set(-CAMERA_HOME.x - 4, -CAMERA_HOME.y + 1, -CAMERA_HOME.z - 2);
          stationFill2.target = stationSunTarget;
          scene.add(stationFill2);

          // Navigation beacons
          window.stationBeacons = [];
          const createBeacon = (x, y, z, color, intensity, isBlinking) => {
            const light = new THREE.PointLight(color, intensity, 12, 1.6);
            light.position.set(x, y, z);
            stationGroup.add(light);

            const geom = new THREE.SphereGeometry(0.18, 8, 8);
            const mat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 1.0 });
            const mesh = new THREE.Mesh(geom, mat);
            mesh.position.set(x, y, z);
            stationGroup.add(mesh);

            window.stationBeacons.push({ light, mesh, baseIntensity: intensity, isBlinking });
          };

          createBeacon(15, 0, 0, 0xff3b3b, 5.0, true);
          createBeacon(-15, 0, 0, 0x3bff3b, 5.0, true);
          if (!isMobile) {
            createBeacon(4, 2, -4, 0xffaa00, 3.8, false);
            createBeacon(-4, -2, 4, 0x00e1ff, 3.8, false);
          }

          scene.add(stationGroup);

          if (badge) {
            badge.textContent = `station: OK meshes=${meshCount} scale=${stationScale.toFixed(3)}`;
          }
        }, undefined, (err) => {
          console.error('Station load error:', err);
          if (badge) badge.textContent = 'station: ERROR loading GLB';
        });
      } catch (err) {
        console.error('Station setup error:', err);
      }
    }

    function onModelLoaded() {
      // Fire callback to hide loader in App.jsx
      onLoaded();

      // Trigger standard entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to(canvas, { opacity: 1, duration: 1.4 })
        .from(modelGroup.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 1.6, ease: 'power4.out' }, '<')
        .from('#introEyebrow', { y: 16, opacity: 0, duration: 0.6 }, '-=1.0')
        .from('#introHeading', { y: 34, opacity: 0, duration: 0.9 }, '-=0.45')
        .from('#introSub', { y: 20, opacity: 0, duration: 0.8 }, '-=0.55')
        .from('#introCta', { y: 16, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('#interactHint', { opacity: 0, y: -10, duration: 0.6 }, '-=0.3');

      // Setup ScrollTrigger interaction
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          camera.position.lerpVectors(CAMERA_HOME, new THREE.Vector3(2.5, 0.85, 3.6), p);
          controls.autoRotateSpeed = 0.5 + p * 2.2;
          bloomPass.strength = (isMobile ? 0.28 : 0.38) * (1 - p * 0.4);
        },
      });

      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        });
      });

      // Defer background station load by 400ms
      setTimeout(loadSpaceStation, 400);
    }

    /* ================================================================
       8. POST-PROCESSING
       ================================================================ */
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(initialWidth, initialHeight),
      0.38,
      0.4,
      0.94
    );
    if (!isMobile) composer.addPass(bloomPass); // bloom skipped on mobile: too costly for smooth fps

    const bokehPass = null; // removed: DoF pass was too expensive for smooth playback

    const vignetteShader = {
      uniforms: { tDiffuse: { value: null }, offset: { value: 1.15 }, darkness: { value: 1.15 } },
      vertexShader: `
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float offset;
        uniform float darkness;
        varying vec2 vUv;
        void main(){
          vec4 texel = texture2D(tDiffuse, vUv);
          vec2 uv = (vUv - 0.5) * offset;
          float vig = 1.0 - dot(uv, uv) * darkness;
          texel.rgb *= clamp(vig, 0.0, 1.0);
          gl_FragColor = texel;
        }
      `,
    };
    const vignettePass = new ShaderPass(vignetteShader);
    composer.addPass(vignettePass);

    const cinematicGradeShader = {
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
        contrast: { value: 1.12 },
        aberration: { value: isMobile ? 0.0011 : 0.0018 },
        grainAmount: { value: isMobile ? 0.02 : 0.028 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;
        uniform float contrast;
        uniform float aberration;
        uniform float grainAmount;
        varying vec2 vUv;

        float grainNoise(vec2 uv, float t){
          return fract(sin(dot(uv * (t + 1.0), vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main(){
          vec2 center = vUv - 0.5;
          float edge = dot(center, center);
          vec2 dir = normalize(center + 1e-6);
          vec2 off = dir * edge * aberration;

          float r = texture2D(tDiffuse, vUv - off).r;
          float g = texture2D(tDiffuse, vUv).g;
          float b = texture2D(tDiffuse, vUv + off).b;
          vec3 col = vec3(r, g, b);

          col = (col - 0.5) * contrast + 0.5;
          float grain = (grainNoise(vUv, uTime) - 0.5) * grainAmount;
          col += grain;

          gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
        }
      `,
    };
    const cinematicGradePass = new ShaderPass(cinematicGradeShader);
    composer.addPass(cinematicGradePass);
    composer.addPass(new OutputPass());

    /* ================================================================
       9. CONTROLS
       ================================================================ */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 3.2;
    controls.maxDistance = 8;
    controls.minPolarAngle = Math.PI * 0.16;
    controls.maxPolarAngle = Math.PI * 0.78;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.target.set(0, 0, 0);

    /* ================================================================
       9.5 INTERACTION (RAYCASTING)
       ================================================================ */
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();
    let hoveredGroup = null;
    const highlightSnapshot = new Map();

    function getIntersectedCategoryGroup(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      pointerNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointerNDC, camera);
      const hits = raycaster.intersectObject(modelGroup, true);
      if (!hits.length || !model) return null;
      let obj = hits[0].object;
      while (obj && obj.parent !== model) obj = obj.parent;
      return obj && categoryGroups && Object.values(categoryGroups).includes(obj) ? obj : null;
    }

    function setHoveredGroup(group) {
      if (group === hoveredGroup) return;

      if (hoveredGroup) {
        hoveredGroup.traverse((c) => {
          if (c.isMesh && c.material && highlightSnapshot.has(c.material)) {
            const snap = highlightSnapshot.get(c.material);
            c.material.emissive.copy(snap.emissive);
            c.material.emissiveIntensity = snap.intensity;
            highlightSnapshot.delete(c.material);
          }
        });
      }

      hoveredGroup = group;
      canvas.classList.toggle('is-hoverable', !!group);

      if (hoveredGroup) {
        hoveredGroup.traverse((c) => {
          if (c.isMesh && c.material) {
            if (!highlightSnapshot.has(c.material)) {
              highlightSnapshot.set(c.material, {
                emissive: c.material.emissive.clone(),
                intensity: c.material.emissiveIntensity ?? 1,
              });
            }
            c.material.emissive.lerp(new THREE.Color(0x00d9ff), 0.35);
            c.material.emissiveIntensity = Math.max(c.material.emissiveIntensity ?? 0, 0.6);
          }
        });
      }
    }

    let downX = 0, downY = 0, downTime = 0, isPrimaryDown = false;
    const TAP_MOVE_TOLERANCE = 10;
    const TAP_TIME_LIMIT = 600;

    const onPointerDown = (e) => {
      if (!e.isPrimary) return;
      downX = e.clientX;
      downY = e.clientY;
      downTime = performance.now();
      isPrimaryDown = true;
    };

    const onPointerUp = (e) => {
      if (!isPrimaryDown) return;
      isPrimaryDown = false;
      const moved = Math.hypot(e.clientX - downX, e.clientY - downY);
      if (moved < TAP_MOVE_TOLERANCE && performance.now() - downTime < TAP_TIME_LIMIT) {
        const clickedGroup = getIntersectedCategoryGroup(e.clientX, e.clientY);
        if (clickedGroup) {
          setIsExploded(!isExplodedRef.current);
        }
      }
    };

    let lastPointerMoveTime = 0;
    const onPointerMove = (e) => {
      if (isMobile || e.buttons !== 0) return;
      const now = performance.now();
      if (now - lastPointerMoveTime < 33) return; // ~30fps throttle
      lastPointerMoveTime = now;
      setHoveredGroup(getIntersectedCategoryGroup(e.clientX, e.clientY));
    };

    const onPointerLeave = () => setHoveredGroup(null);

    const onTouchStart = (e) => {
      if (!e.touches.length) return;
      const touch = e.touches[0];
      const group = getIntersectedCategoryGroup(touch.clientX, touch.clientY);
      if (group) {
        setHoveredGroup(group);
        clearTimeout(canvas._touchHighlightTimer);
        canvas._touchHighlightTimer = setTimeout(() => setHoveredGroup(null), 900);
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });

    const onContextLost = (e) => {
      e.preventDefault();
      cancelAnimationFrame(animateId);
      console.warn('WebGL context lost — pausing render loop.');
    };
    const onContextRestored = () => {
      console.warn('WebGL context restored — resuming render loop.');
      animate();
    };
    canvas.addEventListener('webglcontextlost', onContextLost, false);
    canvas.addEventListener('webglcontextrestored', onContextRestored, false);

    /* ================================================================
       11. RESIZE HANDLING
       ================================================================ */
    let resizeRAF = null;
    function handleResize() {
      const w = heroEl.clientWidth || window.innerWidth || 800;
      const h = heroEl.clientHeight || window.innerHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);

      const dpr = currentDPR;
      renderer.setPixelRatio(dpr);
      bloomPass.resolution.set(
        (isMobile ? w * 0.6 : w) * (dpr / MAX_DPR),
        (isMobile ? h * 0.6 : h) * (dpr / MAX_DPR)
      );

      if (bokehPass) bokehPass.setSize(w, h);
    }

    const onWindowResize = () => {
      if (resizeRAF) cancelAnimationFrame(resizeRAF);
      resizeRAF = requestAnimationFrame(handleResize);
    };
    window.addEventListener('resize', onWindowResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(heroEl);

    /* ================================================================
       12. ANIMATION LOOP
       ================================================================ */
    const clock = new THREE.Clock();
    const _labelWorldPos = new THREE.Vector3();

    const MAX_DPR = PIXEL_RATIO;
    const MIN_DPR = isMobile ? 0.85 : 1.2;
    let currentDPR = PIXEL_RATIO;
    let frameAccum = 0,
      frameCount = 0;
    const SAMPLE_WINDOW = 40;

    let animateId;

    function animate() {
      animateId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const dt = clock.getDelta();

      // Adaptive quality
      frameAccum += dt;
      frameCount++;
      if (frameCount >= SAMPLE_WINDOW) {
        const avgMs = (frameAccum / frameCount) * 1000;
        if (avgMs > 22 && currentDPR > MIN_DPR) {
          currentDPR = Math.max(MIN_DPR, +(currentDPR - 0.2).toFixed(2));
          renderer.setPixelRatio(currentDPR);
        } else if (avgMs < 14 && currentDPR < MAX_DPR) {
          currentDPR = Math.min(MAX_DPR, +(currentDPR + 0.15).toFixed(2));
          renderer.setPixelRatio(currentDPR);
        }
        frameAccum = 0;
        frameCount = 0;
      }

      if (model) {
        modelGroup.position.y = modelBaseY + Math.sin(t * 0.55) * 0.12;
        modelGroup.rotation.z = Math.sin(t * 0.35) * 0.01;

        const et = explodeStateRef.current.t;
        if (et > 0.0001) {
          explodableParts.forEach((obj) => {
            const d = obj.userData.explode;
            const floatAmt = Math.sin(t * d.floatFreq + d.floatPhase) * 0.05 * et;
            obj.position.set(
              d.home.x + d.offset.x * et,
              d.home.y + d.offset.y * et + floatAmt,
              d.home.z + d.offset.z * et
            );
            obj.rotation.set(d.rotJitter.x * et, d.rotJitter.y * et, d.rotJitter.z * et);
          });
        } else {
          explodableParts.forEach((obj) => {
            const d = obj.userData.explode;
            obj.position.copy(d.home);
            obj.rotation.set(0, 0, 0);
          });
        }

        pulseMaterials.forEach(({ material, base, isPlasma }) => {
          const speed = isPlasma ? 2.2 : 1.4;
          const depth = isPlasma ? 0.9 : 0.5;
          material.emissiveIntensity = base + Math.sin(t * speed) * depth * (isPlasma ? 0.5 + et * 0.5 : 1);
        });

        // HTML Screen space labels
        labelRegistry.forEach(({ el, target }) => {
          target.getWorldPosition(_labelWorldPos);
          const ndc = _labelWorldPos.clone().project(camera);
          const w = heroEl.clientWidth || window.innerWidth || 800;
          const h = heroEl.clientHeight || window.innerHeight || 600;
          el.style.left = (ndc.x * 0.5 + 0.5) * w + 'px';
          el.style.top = (-ndc.y * 0.5 + 0.5) * h + 'px';
          el.style.display = ndc.z > 1 ? 'none' : 'flex';
        });
      }

      earthMesh.rotation.y = t * 0.015;

      if (stationGroup) {
        stationGroup.rotation.y += dt * 0.12;
        stationGroup.rotation.x = 0.15 + Math.sin(t * 0.05) * 0.03;
        stationGroup.position.y = -0.65 + Math.sin(t * 0.09) * 0.35;

        if (window.stationBeacons) {
          const flash = t % 1.5 < 0.28;
          window.stationBeacons.forEach((b) => {
            if (b.isBlinking) {
              b.light.intensity = flash ? b.baseIntensity : 0.0;
              b.mesh.material.opacity = flash ? 1.0 : 0.15;
              b.mesh.material.transparent = true;
            } else {
              const pulse = 0.75 + Math.sin(t * 2.8) * 0.25;
              b.light.intensity = b.baseIntensity * pulse;
              b.mesh.material.opacity = 0.5 + pulse * 0.5;
            }
          });
        }
      }

      nebulaMat.uniforms.uTime.value = t * 60.0;
      cinematicGradePass.uniforms.uTime.value = t;

      controls.update();
      composer.render();
    }
    animate();

    /* ================================================================
       CLEANUP
       ================================================================ */
    return () => {
      cancelAnimationFrame(animateId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', onWindowResize);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('touchstart', onTouchStart);

      // Dispose Three.js objects
      scene.traverse((object) => {
        if (!object.isMesh) return;
        object.geometry.dispose();
        if (object.material.isMaterial) {
          cleanMaterial(object.material);
        } else {
          for (const material of object.material) {
            cleanMaterial(material);
          }
        }
      });

      starfield.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });

      earthTexture.dispose();
      sunTexture.dispose();
      renderer.dispose();
      composer.dispose();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

    function cleanMaterial(material) {
      material.dispose();
      for (const key of Object.keys(material)) {
        const value = material[key];
        if (value && typeof value.dispose === 'function') {
          value.dispose();
        }
      }
    }
  }, [onLoaded]);

  /* ================================================================
     REACT-CONTROLLED EXPLODE TWEEN
     ================================================================ */
  useEffect(() => {
    if (!modelRef.current) return;

    if (explodeTweenRef.current) explodeTweenRef.current.kill();
    if (cameraTweenRef.current) cameraTweenRef.current.kill();

    const duration = isExploded ? 2.2 : 1.8;

    explodeTweenRef.current = gsap.to(explodeStateRef.current, {
      t: isExploded ? 1 : 0,
      duration,
      ease: 'power3.inOut',
    });

    cameraTweenRef.current = gsap.to(canvasRef.current.parentElement.__camera || {}, {
      // Direct tween of zoom on the camera or simple trigger
      duration,
      ease: 'power3.inOut',
    });

    // Animate camera zoom manually or using GSAP
    const sceneCamera = sceneRef.current.children.find(c => c.isPerspectiveCamera);
    if (sceneCamera) {
      gsap.to(sceneCamera, {
        zoom: isExploded ? 0.8 : 1.0,
        duration,
        ease: 'power3.inOut',
        onUpdate: () => sceneCamera.updateProjectionMatrix()
      });

      const sceneControls = OrbitControls.getAssociatedControls ? OrbitControls.getAssociatedControls(canvasRef.current)[0] : null;
      if (sceneControls) {
        sceneControls.autoRotateSpeed = isExploded ? 0.18 : 0.5;
      }
    }

    // Toggle label element visibility
    labelRegistryRef.current.forEach(({ el }) => {
      gsap.to(el, {
        opacity: isExploded ? 1 : 0,
        duration: isExploded ? 0.8 : 0.4,
        delay: isExploded ? 1.3 : 0,
        ease: 'power2.out',
      });
    });
  }, [isExploded]);

  return (
    <div ref={containerRef} id="hero" className="hero">
      <canvas ref={canvasRef} id="sceneCanvas" />
      <div id="stationDebugBadge" />
      <div id="interactHint" className="interact-hint">
        <span className="dot"></span>
        <span id="interactHintText">
          {isExploded ? 'Click again to reassemble' : 'Click the vessel to explode view'}
        </span>
      </div>
      <div id="labelLayer" />
    </div>
  );
}
