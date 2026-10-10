export interface LayerDefinition {
  id: string;
  code: string;
  label: string;
  short: string;
  purpose: string;
  components: string[];
  whatItDoes: string;
  dataGenerated?: string;
  connectedToEsp32: string;
  roleInEdgeAi: string;
  roleInEmergency: string;
  measures?: string[];
  offset: number;
  baseY: number;
  cameraPos: [number, number, number];
  cameraTargetY: number;
  modelPath?: string;
  implementationStatus?: string;
}

export interface ComponentInspectionItem {
  id: string;
  name: string;
  layerId: string;
  side: "front" | "back" | "both";
  category: "Processing" | "Sensor" | "Power" | "Interface" | "Output" | "RF" | "Mechanical" | "Concept";
  purpose: string;
  whatItDoes: string;
  connectedToEsp32: string;
  roleInEdgeAi: string;
  roleInEmergency: string;
  dataGenerated?: string;
  position: [number, number, number];
  implementationStatus?: string;
  limitation?: string;
}

export interface PresentationDemo {
  id: string;
  label: string;
  short: string;
  targetLayer: LayerId;
  targetComponent?: string;
  scenario: ScenarioId;
  explodeLevel: number;
  description: string;
  accent: string;
}

export interface SignalPathStep {
  label: string;
  detail: string;
}

export interface SignalPath {
  id: string;
  name: string;
  color: string;
  steps: SignalPathStep[];
}

export const SIGNAL_PATHS: SignalPath[] = [
  {
    id: "physiological",
    name: "Physiological Monitoring Path",
    color: "#B7FF5A",
    steps: [
      { label: "PPG / ECG / IMU / BME688", detail: "Multi-modal sensor acquisition" },
      { label: "Sensor Preprocessing", detail: "Filtering, motion-artifact cancellation" },
      { label: "ESP32-S3", detail: "On-device TinyML inference" },
      { label: "Risk Assessment", detail: "Personal baseline + multi-factor fusion" },
      { label: "Local Risk Level", detail: "LOW / MOD / HIGH / CRIT classification" },
      { label: "Display / Vibration / Buzzer", detail: "Adaptive alert output" },
      { label: "Phone Connection", detail: "Optional caregiver alerts" },
    ],
  },
  {
    id: "glucose",
    name: "Glucose Measurement Path (CONCEPT)",
    color: "#FFB84A",
    steps: [
      { label: "Finger-prick Sample", detail: "Controlled lancet mechanism in crown" },
      { label: "Electrochemical Strip", detail: "Disposable test strip receives sample" },
      { label: "Glucose Sensing Circuit", detail: "Analogue measurement of strip response" },
      { label: "ESP32-S3", detail: "Digital conversion and display" },
      { label: "Displayed Result", detail: "Glucose reading on watch screen" },
    ],
  },
];

