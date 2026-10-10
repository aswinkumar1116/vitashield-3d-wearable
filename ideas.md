# Vita Shield — Design Direction

## Three Initial Directions

### Theme Name: Monochrome Instrument Panel
Very Brief Intro: A Swiss-inspired clinical engineering interface built around white space, black typography, graphite product surfaces, and one restrained signal color. The page feels like a premium diagnostic instrument rather than a marketing site.
Probability: 0.07

### Theme Name: Quiet Laboratory
Very Brief Intro: A softer editorial direction with warm paper tones, large serif headings, fine line diagrams, and tactile material notes. It would make the prototype feel like a design-research artifact.
Probability: 0.03

### Theme Name: Signal in the Dark
Very Brief Intro: A high-contrast black field with electric lime telemetry accents, modular cards, and glowing data traces. It would make alerts and system behavior feel immediate and cinematic.
Probability: 0.08

## Selected Direction: Monochrome Instrument Panel

### Design Movement
Swiss International Style fused with contemporary industrial-design product visualization and clinical instrumentation graphics.

### Core Principles
1. The wearable is the hero: all surrounding UI supports inspection, not distraction.
2. White space, hard alignment, and typographic hierarchy create confidence; decoration stays subordinate.
3. Black, graphite, and warm-white surfaces carry the visual identity; a single signal green is reserved for live/healthy states.
4. Every interaction should explain construction or system behavior, never behave like a game gimmick.

### Color Philosophy
The interface is intentionally white-first because the product needs to read like a clear engineering specimen. Deep black typography gives the data a precise, legible voice, while graphite surfaces tie the interface back to the manufactured wearable. The signature green, `#B7FF5A`, is used only for live telemetry, active sensor paths, and safe/confirmed states so it retains semantic weight.

### Layout Paradigm
Use an asymmetric inspection bay rather than a centered marketing hero: a slim left rail for system identity and layer navigation, a dominant central 3D stage for the wearable, and a right-side information pane that changes with the selected layer. The bottom control strip acts as a technical console. On narrow screens, the rails collapse into stacked inspection sections without losing the stage.

### Signature Elements
- Numbered vertical layer rail with fine rules and a green active marker.
- Thin black engineering crosshair lines and coordinate ticks around the 3D stage.
- Small uppercase instrument labels paired with oversized, high-contrast metric numerals.

### Interaction Philosophy
Interactions feel like operating a lab instrument: click to inspect, drag to rotate, scroll to zoom, select a layer to bring it forward, and use reset to return to a known baseline. Motion is continuous and explainable. Focus states are visually explicit and keyboard access is preserved.

### Animation
Use spring-like transform interpolation for the assembly and camera, with no sudden teleporting. Keep UI transitions between 160–280ms, and make the exploded stack settle in a slightly longer 520ms motion. Hover effects should be quiet: a fine outline, a small lift, and a tooltip. Respect `prefers-reduced-motion` by removing non-essential rotation and transition effects.

### Typography System
Use `Space Grotesk` for interface labels, metrics, and technical headings because its geometry feels engineered without becoming futuristic. Pair it with `IBM Plex Mono` for coordinates, sensor IDs, units, and system metadata. Use `Space Grotesk` 700–800 for the main title, 600 for section heads, 500 for labels, and `IBM Plex Mono` at 10–12px for instrument readouts.

### Brand Essence
Vita Shield is an interactive engineering prototype for people evaluating safer, context-aware wearable monitoring; it is different because it makes the hardware architecture as inspectable as the interface. Personality: **precise, protective, quietly ambitious**.

### Brand Voice
Headlines are declarative and composed. CTAs are short, specific, and instrument-like. Microcopy explains the system without overpromising clinical certainty.

Example lines:
- “Inspect the signal path.”
- “Research prototype. Not a diagnostic device.”

### Wordmark & Logo
The mark is a compact shield cut by a single pulse notch, rendered as a bold black symbol with a small white negative-space cut. The wordmark is set in tracked uppercase Space Grotesk, aligned to the mark like a lab instrument badge rather than a consumer logo.

### Signature Brand Color
`#B7FF5A` — Vita Signal. A high-visibility chartreuse reserved for safe status, live telemetry, and the selected inspection path.

## Implementation Notes

- The first viewport must show the assembled wearable and make “click the watch to explode” obvious without using a generic hero block.
- The procedural 3D viewer is the functional source of truth; generated product renders are supporting reference imagery only.
- Product content must explicitly label estimated blood pressure as research/prototype only and must not suggest diagnosis.
- Scenario states include Normal, Heat Wave, Fall, and Offline; each updates the metrics and alert copy.
- The final responsive layout preserves the left rail / stage / right pane logic as long as space allows, then collapses in that order.

## Style Decisions

- White-first interface with black typography is the governing visual choice; the supplied product brief's dark UI suggestion is intentionally adapted to the user's explicit minimal direction.
- Use one signal color only, for active data and safe/confirmed states.
- Do not use purple gradients, neon cyberpunk glow, uniform rounded-card grids, or generic smartwatch imagery.
- Prefer visible construction details, thin rules, and asymmetrical composition over decorative dashboard chrome.
- Every source file that owns visual styling should begin with a short reminder comment about this direction.
