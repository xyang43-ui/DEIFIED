export interface ProjectMetadata {
  id: string;
  title: string;
  date: string;
  tool: string;
  status: string;
  type: string;
  description: string;
  refCode: string;
}

export const PROJECTS_DATABASE: Record<string, ProjectMetadata> = {
  'td_untitled': {
    id: 'td_untitled',
    refCode: 'PRC-001',
    title: 'TD_UNTITLED',
    date: '2025.11',
    tool: 'TouchDesigner',
    status: 'ARCHIVED',
    type: 'Node-Based System',
    description: 'An early exploration into node-based visual logic. This project serves as the foundational skeleton for subsequent interactive frameworks.'
  },
  'td_untitled2': {
    id: 'td_untitled2',
    refCode: 'PRC-002',
    title: 'TD_UNTITLED2',
    date: '2026.03',
    tool: 'TouchDesigner / MediaPipe',
    status: 'ACTIVE',
    type: 'Hand-Controlled Interface',
    description: 'A real-time, gesture-controlled musical instrument. The system uses MediaPipe hand tracking to allow a performer to "conduct" a Techno EDM track using two hands.'
  },
  'track_experiment_01': {
    id: 'track_experiment_01',
    refCode: 'EXP-001',
    title: 'TRACK_EXPERIMENT_01',
    date: '2025.12',
    tool: 'Ableton / AI-Sampling',
    status: 'COMPLETED',
    type: 'Audio Log',
    description: 'Initial tests in non-semantic vocal sampling. Focusing on the breakdown of language into pure rhythmic texture.'
  },
  'track_experiment_02': {
    id: 'track_experiment_02',
    refCode: 'EXP-002',
    title: 'TRACK_EXPERIMENT_02',
    date: '2026.01',
    tool: 'Ableton / AI-Sampling',
    status: 'COMPLETED',
    type: 'Audio Log',
    description: 'Continuation of vocal recontextualization experiments. Introducing recursive feedback loops into the processing chain.'
  },
  'tentacle': {
    id: 'tentacle',
    refCode: 'PRC-003',
    title: 'TENTACLE',
    date: '2026.01',
    tool: 'TouchDesigner / GLSL',
    status: 'ARCHIVED',
    type: 'Visual Generator',
    description: 'A generative visual system exploring organic movements through algorithmic constraints. Simulating bioluminescent-like behavior.'
  },
  'vocal_generator': {
    id: 'vocal_generator',
    refCode: 'GEN-001',
    title: 'VOCAL_GENERATOR',
    date: '2026.02',
    tool: 'Python / AI',
    status: 'STABLE',
    type: 'Generative Tool',
    description: 'A custom tool for synthesizing onomatopoeic vocal fragments. It serves as the primary asset source for the sound engine.'
  },
  'techno_generator': {
    id: 'techno_generator',
    refCode: 'GEN-002',
    title: 'TECHNO_GENERATOR',
    date: '2026.02',
    tool: 'TouchDesigner / MaxMSP',
    status: 'ACTIVE',
    type: 'Rhythmic Engine',
    description: 'An automated system for generating structured Techno sequences based on probability matrices.'
  },
  'key_switch': {
    id: 'key_switch',
    refCode: 'PRC-004',
    title: 'KEY_SWITCH',
    date: '2025.10',
    tool: 'Arduino / Hardware',
    status: 'PHYSICAL_PROTOTYPE',
    type: 'Physical Interface',
    description: 'A tangible interface for triggering digital state changes. Exploring the click as a definitive moment of "processing."'
  },
  'webmv': {
    id: 'webmv',
    refCode: 'PRC-005',
    title: 'WEBMV',
    date: '2026.02',
    tool: 'Vite / GLSL / React',
    status: 'EXPERIMENTAL',
    type: 'Web-Based Visualizer',
    description: 'A browser-based implementation of real-time visual processing. Testing the limits of web graphics for thesis dissemination.'
  },
  'led_party': {
    id: 'led_party',
    refCode: 'PRC-006',
    title: 'LED_PARTY',
    date: '2025.09',
    tool: 'DMX / TouchDesigner',
    status: 'INSTALLED',
    type: 'Light Installation',
    description: 'A synchronized light installation reacting to localized sound data. The first iteration of hardware-software integration in the thesis journey.'
  }
};