export const LAYERS: LayerDefinition[] = [
  {
    id: "display_glass",
    code: "01",
    label: "Protective Display Glass",
    short: "Glass",
    purpose: "Chemically strengthened cover glass protecting the display and touch sensor.",
    components: ["Chemically strengthened glass panel", "Oleophobic coating", "Anti-reflective layer"],
    whatItDoes: "Provides scratch and impact resistance while maintaining optical clarity.",
    connectedToEsp32: "N/A",
    roleInEdgeAi: "Maintains clean optical path for display readability.",
    roleInEmergency: "Protects display integrity during impacts.",
    offset: 3.6,
    baseY: 0.12,
    cameraPos: [1.2, 1.8, 2.0],
    cameraTargetY: 3.6,
  },
  {
    id: "touch_panel",
    code: "02",
    label: "Capacitive Touch Panel",
    short: "Touch",
    purpose: "Transparent capacitive touch sensor for user input.",
    components: ["ITO capacitive sensor grid", "Perimeter electrodes", "Touch controller flex"],
    whatItDoes: "Detects finger position and gestures.",
    connectedToEsp32: "I2C touch controller interface with interrupt line.",
    roleInEdgeAi: "Translates user touch input into interaction events.",
    roleInEmergency: "Enables 'ARE YOU OK?' confirmation.",
    offset: 3.2,
    baseY: 0.11,
    cameraPos: [1.2, 1.6, 1.9],
    cameraTargetY: 3.2,
  },
  {
    id: "display",
    code: "03",
    label: "OLED/AMOLED Display Module",
    short: "OLED",
    purpose: "Primary user interface showing health data and alerts.",
    components: ["AMOLED display substrate", "Display driver IC", "Display flex cable interface"],
    whatItDoes: "Renders real-time telemetry, vital trend curves, and hazard notifications.",
    dataGenerated: "Touch coordinate matrices, interaction events.",
    connectedToEsp32: "High-speed SPI/QSPI graphics bus.",
    roleInEdgeAi: "Translates AI inference into intuitive visual alerts.",
    roleInEmergency: "Displays 'ARE YOU OK?' prompt.",
    measures: ["Heart Rate", "SpO₂ estimation", "Environmental Risk", "Battery"],
    offset: 2.8,
    baseY: 0.10,
    cameraPos: [1.2, 1.5, 1.8],
    cameraTargetY: 2.8,
  },
  {
    id: "display_flex",
    code: "04",
    label: "Display Flex Cable",
    short: "Display FPC",
    purpose: "Flexible printed circuit connecting display module to main PCB.",
    components: ["Flexible polyimide substrate", "Fine-pitch copper traces", "Board connector interface"],
    whatItDoes: "Routes high-speed display data and touch signals.",
    connectedToEsp32: "SPI master peripheral pins.",
    roleInEdgeAi: "Streams AI assessment cards.",
    roleInEmergency: "Carries high-priority full-screen dialogues.",
    offset: 2.4,
    baseY: 0.08,
    cameraPos: [1.2, 1.3, 1.7],
    cameraTargetY: 2.4,
  },
  {
    id: "front_bezel",
    code: "05",
    label: "Front Bezel & Support Frame",
    short: "Bezel",
    purpose: "Structural frame securing display stack.",
    components: ["Slim bezel ring", "Display support lip", "Internal mounting surfaces"],
    whatItDoes: "Encapsulates the display stack and provides mounting.",
    connectedToEsp32: "N/A",
    roleInEdgeAi: "Maintains mechanical rigidity.",
    roleInEmergency: "Shields computing and battery components against impacts.",
    offset: 2.0,
    baseY: 0.06,
    cameraPos: [1.5, 1.2, 1.8],
    cameraTargetY: 2.0,
  },
  {
    id: "crown_sos",
    code: "06",
    label: "Digital Crown & SOS Button",
    short: "Crown & SOS",
    purpose: "Digital crown with integrated glucose-testing concept and SOS button.",
    components: ["Textured metallic digital crown", "SOS tactile button"],
    whatItDoes: "Provides rotary input and enables manual SOS activation.",
    connectedToEsp32: "Rotary encoder GPIO + SOS hardware interrupt.",
    roleInEdgeAi: "Provides human ground-truth feedback.",
    roleInEmergency: "Hold SOS for 3 seconds to trigger maximum-priority beacon.",
    offset: 1.6,
    baseY: 0.04,
    cameraPos: [1.8, 1.0, 1.5],
    cameraTargetY: 1.6,
  },
  {
    id: "crown_mechanism",
    code: "07",
    label: "Concealed Crown Sampling Mechanism",
    short: "Sampling Mech",
    purpose: "Conceptual spring-loaded lancet and strip guide hidden in the crown.",
    components: ["Internal sliding guide", "Spring-controlled mechanism", "Safety interlock", "Concealed needle"],
    whatItDoes: "Deploys a controlled finger-prick lancet for glucose testing when activated.",
    connectedToEsp32: "N/A (Mechanical)",
    roleInEdgeAi: "Enables physical blood sampling.",
    roleInEmergency: "N/A",
    implementationStatus: "CONCEPT",
    offset: 1.4,
    baseY: 0.03,
    cameraPos: [1.8, 0.9, 1.4],
    cameraTargetY: 1.4,
  },
  {
    id: "glucose_circuit",
    code: "08",
    label: "Integrated Glucose-Sensing Circuit",
    short: "Glucose Circuit",
    purpose: "Electrochemical measurement circuit for test strip reading.",
    components: ["Electrochemical test strip interface", "Glucose sensing analog circuit"],
    whatItDoes: "Reads electrical response from disposable strip.",
    dataGenerated: "Calculated glucose concentration.",
    connectedToEsp32: "SPI/ADC channel.",
    roleInEdgeAi: "Provides metabolic trend data.",
    roleInEmergency: "Enables field glucose monitoring.",
    implementationStatus: "CONCEPT",
    offset: 1.2,
    baseY: 0.02,
    cameraPos: [1.6, 0.8, 1.5],
    cameraTargetY: 1.2,
  },
  {
    id: "pcb",
    code: "09",
    label: "Custom ESP32-S3 Main PCB",
    short: "Main PCB",
    purpose: "Processing and power-routing backbone.",
    components: ["ESP32-S3 Main Controller", "2.4 GHz RF Antenna", "Test Pads"],
    whatItDoes: "Executes embedded firmware, coordinates TinyML inferencing.",
    dataGenerated: "Fused sensor packets, inference risk classifications.",
    connectedToEsp32: "Host SoC.",
    roleInEdgeAi: "Runs quantized neural networks.",
    roleInEmergency: "Controls alarms and broadcasts emergency packets.",
    offset: 0.8,
    baseY: 0.0,
    cameraPos: [1.2, 0.6, 1.6],
    cameraTargetY: 0.8,
  },
  {
    id: "pmic",
    code: "10",
    label: "Charging & Power Management",
    short: "Power Circuit",
    purpose: "Integrated buck-boost regulator and CC/CV lithium charger.",
    components: ["Power Management IC (PMIC)", "Battery Charging IC", "Inductors", "Passives"],
    whatItDoes: "Converts battery voltage to logic levels and controls charging.",
    connectedToEsp32: "I2C PMIC telemetry and fault interrupt.",
    roleInEdgeAi: "Modulates clock frequency to minimize AI idle energy.",
    roleInEmergency: "Protects logic circuits during rapid drain.",
    offset: 0.6,
    baseY: -0.01,
    cameraPos: [1.2, 0.5, 1.6],
    cameraTargetY: 0.6,
  },
  {
    id: "max30102",
    code: "11",
    label: "MAX30102 PPG Sensor",
    short: "PPG Sensor",
    purpose: "Integrated pulse oximetry and heart-rate sensor module.",
    components: ["MAX30102 IC", "LEDs (Green/Red/IR)", "Photodiode"],
    whatItDoes: "Emits optical wavelengths for PPG.",
    dataGenerated: "Raw PPG waveforms, calculated HR and SpO₂.",
    connectedToEsp32: "I2C bus.",
    roleInEdgeAi: "Supplies raw PPG waveforms.",
    roleInEmergency: "Detects acute cardiac events.",
    offset: 0.4,
    baseY: -0.02,
    cameraPos: [1.2, 0.4, 1.6],
    cameraTargetY: 0.4,
  },
  {
    id: "ecg_afe",
    code: "12",
    label: "ECG Analogue Front-End",
    short: "ECG AFE",
    purpose: "Differential bio-potential amplifier for single-lead ECG.",
    components: ["AD8232-class AFE", "Electrode contacts"],
    whatItDoes: "Amplifies microvolt cardiac signals.",
    dataGenerated: "Filtered single-lead ECG bio-potential series.",
    connectedToEsp32: "SPI / ADC channel.",
    roleInEdgeAi: "Supplies filtered ECG waveforms.",
    roleInEmergency: "Detects arrhythmias.",
    offset: 0.2,
    baseY: -0.03,
    cameraPos: [1.2, 0.3, 1.6],
    cameraTargetY: 0.2,
  },
  {
    id: "mpu6050",
    code: "13",
    label: "MPU6050 Motion Sensor",
    short: "IMU",
    purpose: "6-axis MEMS accelerometer and gyroscope.",
    components: ["MPU6050 IC"],
    whatItDoes: "Tracks spatial orientation and impacts.",
    dataGenerated: "Linear acceleration and angular velocity.",
    connectedToEsp32: "I2C/SPI bus.",
    roleInEdgeAi: "Feeds motion vectors into fall detection classifier.",
    roleInEmergency: "Arms 'ARE YOU OK?' countdown upon impact.",
    offset: 0.0,
    baseY: -0.04,
    cameraPos: [1.2, 0.2, 1.6],
    cameraTargetY: 0.0,
  },
  {
    id: "bme688",
    code: "14",
    label: "Fermion BME688 Environmental Sensor",
    short: "Env Sensor",
    purpose: "4-in-1 AI gas, temperature, humidity, and barometric pressure sensor.",
    components: ["BME688 sensor"],
    whatItDoes: "Measures ambient air conditions and scans VOCs.",
    dataGenerated: "Temp, Humidity, Pressure, VOC index.",
    connectedToEsp32: "I2C bus.",
    roleInEdgeAi: "Feeds ambient data into AI for heat-stress detection.",
    roleInEmergency: "Provides early warning for barometric drops and VOCs.",
    offset: -0.2,
    baseY: -0.05,
    cameraPos: [1.2, 0.1, 1.6],
    cameraTargetY: -0.2,
  },
  {
    id: "battery",
    code: "15",
    label: "Thin Li-Po Battery",
    short: "Battery",
    purpose: "Thin pouch-cell energy storage.",
    components: ["Li-Po pouch cell (500–800 mAh)", "Safety tab", "Connector"],
    whatItDoes: "Supplies 3.7V electrochemical energy within slim chassis.",
    dataGenerated: "Cell voltage, remaining capacity.",
    connectedToEsp32: "Direct to PMIC and ADC.",
    roleInEdgeAi: "Governs dynamic power scaling.",
    roleInEmergency: "Preserves reserve for emergency beacons.",
    offset: -0.6,
    baseY: -0.08,
    cameraPos: [1.4, -0.2, 1.8],
    cameraTargetY: -0.6,
  },
  {
    id: "motion_alert",
    code: "16",
    label: "Vibration Motor & Buzzer",
    short: "Haptics/Audio",
    purpose: "Haptic feedback motor and acoustic buzzer.",
    components: ["Coin vibration motor", "Piezoelectric buzzer", "Driver circuit"],
    whatItDoes: "Produces haptic patterns and acoustic tones.",
    dataGenerated: "Motor PWM duty, buzzer frequency.",
    connectedToEsp32: "PWM GPIO outputs.",
    roleInEdgeAi: "Provides adaptive tactile cues.",
    roleInEmergency: "Generates sirens and haptics.",
    offset: -1.0,
    baseY: -0.10,
    cameraPos: [1.4, -0.4, 1.8],
    cameraTargetY: -1.0,
  },
  {
    id: "inner_chassis",
    code: "17",
    label: "Inner Chassis & Mounting Features",
    short: "Chassis",
    purpose: "Internal structural frame holding components.",
    components: ["Main support frame", "Mounting bosses", "Screws", "Cable routing"],
    whatItDoes: "Provides structural integrity and alignment.",
    connectedToEsp32: "N/A",
    roleInEdgeAi: "Maintains thermal management.",
    roleInEmergency: "Shields electronics from impact.",
    offset: -1.4,
    baseY: -0.12,
    cameraPos: [1.5, -0.6, 2.0],
    cameraTargetY: -1.4,
  },
  {
    id: "bottom_cover",
    code: "18",
    label: "Rear Housing & Optical Window",
    short: "Rear Cover",
    purpose: "Wearer-facing housing with sensor windows.",
    components: ["Rear housing shell", "Optical sensor window", "ECG contact openings", "Air vent"],
    whatItDoes: "Positions optical window and exposes ECG electrodes.",
    connectedToEsp32: "N/A",
    roleInEdgeAi: "Maintains stable dermal contact.",
    roleInEmergency: "Ensures continuous skin contact.",
    offset: -1.8,
    baseY: -0.14,
    cameraPos: [1.5, -0.8, 2.0],
    cameraTargetY: -1.8,
  },
  {
    id: "strap",
    code: "19",
    label: "Silicone Strap & Attachment",
    short: "Strap",
    purpose: "Slim ergonomic retention system.",
    components: ["Black silicone strap", "Attachment lugs", "Stainless buckle"],
    whatItDoes: "Secures the watch comfortably.",
    connectedToEsp32: "N/A",
    roleInEdgeAi: "Reduces motion artifacts.",
    roleInEmergency: "Prevents detachment during impact.",
    offset: -2.4,
    baseY: -0.18,
    cameraPos: [1.8, -1.2, 2.4],
    cameraTargetY: -2.4,
  },
];

