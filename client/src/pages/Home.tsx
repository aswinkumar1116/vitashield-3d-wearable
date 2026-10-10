/* VitaShield — Premium Engineering Exploded Smartwatch Visualization
   Realistic 3D procedural geometry with 19 distinct layers */
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Edges, Environment, OrbitControls, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import { Activity, AlertTriangle, BatteryCharging, Camera, Check, ChevronRight, CircleDot, Cpu, Crosshair, Eye, EyeOff, Flame, FlipHorizontal, Gauge, Layers3, Maximize2, MousePointer2, Play, RadioTower, RefreshCw, RotateCcw, ScanLine, Search, ShieldCheck, Sliders, Thermometer, Vibrate, WifiOff, Wind, Zap, ZoomIn, ZoomOut } from "lucide-react";
import { COMPONENTS_LIST, type ComponentInspectionItem, LAYERS, type LayerDefinition, type LayerId, PRESENTATION_DEMOS, type PresentationDemo, SCENARIOS, type ScenarioId, SIGNAL_PATHS } from "@/lib/layerData";

const SIGNAL = "#B7FF5A";
type CameraViewPreset = "front" | "back" | "left" | "right" | "top" | "bottom" | "iso";

// Dimensions for a 39x47x12mm smartwatch (1 unit = 100mm)
const W = 0.195; // half-width
const H = 0.235; // half-height
const R = 0.06;  // corner radius

/* =========================================================================
   Reusable Sub-Components
   ========================================================================= */
function SMDPassive({ position, size = [0.015, 0.005, 0.008], color = "#1a1a1a", opacity = 1 }: { position: [number, number, number]; size?: [number, number, number]; color?: string; opacity?: number; }) {
  return (
    <group position={position}>
      <mesh><boxGeometry args={size} /><meshStandardMaterial color={color} roughness={0.4} metalness={0.3} transparent opacity={opacity} /></mesh>
      <mesh position={[-size[0]*0.4, 0, 0]}><boxGeometry args={[size[0]*0.25, size[1]*1.05, size[2]*1.05]} /><meshStandardMaterial color="#c4a84e" metalness={0.85} roughness={0.2} transparent opacity={opacity} /></mesh>
      <mesh position={[size[0]*0.4, 0, 0]}><boxGeometry args={[size[0]*0.25, size[1]*1.05, size[2]*1.05]} /><meshStandardMaterial color="#c4a84e" metalness={0.85} roughness={0.2} transparent opacity={opacity} /></mesh>
    </group>
  );
}

function ICPackage({ position, size, label, color = "#1a1d1b", opacity = 1 }: { position: [number, number, number]; size: [number, number, number]; label?: string; color?: string; opacity?: number; }) {
  return (
    <group position={position}>
      <mesh castShadow><boxGeometry args={size} /><meshStandardMaterial color={color} roughness={0.3} metalness={0.5} transparent opacity={opacity} /></mesh>
      {label && <Text position={[0, size[1]/2 + 0.001, 0]} rotation={[-Math.PI/2, 0, 0]} fontSize={Math.min(size[0], size[2])*0.35} color="#6a7a6e" anchorX="center" anchorY="middle">{label}</Text>}
    </group>
  );
}

/* =========================================================================
   3D Product Parts: Realistic Smartwatch Exploded Assembly
   ========================================================================= */
