import fs from "node:fs";

const path = "/home/ubuntu/vita-shield/client/src/pages/Home.tsx";
let source = fs.readFileSync(path, "utf8");

function replaceBlock(id, nextId, body) {
  const startMarker = `      {layer.id === "${id}" && (`;
  const endMarker = nextId ? `      {layer.id === "${nextId}" && (` : "    </group>";
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);
  if (start < 0 || end < 0) throw new Error(`Could not locate ${id} block`);
  source = source.slice(0, start) + body + "\n\n" + source.slice(end);
}

replaceBlock("display", "enclosure", String.raw`      {layer.id === "display" && (
        <>
          <RoundedBox args={[1.82, 0.18, 2.48]} radius={0.32} smoothness={8} position={[0, 0.18, 0]} castShadow receiveShadow>
            <meshPhysicalMaterial color="#07100D" roughness={0.12} metalness={0.16} clearcoat={1} clearcoatRoughness={0.08} />
            {selected && <Edges color={SIGNAL} linewidth={1.8} />}
          </RoundedBox>
          <RoundedBox args={[1.6, 0.035, 2.22]} radius={0.27} smoothness={8} position={[0, 0.29, 0]}>
            <meshPhysicalMaterial color="#0B1712" roughness={0.08} metalness={0.1} clearcoat={1} clearcoatRoughness={0.06} />
          </RoundedBox>
          <mesh position={[-0.42, 0.315, -0.76]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.28, 0.035]} /><meshBasicMaterial color={SIGNAL} /></mesh>
          <mesh position={[-0.2, 0.315, -0.76]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.34, 0.022]} /><meshBasicMaterial color="#EAF2E8" /></mesh>
          <Text position={[-0.5, 0.32, -0.47]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.18} color="#F5F7F1" anchorX="left" anchorY="middle">10:24</Text>
          <Text position={[-0.5, 0.32, -0.16]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.13} color="#EF456C" anchorX="left" anchorY="middle">♥</Text>
          <Text position={[-0.22, 0.32, -0.16]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.075} color="#B5D4C0" anchorX="left" anchorY="middle">72 BPM</Text>
          <mesh position={[0, 0.315, 0.52]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.9, 0.026]} /><meshBasicMaterial color={SIGNAL} transparent opacity={0.9} /></mesh>
          <mesh position={[0.04, 0.315, 0.73]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.72, 0.016]} /><meshBasicMaterial color="#CFDED3" transparent opacity={0.72} /></mesh>
        </>
      )}`);

replaceBlock("enclosure", "pcb", String.raw`      {layer.id === "enclosure" && (
        <>
          <RoundedBox args={[2.08, 0.36, 2.72]} radius={0.43} smoothness={8} castShadow receiveShadow>
            <meshStandardMaterial color={shell} roughness={0.24} metalness={0.72} />
            {selected && <Edges color={SIGNAL} linewidth={1.6} />}
          </RoundedBox>
          <RoundedBox args={[1.82, 0.08, 2.48]} radius={0.34} smoothness={8} position={[0, 0.2, 0]}>
            <meshStandardMaterial color="#0D100E" roughness={0.24} metalness={0.74} />
          </RoundedBox>
          <mesh position={[1.09, 0.03, -0.12]} rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.13, 0.13, 0.22, 28]} /><meshStandardMaterial color={metal} roughness={0.18} metalness={0.9} /></mesh>
          <RoundedBox args={[0.22, 0.13, 0.68]} radius={0.08} smoothness={5} position={[1.08, -0.08, 0.48]} castShadow><meshStandardMaterial color="#303832" roughness={0.24} metalness={0.76} /></RoundedBox>
          <mesh position={[0, 0.01, -1.38]}><boxGeometry args={[0.46, 0.13, 0.16]} /><meshStandardMaterial color="#080A09" roughness={0.2} metalness={0.8} /></mesh>
          {[-0.16, 0, 0.16].map((x) => <mesh key={x} position={[x, 0.085, -1.45]}><boxGeometry args={[0.025, 0.03, 0.07]} /><meshStandardMaterial color="#8D9D90" metalness={0.82} /></mesh>)}
        </>
      )}`);

