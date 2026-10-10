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
          <RoundedBox args={[1.84, 0.2, 2.5]} radius={0.34} smoothness={8} position={[0, 0.46, 0]} castShadow receiveShadow>
            <meshPhysicalMaterial color="#050806" roughness={0.12} metalness={0.16} clearcoat={1} clearcoatRoughness={0.06} />
            {selected && <Edges color={SIGNAL} linewidth={1.8} />}
          </RoundedBox>
          <RoundedBox args={[1.6, 0.035, 2.22]} radius={0.28} smoothness={8} position={[0, 0.58, 0]}>
            <meshPhysicalMaterial color="#07150F" roughness={0.08} metalness={0.08} clearcoat={1} clearcoatRoughness={0.05} />
          </RoundedBox>
          <mesh position={[-0.42, 0.61, -0.78]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.3, 0.035]} /><meshBasicMaterial color={SIGNAL} /></mesh>
          <mesh position={[-0.18, 0.61, -0.78]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.34, 0.022]} /><meshBasicMaterial color="#EAF2E8" /></mesh>
          <Text position={[-0.5, 0.62, -0.47]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.19} color="#F5F7F1" anchorX="left" anchorY="middle">10:24</Text>
          <Text position={[-0.5, 0.62, -0.16]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.14} color="#EF456C" anchorX="left" anchorY="middle">♥</Text>
          <Text position={[-0.25, 0.62, -0.16]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.08} color="#B5D4C0" anchorX="left" anchorY="middle">72 BPM</Text>
          <Text position={[0.42, 0.62, -0.78]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.065} color="#B5D4C0" anchorX="right" anchorY="middle">TUE 08 SEP</Text>
          <mesh position={[0, 0.615, 0.45]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.92, 0.026]} /><meshBasicMaterial color={SIGNAL} transparent opacity={0.9} /></mesh>
          <mesh position={[0.05, 0.615, 0.68]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.74, 0.016]} /><meshBasicMaterial color="#CFDED3" transparent opacity={0.72} /></mesh>
          <Text position={[0, 0.62, 0.94]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.075} color="#C7D8CA" anchorX="center" anchorY="middle">ARE YOU OK?</Text>
        </>
      )}`);

replaceBlock("strap", null, String.raw`      {layer.id === "strap" && (
        <>
          {[-1, 1].map((side) => (
            <RoundedBox key={side} args={[0.84, 0.16, 3.02]} radius={0.24} smoothness={7} position={[0, -0.04, side * 2.55]} rotation={[0, side * 0.02, 0]} castShadow>
              <meshStandardMaterial color="#171A17" roughness={0.52} metalness={0.08} />
              {selected && <Edges color={SIGNAL} linewidth={1.15} />}
            </RoundedBox>
          ))}
          {[-3.62, -3.28, -2.94, -2.6, 2.6, 2.94, 3.28, 3.62].map((z) => <mesh key={z} position={[0, 0.07, z]} rotation={[Math.PI / 2, 0, 0]}><boxGeometry args={[0.25, 0.045, 0.16]} /><meshStandardMaterial color="#050605" roughness={0.6} metalness={0.04} /></mesh>)}
          <RoundedBox args={[0.86, 0.18, 0.38]} radius={0.13} smoothness={6} position={[0, -0.02, -1.78]} castShadow><meshStandardMaterial color="#20241F" roughness={0.48} metalness={0.08} /></RoundedBox>
          <RoundedBox args={[0.86, 0.18, 0.38]} radius={0.13} smoothness={6} position={[0, -0.02, 1.78]} castShadow><meshStandardMaterial color="#20241F" roughness={0.48} metalness={0.08} /></RoundedBox>
        </>
      )}`);

fs.writeFileSync(path, source);
console.log("Refined the front smartwatch display and flattened the strap geometry.");
