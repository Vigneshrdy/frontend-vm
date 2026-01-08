import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const HelmetReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const gu = {
      time: { value: 0 },
      dTime: { value: 0 },
      aspect: { value: window.innerWidth / window.innerHeight }
    };

    class Blob {
      renderer: THREE.WebGLRenderer;
      fbTexture: { value: THREE.FramebufferTexture };
      rtOutput: THREE.WebGLRenderTarget;
      uniforms: {
        pointer: { value: THREE.Vector2 };
        pointerDown: { value: number };
        pointerRadius: { value: number };
        pointerDuration: { value: number };
      };
      rtScene: THREE.Mesh;
      rtCamera: THREE.Camera;

      constructor(renderer: THREE.WebGLRenderer) {
        this.renderer = renderer;
        this.fbTexture = { value: new THREE.FramebufferTexture(window.innerWidth, window.innerHeight) };
        this.rtOutput = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
        this.uniforms = {
          pointer: { value: new THREE.Vector2().setScalar(10) },
          pointerDown: { value: 1 },
          pointerRadius: { value: 0.375 },
          pointerDuration: { value: 2.5 }
        };

        const handlePointerMove = (event: PointerEvent) => {
          this.uniforms.pointer.value.x = (event.clientX / window.innerWidth) * 2 - 1;
          this.uniforms.pointer.value.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        const handlePointerLeave = () => {
          this.uniforms.pointer.value.setScalar(10);
        };

        window.addEventListener("pointermove", handlePointerMove);
        renderer.domElement.addEventListener("pointerleave", handlePointerLeave);

        const material = new THREE.MeshBasicMaterial({
          color: 0x000000,
        });

        material.onBeforeCompile = (shader) => {
          shader.uniforms.dTime = gu.dTime;
          shader.uniforms.aspect = gu.aspect;
          shader.uniforms.pointer = this.uniforms.pointer;
          shader.uniforms.pointerDown = this.uniforms.pointerDown;
          shader.uniforms.pointerRadius = this.uniforms.pointerRadius;
          shader.uniforms.pointerDuration = this.uniforms.pointerDuration;
          shader.uniforms.fbTexture = this.fbTexture;
          shader.fragmentShader = `
            uniform float dTime;
            uniform float aspect;
            uniform vec2 pointer;
            uniform float pointerDown;
            uniform float pointerRadius;
            uniform float pointerDuration;
            uniform sampler2D fbTexture;
            
            ${shader.fragmentShader}
          `.replace(
            `#include <color_fragment>`,
            `#include <color_fragment>
            
            float duration = pointerDuration;
            
            float rVal = texture2D(fbTexture, vUv).r;
            
            rVal -= clamp(dTime / duration, 0., 0.1);
            rVal = clamp(rVal, 0., 1.);
            
            float f = 0.;
            if (pointerDown > 0.5){
              vec2 uv = (vUv - 0.5) * 2. * vec2(aspect, 1.);
              vec2 mouse = pointer * vec2(aspect, 1);
              
              f = 1. - smoothstep(pointerRadius * 0.1, pointerRadius, distance(uv, mouse));
            }
            rVal += f * 0.1;
            rVal = clamp(rVal, 0., 1.);
            diffuseColor.rgb = vec3(rVal);
            `
          );
        };

        material.defines = { "USE_UV": "" };

        this.rtScene = new THREE.Mesh(
          new THREE.PlaneGeometry(2, 2),
          material
        );
        this.rtCamera = new THREE.Camera();
      }

      render() {
        this.renderer.setRenderTarget(this.rtOutput);
        this.renderer.render(this.rtScene, this.rtCamera);
        this.renderer.copyFramebufferToTexture(this.fbTexture.value);
        this.renderer.setRenderTarget(null);
      }

      setSize(w: number, h: number) {
        this.rtOutput.setSize(w, h);
      }
    }

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    
    const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(-1, 0, 0).setLength(15);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      gu.aspect.value = camera.aspect;
    };

    window.addEventListener("resize", handleResize);

    const camShift = new THREE.Vector3(0, 1, 0);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.object.position.add(camShift);
    controls.target.add(camShift);

    const light = new THREE.AmbientLight(0xffffff, Math.PI);
    scene.add(light);

    const blob = new Blob(renderer);
    const loader = new GLTFLoader();

    const clock = new THREE.Clock();
    let t = 0;
    let animationId: number;

    const loadModels = async () => {
      try {
        // Load head model
        const headGltf = await loader.loadAsync("https://threejs.org/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb");
        const head = headGltf.scene.children[0] as THREE.Mesh;
        head.geometry.rotateY(Math.PI * 0.01);
        head.material = new THREE.MeshMatcapMaterial({ color: 0xffffff });
        scene.add(head);

        // Load helmet model
        const helmetGltf = await loader.loadAsync("https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf");
        const helmet = helmetGltf.scene.children[0] as THREE.Mesh;
        
        const helmetMaterial = helmet.material as THREE.MeshStandardMaterial;
        helmetMaterial.onBeforeCompile = (shader) => {
          shader.uniforms.texBlob = { value: blob.rtOutput.texture };
          shader.vertexShader = `
            varying vec4 vPosProj;
            ${shader.vertexShader}
          `.replace(
            `#include <project_vertex>`,
            `#include <project_vertex>
              vPosProj = gl_Position;
            `
          );
          shader.fragmentShader = `
            uniform sampler2D texBlob;
            varying vec4 vPosProj;
            ${shader.fragmentShader}
          `.replace(
            `#include <clipping_planes_fragment>`,
            `
            vec2 blobUV = ((vPosProj.xy / vPosProj.w) + 1.) * 0.5;
            vec4 blobData = texture(texBlob, blobUV);
            if (blobData.r < 0.01) discard;
            #include <clipping_planes_fragment>
            `
          );
        };
        
        helmet.scale.setScalar(3.5);
        helmet.position.set(0, 1.5, 0.75);
        scene.add(helmet);

        // Create wireframe helmet
        const helmetWire = new THREE.Mesh(
          helmet.geometry.clone().rotateX(Math.PI * 0.5),
          new THREE.MeshBasicMaterial({
            color: 0x000000,
            wireframe: true,
            transparent: true,
            opacity: 0.25,
          })
        );
        
        (helmetWire.material as THREE.MeshBasicMaterial).onBeforeCompile = (shader) => {
          shader.uniforms.time = gu.time;
          shader.vertexShader = `
            varying float vYVal;
            ${shader.vertexShader}
          `.replace(
            `#include <begin_vertex>`,
            `#include <begin_vertex>
              vYVal = position.y;
            `
          );
          shader.fragmentShader = `
            uniform float time;
            varying float vYVal;
            ${shader.fragmentShader}
          `.replace(
            `#include <color_fragment>`,
            `#include <color_fragment>
              float y = fract(vYVal * 0.25 + time * 0.5);
              float fY = smoothstep(0., 0.01, y) - smoothstep(0.02, 0.1, y);
              diffuseColor.a *= fY * 0.9 + 0.1;
            `
          );
        };
        
        helmetWire.scale.setScalar(3.5);
        helmetWire.position.set(0, 1.5, 0.75);
        scene.add(helmetWire);

        // Animation loop
        const animate = () => {
          animationId = requestAnimationFrame(animate);
          const dt = clock.getDelta();
          t += dt;
          gu.time.value = t;
          gu.dTime.value = dt;
          controls.update();
          blob.render();
          renderer.render(scene, camera);
        };

        animate();
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    loadModels();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      controls.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Overlay UI */}
      <div className="absolute top-6 left-6 z-10">
        <a href="/" className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Back</span>
        </a>
      </div>
      
      <div className="absolute bottom-6 left-6 z-10 text-foreground">
        <h1 className="font-serif text-2xl font-bold mb-1">Helmet Reveal</h1>
        <p className="text-muted-foreground text-sm">Move your cursor to reveal the helmet</p>
      </div>
    </div>
  );
};

export default HelmetReveal;