replaceBlock("bottom", "strap", String.raw`      {layer.id === "bottom" && (
        <>
          <RoundedBox args={[2.08, 0.3, 2.72]} radius={0.43} smoothness={8} castShadow receiveShadow>
            <meshStandardMaterial color={shell} roughness={0.3} metalness={0.58} />
            {selected && <Edges color={SIGNAL} linewidth={1.6} />}
          </RoundedBox>
          <RoundedBox args={[1.18, 0.05, 0.82]} radius={0.18} smoothness={6} position={[0, 0.19, 0.32]}>
            <meshStandardMaterial color="#07100B" roughness={0.16} metalness={0.5} />
          </RoundedBox>
          <mesh position={[-0.3, 0.24, 0.32]}><cylinderGeometry args={[0.14, 0.14, 0.08, 32]} /><meshStandardMaterial color="#2DDE58" emissive="#2DDE58" emissiveIntensity={0.85} /></mesh>
          <mesh position={[0.02, 0.24, 0.32]}><cylinderGeometry args={[0.12, 0.12, 0.08, 32]} /><meshStandardMaterial color="#E23E50" emissive="#E23E50" emissiveIntensity={0.68} /></mesh>
          <mesh position={[0.34, 0.24, 0.32]}><cylinderGeometry args={[0.09, 0.09, 0.08, 32]} /><meshStandardMaterial color="#7DBFD7" emissive="#7DBFD7" emissiveIntensity={0.5} /></mesh>
          <mesh position={[0, 0.2, -0.2]}><cylinderGeometry args={[0.34, 0.34, 0.06, 40]} /><meshStandardMaterial color="#2A322C" roughness={0.2} metalness={0.76} /></mesh>
          <mesh position={[0, 0.24, -0.2]}><cylinderGeometry args={[0.18, 0.18, 0.07, 40]} /><meshStandardMaterial color="#A3B0A4" roughness={0.18} metalness={0.45} /></mesh>
          <mesh position={[0, 0.28, -1.38]}><boxGeometry args={[0.46, 0.08, 0.08]} /><meshStandardMaterial color="#101311" roughness={0.18} metalness={0.8} /></mesh>
        </>
      )}`);

replaceBlock("strap", null, String.raw`      {layer.id === "strap" && (
        <>
          {[-1, 1].flatMap((side) => [1.96, 2.58, 3.16, 3.68].map((distance, index) => ({ side, distance, index }))).map(({ side, distance, index }) => (
            <RoundedBox key={side + distance} args={[0.92 - index * 0.08, 0.2, 0.62 - index * 0.03]} radius={0.2} smoothness={7} position={[0, -0.02, side * distance]} rotation={[0, side * 0.055, 0]} castShadow>
              <meshStandardMaterial color="#1B1D1A" roughness={0.48} metalness={0.1} />
              {selected && <Edges color={SIGNAL} linewidth={1.2} />}
            </RoundedBox>
          ))}
          <RoundedBox args={[0.88, 0.22, 0.36]} radius={0.12} smoothness={6} position={[0, 0, -1.72]} castShadow><meshStandardMaterial color="#242823" roughness={0.45} metalness={0.1} /></RoundedBox>
          <RoundedBox args={[0.88, 0.22, 0.36]} radius={0.12} smoothness={6} position={[0, 0, 1.72]} castShadow><meshStandardMaterial color="#242823" roughness={0.45} metalness={0.1} /></RoundedBox>
          {[-3.48, -3.14, -2.8, -2.46, 2.46, 2.8, 3.14, 3.48].map((z) => <mesh key={z} position={[0, 0.14, z]} rotation={[Math.PI / 2, 0, 0]}><boxGeometry args={[0.28, 0.06, 0.14]} /><meshStandardMaterial color="#050605" roughness={0.56} metalness={0.06} /></mesh>)}
        </>
      )}`);

fs.writeFileSync(path, source);
console.log("Matched the external wearable form to the uploaded CAD watch reference.");
