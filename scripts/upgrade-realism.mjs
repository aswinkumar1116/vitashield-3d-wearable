import fs from "node:fs";

const path = "/home/ubuntu/vita-shield/client/src/pages/Home.tsx";
const source = fs.readFileSync(path, "utf8");
const start = source.indexOf("function ProductPart(");
const end = source.indexOf("function CameraFocus(");
if (start < 0 || end < 0) throw new Error("ProductPart boundaries not found");

const replacement = String.raw`function ProductPart({
  layer,
  exploded,
  selected,
  onPick,
  onHover,
}: {
  layer: (typeof LAYERS)[number];
  exploded: boolean;
  selected: boolean;
  onPick: (id: LayerId) => void;
  onHover: (label: string | null) => void;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetY = exploded ? layer.offset : 0;
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 5.2, delta);
    const targetScale = selected ? 1.055 : 1;
    const nextScale = THREE.MathUtils.damp(group.current.scale.x, targetScale, 7, delta);
    group.current.scale.setScalar(nextScale);
  });

  const shell = selected ? "#D7FFB7" : "#171817";
  const board = selected ? "#6B9A65" : "#14271E";
  const darkGlass = "#06110D";
  const metal = selected ? "#B4CDAF" : "#566059";
  const handlePick = (event: any) => {
    event.stopPropagation();
    onPick(layer.id);
  };

  return (
    <group
      ref={group}
      onClick={handlePick}
      onPointerOver={(event) => {
        event.stopPropagation();
        onHover(layer.label);
      }}
      onPointerOut={() => onHover(null)}
    >
      {layer.id === "display" && (
        <>
          <RoundedBox args={[1.9, 0.28, 2.72]} radius={0.38} smoothness={7} castShadow receiveShadow>
            <meshPhysicalMaterial color="#080908" roughness={0.16} metalness={0.3} clearcoat={1} clearcoatRoughness={0.1} />
            {selected && <Edges color={SIGNAL} linewidth={1.8} />}
          </RoundedBox>
          <RoundedBox args={[1.57, 0.045, 2.36]} radius={0.28} smoothness={7} position={[0, 0.17, 0]}>
            <meshPhysicalMaterial color={darkGlass} roughness={0.14} metalness={0.12} clearcoat={1} clearcoatRoughness={0.14} />
          </RoundedBox>
          <mesh position={[-0.42, 0.205, -0.85]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.28, 0.04]} /><meshBasicMaterial color={SIGNAL} /></mesh>
          <mesh position={[-0.18, 0.205, -0.85]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.35, 0.025]} /><meshBasicMaterial color="#EAF2E8" /></mesh>
          <Text position={[-0.52, 0.21, -0.56]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.18} color="#F5F7F1" anchorX="left" anchorY="middle">10:24</Text>
          <Text position={[-0.52, 0.21, -0.25]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.13} color="#EF456C" anchorX="left" anchorY="middle">♥</Text>
          <Text position={[-0.25, 0.21, -0.25]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.075} color="#B5D4C0" anchorX="left" anchorY="middle">72 BPM</Text>
          <mesh position={[0, 0.205, 0.52]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.94, 0.026]} /><meshBasicMaterial color={SIGNAL} transparent opacity={0.9} /></mesh>
          <mesh position={[0.05, 0.205, 0.74]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.72, 0.016]} /><meshBasicMaterial color="#CFDED3" transparent opacity={0.72} /></mesh>
          <mesh position={[0.04, 0.205, 0.94]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.58, 0.014]} /><meshBasicMaterial color="#6C9682" transparent opacity={0.74} /></mesh>
        </>
      )}

      {layer.id === "enclosure" && (
        <>
          <RoundedBox args={[2.04, 0.34, 2.86]} radius={0.42} smoothness={7} castShadow receiveShadow>
            <meshStandardMaterial color={shell} roughness={0.26} metalness={0.7} />
            {selected && <Edges color={SIGNAL} linewidth={1.55} />}
          </RoundedBox>
          <mesh position={[1.07, 0.02, 0.16]} rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.12, 0.12, 0.22, 24]} /><meshStandardMaterial color={metal} roughness={0.2} metalness={0.86} /></mesh>
          <mesh position={[1.04, -0.05, -0.25]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.055, 0.055, 0.08, 20]} /><meshStandardMaterial color="#9AA99B" roughness={0.22} metalness={0.8} /></mesh>
          <RoundedBox args={[0.44, 0.18, 0.17]} radius={0.05} smoothness={3} position={[0, 0.02, -1.42]}><meshStandardMaterial color="#080A09" roughness={0.24} metalness={0.72} /></RoundedBox>
          {[-0.17, 0, 0.17].map((x) => <mesh key={x} position={[x, 0.12, -1.49]}><boxGeometry args={[0.025, 0.03, 0.08]} /><meshStandardMaterial color="#6D7B6D" metalness={0.8} /></mesh>)}
        </>
      )}

      {layer.id === "pcb" && (
        <>
          <RoundedBox args={[1.58, 0.17, 2.3]} radius={0.15} smoothness={4} castShadow receiveShadow>
            <meshStandardMaterial color={board} roughness={0.38} metalness={0.3} />
            {selected && <Edges color={SIGNAL} linewidth={1.45} />}
          </RoundedBox>
          {[-0.6, 0.6].flatMap((x) => [-0.94, 0.94].map((z) => x + "_" + z)).map((key) => { const [x, z] = key.split("_").map(Number); return <mesh key={key} position={[x, 0.16, z]}><cylinderGeometry args={[0.09, 0.09, 0.06, 20]} /><meshStandardMaterial color="#C49139" roughness={0.24} metalness={0.68} /></mesh>; })}
          <mesh position={[0.06, 0.25, 0.03]} castShadow><boxGeometry args={[0.63, 0.2, 0.68]} /><meshStandardMaterial color="#1C211E" roughness={0.21} metalness={0.68} /></mesh>
          <Text position={[0.06, 0.36, 0.04]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.065} color="#A8B6A8" anchorX="center" anchorY="middle">ESP32-S3</Text>
          <RoundedBox args={[0.46, 0.22, 0.33]} radius={0.04} smoothness={3} position={[-0.43, 0.25, -0.72]} castShadow><meshStandardMaterial color="#879A8A" roughness={0.24} metalness={0.6} /></RoundedBox>
          <Text position={[-0.43, 0.38, -0.72]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.045} color="#162119" anchorX="center" anchorY="middle">BME688</Text>
          <RoundedBox args={[0.48, 0.24, 0.2]} radius={0.045} smoothness={3} position={[0, 0.27, -1.13]} castShadow><meshStandardMaterial color="#A7B0A7" roughness={0.2} metalness={0.82} /></RoundedBox>
          <mesh position={[0.52, 0.25, 0.55]}><boxGeometry args={[0.34, 0.18, 0.4]} /><meshStandardMaterial color="#AAB8A9" roughness={0.27} metalness={0.44} /></mesh>
          <mesh position={[-0.43, 0.22, 0.64]}><boxGeometry args={[0.4, 0.1, 0.23]} /><meshStandardMaterial color="#262D27" roughness={0.3} metalness={0.58} /></mesh>
          {[-0.53, -0.25, 0.27, 0.53].map((x) => <mesh key={x} position={[x, 0.21, -0.42]}><boxGeometry args={[0.1, 0.06, 0.08]} /><meshStandardMaterial color="#D2DDCF" roughness={0.24} metalness={0.55} /></mesh>)}
          {[-0.45, -0.12, 0.2, 0.48].map((x) => <mesh key={x} position={[x, 0.19, 0.92]}><boxGeometry args={[0.12, 0.025, 0.018]} /><meshStandardMaterial color="#B98539" roughness={0.25} metalness={0.62} /></mesh>)}
          <mesh position={[0.58, 0.21, -0.03]}><boxGeometry args={[0.18, 0.06, 0.18]} /><meshStandardMaterial color={SIGNAL} emissive={SIGNAL} emissiveIntensity={0.48} /></mesh>
        </>
      )}

      {layer.id === "health" && (
        <>
          <RoundedBox args={[1.24, 0.15, 0.94]} radius={0.12} smoothness={3} castShadow><meshStandardMaterial color={board} roughness={0.36} metalness={0.32} />{selected && <Edges color={SIGNAL} linewidth={1.3} />}</RoundedBox>
          <mesh position={[-0.36, 0.19, -0.08]}><cylinderGeometry args={[0.15, 0.15, 0.1, 32]} /><meshStandardMaterial color="#39E05D" emissive="#39E05D" emissiveIntensity={0.85} /></mesh>
          <mesh position={[0, 0.19, -0.08]}><cylinderGeometry args={[0.15, 0.15, 0.1, 32]} /><meshStandardMaterial color="#E34552" emissive="#E34552" emissiveIntensity={0.65} /></mesh>
          <mesh position={[0.36, 0.19, -0.08]}><cylinderGeometry args={[0.15, 0.15, 0.1, 32]} /><meshStandardMaterial color="#B93AEE" emissive="#B93AEE" emissiveIntensity={0.56} /></mesh>
          <mesh position={[0, 0.2, 0.3]}><boxGeometry args={[0.34, 0.1, 0.24]} /><meshStandardMaterial color="#D4DDD4" roughness={0.26} metalness={0.2} /></mesh>
          <mesh position={[0, 0.2, 0.58]}><boxGeometry args={[0.52, 0.08, 0.08]} /><meshStandardMaterial color="#B98539" roughness={0.26} metalness={0.62} /></mesh>
        </>
      )}

      {layer.id === "environment" && (
        <>
          <RoundedBox args={[1.12, 0.15, 0.76]} radius={0.1} smoothness={3} castShadow><meshStandardMaterial color={board} roughness={0.38} metalness={0.3} />{selected && <Edges color={SIGNAL} linewidth={1.3} />}</RoundedBox>
          <RoundedBox args={[0.42, 0.23, 0.34]} radius={0.05} smoothness={3} position={[-0.25, 0.22, 0]} castShadow><meshStandardMaterial color="#849987" roughness={0.2} metalness={0.72} /></RoundedBox>
          <Text position={[-0.25, 0.36, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.05} color="#1B2C20" anchorX="center" anchorY="middle">BME688</Text>
          <mesh position={[0.3, 0.21, 0]}><boxGeometry args={[0.3, 0.12, 0.28]} /><meshStandardMaterial color="#141A15" roughness={0.28} metalness={0.55} /></mesh>
          {[-0.4, -0.13, 0.14, 0.41].map((x) => <mesh key={x} position={[x, 0.2, 0.3]}><boxGeometry args={[0.09, 0.05, 0.07]} /><meshStandardMaterial color="#C6D3C6" roughness={0.26} metalness={0.4} /></mesh>)}
        </>
      )}

      {layer.id === "alert" && (
        <>
          <mesh position={[-0.34, 0.2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.25, 0.25, 0.22, 32]} /><meshStandardMaterial color="#AAB3A9" roughness={0.22} metalness={0.76} /></mesh>
          <mesh position={[0.3, 0.2, 0]} castShadow><cylinderGeometry args={[0.22, 0.16, 0.24, 32]} /><meshStandardMaterial color="#5E6D61" roughness={0.24} metalness={0.78} /></mesh>
          <mesh position={[0, 0.21, 0.3]}><boxGeometry args={[0.2, 0.1, 0.18]} /><meshStandardMaterial color="#D7E4D4" roughness={0.22} metalness={0.35} /></mesh>
          <mesh position={[0, 0.21, -0.3]}><boxGeometry args={[0.38, 0.08, 0.05]} /><meshStandardMaterial color="#B98539" metalness={0.6} /></mesh>
        </>
      )}

      {layer.id === "battery" && (
        <>
          <RoundedBox args={[1.38, 0.24, 1.7]} radius={0.17} smoothness={5} castShadow><meshStandardMaterial color={selected ? "#E0E8DD" : "#BFC6BE"} roughness={0.23} metalness={0.52} />{selected && <Edges color={SIGNAL} linewidth={1.5} />}</RoundedBox>
          <mesh position={[0.56, 0.15, -0.72]}><boxGeometry args={[0.2, 0.055, 0.13]} /><meshStandardMaterial color="#B98934" roughness={0.22} metalness={0.62} /></mesh>
          <Text position={[-0.36, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.09} color="#273228" anchorX="left" anchorY="middle">3.7V Li-Po</Text>
        </>
      )}

      {layer.id === "bottom" && (
        <>
          <RoundedBox args={[2.04, 0.28, 2.86]} radius={0.42} smoothness={7} castShadow receiveShadow><meshStandardMaterial color={shell} roughness={0.32} metalness={0.56} />{selected && <Edges color={SIGNAL} linewidth={1.55} />}</RoundedBox>
          <RoundedBox args={[1.24, 0.045, 0.86]} radius={0.17} smoothness={5} position={[0, 0.18, 0.34]}><meshStandardMaterial color="#07100B" roughness={0.18} metalness={0.5} /></RoundedBox>
          <mesh position={[-0.31, 0.23, 0.34]}><cylinderGeometry args={[0.14, 0.14, 0.08, 32]} /><meshStandardMaterial color="#29D653" emissive="#29D653" emissiveIntensity={0.82} /></mesh>
          <mesh position={[0.02, 0.23, 0.34]}><cylinderGeometry args={[0.12, 0.12, 0.08, 32]} /><meshStandardMaterial color="#E13E4E" emissive="#E13E4E" emissiveIntensity={0.68} /></mesh>
          <mesh position={[0.34, 0.23, 0.34]}><cylinderGeometry args={[0.09, 0.09, 0.08, 32]} /><meshStandardMaterial color="#78BFD8" emissive="#78BFD8" emissiveIntensity={0.5} /></mesh>
          <mesh position={[0, 0.17, -1.44]}><boxGeometry args={[0.46, 0.1, 0.08]} /><meshStandardMaterial color="#111311" roughness={0.2} metalness={0.72} /></mesh>
        </>
      )}

      {layer.id === "strap" && (
        <>
          {[-1, 1].flatMap((side) => [2.05, 2.72, 3.39].map((distance, index) => ({ side, distance, index }))).map(({ side, distance, index }) => (
            <RoundedBox key={side + distance} args={[0.92 - index * 0.07, 0.18, 0.7]} radius={0.2} smoothness={5} position={[0, -0.01, side * distance]} rotation={[0, side * 0.035, 0]} castShadow>
              <meshStandardMaterial color="#1B1D1A" roughness={0.52} metalness={0.1} />
              {selected && <Edges color={SIGNAL} linewidth={1.15} />}
            </RoundedBox>
          ))}
          {[-3.13, -2.78, -2.43, 2.43, 2.78, 3.13].map((z) => <mesh key={z} position={[0, 0.13, z]} rotation={[Math.PI / 2, 0, 0]}><boxGeometry args={[0.28, 0.06, 0.14]} /><meshStandardMaterial color="#050605" roughness={0.56} metalness={0.06} /></mesh>)}
        </>
      )}
    </group>
  );
}

`;

fs.writeFileSync(path, source.slice(0, start) + replacement + source.slice(end));
console.log("Upgraded smartwatch and PCB geometry with raised realistic components.");