export const COMPONENTS_LIST: ComponentInspectionItem[] = [
  {
    id: "esp32_s3",
    name: "ESP32-S3 Main Controller",
    layerId: "pcb",
    side: "front",
    category: "Processing",
    purpose: "Dual-core Xtensa LX7 computing engine with vector instructions for edge AI inference.",
    whatItDoes: "Runs TinyML neural networks, executes signal preprocessing.",
    connectedToEsp32: "Host microprocessor.",
    roleInEdgeAi: "Executes quantized TensorFlow Lite models.",
    roleInEmergency: "Coordinates autonomous alerts.",
    dataGenerated: "Inference score (0-100), risk tier.",
    position: [0.0, 0.005, -0.05],
    implementationStatus: "Prototype component.",
  }
];

export const PRESENTATION_DEMOS: PresentationDemo[] = [
  {
    id: "glucose",
    label: "Glucose Test (Concept)",
    short: "Glucose",
    targetLayer: "crown_mechanism",
    scenario: "normal",
    explodeLevel: 0.8,
    description: "Proposed intermittent finger-prick glucose-testing concept integrated in the digital crown.",
    accent: "#FFB84A",
  },
];

export type LayerId = (typeof LAYERS)[number]["id"];
export type ScenarioId = "normal" | "heat" | "fall" | "offline";

export const SCENARIOS: Record<ScenarioId, { label: string; risk: string; copy: string; metrics: string[]; accent: string; }> = {
  normal: { label: "Normal Mode", risk: "LOW HEALTH RISK", copy: "Personal baseline and environmental context are aligned.", metrics: ["HR: 73 BPM", "SpO₂: 98%"], accent: "#B7FF5A" },
  heat: { label: "Heat Wave Mode", risk: "HIGH HEAT-STRESS RISK", copy: "BME688 detects elevated ambient temperature.", metrics: ["Temp: 39°C", "HR: 104 BPM"], accent: "#FFB84A" },
  fall: { label: "Fall Detected Mode", risk: "POSSIBLE FALL DETECTED", copy: "IMU detects impact.", metrics: ["Impact: 3.4g"], accent: "#FF7A66" },
  offline: { label: "Offline Disaster Mode", risk: "LOCAL MONITORING ACTIVE", copy: "No cellular connection.", metrics: ["Local AI Active"], accent: "#8C9AA4" },
};