function ProductPart({ layer, explodeProgress, selected, anySelected, pcbFlipped, visible, onPick, onHover }: { layer: LayerDefinition; explodeProgress: number; selected: boolean; anySelected: boolean; pcbFlipped: boolean; visible: boolean; onPick: (id: LayerId) => void; onHover: (label: string | null) => void; }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (!group.current) return;
    const targetY = layer.baseY + (layer.offset - layer.baseY) * explodeProgress;
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 6.5, delta);
    const targetScale = selected ? 1.02 : 1.0;
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, targetScale, 7.0, delta));
  });

  if (!visible) return null;
  const opacity = (anySelected && !selected) ? 0.18 : 1.0;
  const matteBlack = selected ? "#1e2420" : "#111211";
  
  return (
    <group ref={group} onClick={(e) => { e.stopPropagation(); onPick(layer.id as LayerId); }} onPointerOver={(e) => { e.stopPropagation(); onHover(`${layer.code} · ${layer.label}`); }} onPointerOut={() => onHover(null)}>
      
      {/* 1. Display Glass */}
      {layer.id === "display_glass" && (
        <RoundedBox args={[W*2, 0.015, H*2]} radius={R} smoothness={8} castShadow receiveShadow>
          <meshPhysicalMaterial color="#050605" roughness={0.03} metalness={0.2} clearcoat={1.0} clearcoatRoughness={0.02} transparent opacity={opacity * 0.9} />
          {selected && <Edges color={SIGNAL} linewidth={1.5} />}
        </RoundedBox>
      )}

      {/* 2. Touch Panel */}
      {layer.id === "touch_panel" && (
        <RoundedBox args={[W*1.9, 0.005, H*1.9]} radius={R*0.9} smoothness={4}>
          <meshPhysicalMaterial color="#1a1e1c" roughness={0.15} metalness={0.05} transparent opacity={opacity * 0.3} />
          {selected && <Edges color={SIGNAL} linewidth={1.5} />}
        </RoundedBox>
      )}

      {/* 3. OLED Display */}
      {layer.id === "display" && (
        <group>
          <RoundedBox args={[W*1.85, 0.01, H*1.85]} radius={R*0.85} smoothness={4} castShadow>
            <meshStandardMaterial color="#050705" roughness={0.2} metalness={0.15} transparent opacity={opacity} />
          </RoundedBox>
          <mesh position={[0, 0.006, 0]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[W*1.6, H*1.6]} />
            <meshBasicMaterial color="#060806" transparent opacity={opacity} />
          </mesh>
          <Text position={[0, 0.007, -0.1]} rotation={[-Math.PI/2, 0, 0]} fontSize={0.05} color={SIGNAL} anchorX="center" anchorY="middle">♥ 73 BPM</Text>
          <Text position={[0, 0.007, 0.0]} rotation={[-Math.PI/2, 0, 0]} fontSize={0.025} color="#8ac4ff" anchorX="center" anchorY="middle">SpO₂ 98%</Text>
          <Text position={[0, 0.007, 0.1]} rotation={[-Math.PI/2, 0, 0]} fontSize={0.03} color={SIGNAL} anchorX="center" anchorY="middle">LOW RISK</Text>
        </group>
      )}

      {/* 4. Display Flex */}
      {layer.id === "display_flex" && (
        <mesh position={[0, 0, H*0.8]}>
          <boxGeometry args={[0.08, 0.002, 0.15]} />
          <meshStandardMaterial color="#b8842e" roughness={0.3} metalness={0.35} transparent opacity={opacity} />
        </mesh>
      )}

      {/* 5. Front Bezel */}
      {layer.id === "front_bezel" && (
        <group>
          <RoundedBox args={[W*2.05, 0.025, H*2.05]} radius={R*1.05} smoothness={8} castShadow receiveShadow>
            <meshStandardMaterial color={matteBlack} roughness={0.4} metalness={0.1} transparent opacity={opacity} />
            {selected && <Edges color={SIGNAL} linewidth={1.5} />}
          </RoundedBox>
          <RoundedBox args={[W*1.9, 0.03, H*1.9]} radius={R*0.9} smoothness={6} position={[0, 0.005, 0]}>
            <meshStandardMaterial color="#050605" transparent opacity={opacity} />
          </RoundedBox>
        </group>
      )}

      {/* 6. Crown & SOS */}
      {layer.id === "crown_sos" && (
        <group position={[W*1.02, 0, -0.05]}>
          <mesh rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.025, 0.025, 0.02, 20]} />
            <meshStandardMaterial color="#4a5050" roughness={0.3} metalness={0.8} transparent opacity={opacity} />
          </mesh>
          <mesh position={[0, 0, 0.1]} rotation={[0, 0, Math.PI/2]}>
            <boxGeometry args={[0.015, 0.015, 0.03]} />
            <meshStandardMaterial color="#8a3030" roughness={0.3} metalness={0.5} transparent opacity={opacity} />
          </mesh>
        </group>
      )}

      {/* 7. Crown Mechanism (Glucose Concept) */}
      {layer.id === "crown_mechanism" && (
        <group position={[W*0.9, 0, -0.05]}>
          <mesh><boxGeometry args={[0.04, 0.015, 0.02]} /><meshStandardMaterial color="#666" transparent opacity={opacity} /></mesh>
          <mesh position={[-0.015, 0, 0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.002, 0.002, 0.03, 8]} /><meshStandardMaterial color="#ccc" metalness={1} transparent opacity={opacity} /></mesh>
          <Text position={[0, 0.01, 0]} rotation={[-Math.PI/2,0,0]} fontSize={0.01} color="#FFB84A">NEEDLE MECH</Text>
        </group>
      )}

      {/* 8. Glucose Circuit */}
      {layer.id === "glucose_circuit" && (
        <group position={[W*0.6, 0, -0.05]}>
          <RoundedBox args={[0.06, 0.005, 0.05]} radius={0.005} smoothness={2}><meshStandardMaterial color="#1a221c" transparent opacity={opacity} /></RoundedBox>
          <ICPackage position={[0, 0.004, 0]} size={[0.03, 0.005, 0.03]} label="AFE" opacity={opacity} />
        </group>
      )}

      {/* 9. Main PCB */}
      {layer.id === "pcb" && (
        <group rotation={[pcbFlipped ? Math.PI : 0, 0, 0]}>
          <RoundedBox args={[W*1.8, 0.008, H*1.8]} radius={R*0.7} smoothness={6} castShadow>
            <meshStandardMaterial color="#0a0f0c" roughness={0.3} metalness={0.1} transparent opacity={opacity} />
            {selected && <Edges color={SIGNAL} linewidth={1.5} />}
          </RoundedBox>
          {/* ESP32 Module */}
          <group position={[0, 0.005, -0.05]}>
            <RoundedBox args={[0.12, 0.015, 0.12]} radius={0.005} smoothness={2}><meshStandardMaterial color="#a8b0ac" metalness={0.8} roughness={0.2} transparent opacity={opacity} /></RoundedBox>
            <Text position={[0, 0.008, 0]} rotation={[-Math.PI/2,0,0]} fontSize={0.015} color="#333">ESP32-S3</Text>
          </group>
          {/* Traces and components */}
          <SMDPassive position={[-0.1, 0.005, 0.1]} opacity={opacity} />
          <SMDPassive position={[0.1, 0.005, 0.1]} opacity={opacity} />
          {Array.from({length: 20}).map((_, i) => (
             <mesh key={i} position={[(Math.random()-0.5)*W*1.5, 0.004, (Math.random()-0.5)*H*1.5]}>
               <boxGeometry args={[0.01, 0.002, 0.01]} /><meshStandardMaterial color="#c4a84e" transparent opacity={opacity} />
             </mesh>
          ))}
        </group>
      )}

      {/* 10. PMIC */}
      {layer.id === "pmic" && (
        <group position={[-W*0.4, 0, 0.05]}>
          <ICPackage position={[0,0,0]} size={[0.06, 0.01, 0.06]} label="PMIC" opacity={opacity} />
        </group>
      )}

      {/* 11. MAX30102 PPG */}
      {layer.id === "max30102" && (
        <group position={[0, 0, 0.02]}>
          <ICPackage position={[0,0,0]} size={[0.04, 0.01, 0.04]} label="MAX30102" opacity={opacity} />
          <mesh position={[-0.01, 0.006, 0]}><cylinderGeometry args={[0.005,0.005,0.002,8]}/><meshBasicMaterial color="#2bf065" transparent opacity={opacity} /></mesh>
          <mesh position={[0.01, 0.006, 0]}><cylinderGeometry args={[0.005,0.005,0.002,8]}/><meshBasicMaterial color="#ff2e43" transparent opacity={opacity} /></mesh>
        </group>
      )}

      {/* 12. ECG AFE */}
      {layer.id === "ecg_afe" && (
        <group position={[W*0.4, 0, 0.02]}>
          <ICPackage position={[0,0,0]} size={[0.04, 0.01, 0.04]} label="AD8232" opacity={opacity} />
        </group>
      )}

      {/* 13. MPU6050 IMU */}
      {layer.id === "mpu6050" && (
        <group position={[-W*0.4, 0, -0.1]}>
          <ICPackage position={[0,0,0]} size={[0.03, 0.01, 0.03]} label="IMU" opacity={opacity} />
        </group>
      )}

      {/* 14. BME688 Env Sensor */}
      {layer.id === "bme688" && (
        <group position={[0, 0, -0.12]}>
          <ICPackage position={[0,0,0]} size={[0.03, 0.012, 0.03]} label="BME688" color="#a8b0ac" opacity={opacity} />
          <mesh position={[0.008, 0.007, 0]}><cylinderGeometry args={[0.003,0.003,0.002,8]}/><meshBasicMaterial color="#111" transparent opacity={opacity}/></mesh>
        </group>
      )}

      {/* 15. Thin Li-Po Battery */}
      {layer.id === "battery" && (
        <RoundedBox args={[W*1.5, 0.02, H*1.3]} radius={0.02} smoothness={4} castShadow>
          <meshStandardMaterial color="#c0c4c2" roughness={0.3} metalness={0.6} transparent opacity={opacity} />
          <Text position={[0, 0.011, 0]} rotation={[-Math.PI/2,0,0]} fontSize={0.02} color="#444">Li-Po 500mAh</Text>
          {selected && <Edges color={SIGNAL} linewidth={1.5} />}
        </RoundedBox>
      )}

      {/* 16. Motion/Audio */}
      {layer.id === "motion_alert" && (
        <group position={[0, 0, H*0.6]}>
          <mesh position={[-0.05, 0, 0]}><cylinderGeometry args={[0.03, 0.03, 0.015, 16]}/><meshStandardMaterial color="#aaa" metalness={0.8} transparent opacity={opacity}/></mesh>
          <mesh position={[0.05, 0, 0]}><cylinderGeometry args={[0.025, 0.025, 0.012, 16]}/><meshStandardMaterial color="#333" metalness={0.2} transparent opacity={opacity}/></mesh>
        </group>
      )}

      {/* 17. Inner Chassis */}
      {layer.id === "inner_chassis" && (
        <RoundedBox args={[W*1.95, 0.03, H*1.95]} radius={R*0.95} smoothness={6} castShadow>
          <meshStandardMaterial color="#222624" roughness={0.5} metalness={0.1} transparent opacity={opacity} />
          {selected && <Edges color={SIGNAL} linewidth={1.5} />}
        </RoundedBox>
      )}

      {/* 18. Rear Cover & Optical Window */}
      {layer.id === "bottom_cover" && (
        <group>
          <RoundedBox args={[W*2.05, 0.02, H*2.05]} radius={R*1.05} smoothness={8} castShadow>
            <meshStandardMaterial color={matteBlack} roughness={0.4} metalness={0.1} transparent opacity={opacity} />
            {selected && <Edges color={SIGNAL} linewidth={1.5} />}
          </RoundedBox>
          <mesh position={[0, -0.01, 0.02]}><boxGeometry args={[0.08, 0.005, 0.1]} /><meshPhysicalMaterial color="#050605" transparent opacity={opacity*0.8} clearcoat={1} /></mesh>
          <mesh position={[-0.08, -0.01, 0.08]}><boxGeometry args={[0.03, 0.006, 0.06]}/><meshStandardMaterial color="#ccc" metalness={0.9} transparent opacity={opacity} /></mesh>
          <mesh position={[0.08, -0.01, 0.08]}><boxGeometry args={[0.03, 0.006, 0.06]}/><meshStandardMaterial color="#ccc" metalness={0.9} transparent opacity={opacity} /></mesh>
        </group>
      )}

      {/* 19. Silicone Strap */}
      {layer.id === "strap" && (
        <group>
          {[-1, 1].map((side) => (
            <RoundedBox key={side} args={[0.18, 0.015, 0.6]} radius={0.02} smoothness={4} position={[0, 0, side * (H + 0.35)]} castShadow>
              <meshStandardMaterial color="#111211" roughness={0.7} metalness={0.0} transparent opacity={opacity} />
              {selected && <Edges color={SIGNAL} linewidth={1.5} />}
            </RoundedBox>
          ))}
        </group>
      )}
    </group>
  );
}

function CameraRig({ selectedId, explodeProgress, zoom, presetView, onResetPreset }: { selectedId: LayerId | null; explodeProgress: number; zoom: number; presetView: CameraViewPreset | null; onResetPreset: () => void; }) {
  const { camera } = useThree();
  const controls = useRef<any>(null);
  
  useFrame((_, delta) => {
    if (!controls.current) return;
    const layer = LAYERS.find(l => l.id === selectedId);
    let currentY = layer ? layer.baseY + (layer.offset - layer.baseY) * explodeProgress : 0;
    
    let targetPos = new THREE.Vector3();
    let lookTarget = new THREE.Vector3(0, currentY, 0);

    const zoomFactor = 1.0 - zoom * 0.4;
    
    if (presetView) {
      const dist = 1.5 * zoomFactor;
      switch (presetView) {
        case "front": targetPos.set(0, currentY, dist); break;
        case "back": targetPos.set(0, currentY, -dist); break;
        case "left": targetPos.set(-dist, currentY, 0); break;
        case "right": targetPos.set(dist, currentY, 0); break;
        case "top": targetPos.set(0, currentY + dist, 0.01); break;
        case "bottom": targetPos.set(0, currentY - dist, 0.01); break;
        case "iso": default: targetPos.set(1.2 * zoomFactor, 1.0 + currentY * 0.4, 1.8 * zoomFactor); break;
      }
    } else if (layer && selectedId) {
      targetPos.set(layer.cameraPos[0] * zoomFactor, layer.cameraPos[1] * zoomFactor, layer.cameraPos[2] * zoomFactor);
    } else {
      targetPos.set(1.2 * zoomFactor, 1.0 * zoomFactor, 1.8 * zoomFactor);
      lookTarget.set(0, 0, 0);
    }

    camera.position.lerp(targetPos, THREE.MathUtils.clamp(delta * 4, 0, 1));
    controls.current.target.lerp(lookTarget, THREE.MathUtils.clamp(delta * 4, 0, 1));
    controls.current.update();
  });

  return <OrbitControls ref={controls} enableDamping dampingFactor={0.08} minDistance={0.5} maxDistance={4.0} onStart={onResetPreset} makeDefault />;
}

export default function Home() {
  const [selectedId, setSelectedId] = useState<LayerId | null>("display");
  const [explodeProgress, setExplodeProgress] = useState(0.0);
  const [pcbFlipped, setPcbFlipped] = useState(false);
  const [presetView, setPresetView] = useState<CameraViewPreset | null>("iso");
  const [hovered, setHovered] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0.35);

  const selectedLayer = useMemo(() => LAYERS.find((l) => l.id === selectedId) ?? LAYERS[0], [selectedId]);

  return (
    <main className="vita-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-name">VITASHIELD</div>
          <div className="brand-sub">COMPACT ENGINEERING MODEL</div>
        </div>
      </header>

      <section className="workspace" style={{ display: 'flex', height: 'calc(100vh - 68px)' }}>
        <aside className="layer-rail" style={{ width: '300px', overflowY: 'auto', padding: '20px', borderRight: '1px solid #eee' }}>
          <div className="rail-heading"><span className="eyebrow">19-LAYER ASSEMBLY INDEX</span></div>
          <div className="layer-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
            {LAYERS.map((layer) => (
              <button
                key={layer.id}
                style={{ padding: '8px', textAlign: 'left', background: selectedId === layer.id ? '#eee' : 'transparent', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                onClick={() => { setSelectedId(layer.id as LayerId); if(explodeProgress < 0.2) setExplodeProgress(1.0); setPresetView(null); }}
              >
                <strong>{layer.code}</strong> {layer.label}
              </button>
            ))}
          </div>
        </aside>

        <section className="viewer-panel" style={{ flex: 1, position: 'relative' }}>
          <div className="viewer-stage" style={{ width: '100%', height: '100%' }}>
            {hovered && <div className="hover-tag" style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, background: '#fff', padding: '4px 8px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{hovered}</div>}
            
            <Canvas shadows camera={{ fov: 33 }} dpr={[1, 1.5]} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
              <color attach="background" args={["#f0f0ec"]} />
              <ambientLight intensity={0.8} />
              <directionalLight position={[2, 4, 3]} intensity={2.5} castShadow shadow-mapSize={[1024, 1024]} />
              <group rotation={[0.06, -0.2, 0.04]}>
                {LAYERS.map((layer) => (
                  <ProductPart key={layer.id} layer={layer} explodeProgress={explodeProgress} selected={selectedId === layer.id} anySelected={selectedId !== null} pcbFlipped={pcbFlipped} visible={true} onPick={(id) => setSelectedId(id)} onHover={setHovered} />
                ))}
              </group>
              <ContactShadows position={[0, -1.0, 0]} opacity={0.2} scale={3} blur={2} />
              <CameraRig selectedId={selectedId} explodeProgress={explodeProgress} zoom={zoom} presetView={presetView} onResetPreset={() => setPresetView(null)} />
            </Canvas>
          </div>

          <div className="viewer-controls" style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.9)', padding: '10px 20px', borderRadius: '8px', display: 'flex', gap: '20px', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div className="slider-cluster" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>EXPLODE</span>
              <input type="range" min="0" max="1" step="0.01" value={explodeProgress} onChange={(e) => setExplodeProgress(parseFloat(e.target.value))} />
              <span style={{ fontSize: '12px' }}>{Math.round(explodeProgress * 100)}%</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setPresetView("iso")} style={{ padding: '6px 12px', border: '1px solid #ccc', borderRadius: '4px', background: '#fff' }}>Reset View</button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
