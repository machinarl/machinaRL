import { EvolutionStage } from '@/types/sim';

export const evolutionStages: EvolutionStage[] = [
  {
    id: 'primitive',
    name: 'Primitive',
    description: 'Basic movement and simple task execution',
    requirements: [],
    abilities: ['basic_movement', 'simple_sensing'],
    bodies: ['basic_form'],
    order: 1,
  },
  {
    id: 'composite',
    name: 'Composite',
    description: 'Multi-part body coordination and basic manipulation',
    requirements: ['basic_movement', 'simple_sensing'],
    abilities: ['multi_part_coordination', 'basic_manipulation'],
    bodies: ['segmented_body', 'basic_appendages'],
    order: 2,
  },
  {
    id: 'limb_bearing',
    name: 'Limb-Bearing',
    description: 'Advanced manipulation capabilities and tool use',
    requirements: ['multi_part_coordination', 'basic_manipulation'],
    abilities: ['advanced_manipulation', 'tool_use', 'precision_grip'],
    bodies: ['articulated_limbs', 'precision_grippers'],
    order: 3,
  },
  {
    id: 'advanced_mechanica',
    name: 'Advanced Mechanica',
    description: 'Complex mechanical systems and engineering',
    requirements: ['advanced_manipulation', 'tool_use'],
    abilities: ['mechanical_engineering', 'complex_construction', 'system_optimization'],
    bodies: ['mechanical_joints', 'engineering_tools'],
    order: 4,
  },
  {
    id: 'winged_gliding',
    name: 'Winged/Gliding',
    description: 'Aerial capabilities and flight mechanics',
    requirements: ['mechanical_engineering', 'system_optimization'],
    abilities: ['aerial_navigation', 'flight_control', 'gliding'],
    bodies: ['wings', 'aerial_sensors', 'flight_surfaces'],
    order: 5,
  },
  {
    id: 'hybrid',
    name: 'Hybrid',
    description: 'Multi-modal locomotion and adaptive forms',
    requirements: ['aerial_navigation', 'flight_control'],
    abilities: ['multi_modal_locomotion', 'form_adaptation', 'environmental_specialization'],
    bodies: ['adaptive_limbs', 'multi_modal_sensors'],
    order: 6,
  },
  {
    id: 'ascendant',
    name: 'Ascendant',
    description: 'Transcendent capabilities and meta-cognition',
    requirements: ['multi_modal_locomotion', 'form_adaptation'],
    abilities: ['meta_cognition', 'transcendent_awareness', 'reality_manipulation'],
    bodies: ['transcendent_form', 'reality_sensors'],
    order: 7,
  },
];

export const abilities: Record<string, { name: string; description: string; category: string }> = {
  basic_movement: {
    name: 'Basic Movement',
    description: 'Fundamental locomotion capabilities',
    category: 'movement',
  },
  simple_sensing: {
    name: 'Simple Sensing',
    description: 'Basic environmental awareness',
    category: 'perception',
  },
  multi_part_coordination: {
    name: 'Multi-Part Coordination',
    description: 'Coordinate multiple body parts simultaneously',
    category: 'cognition',
  },
  basic_manipulation: {
    name: 'Basic Manipulation',
    description: 'Simple object interaction and handling',
    category: 'manipulation',
  },
  advanced_manipulation: {
    name: 'Advanced Manipulation',
    description: 'Complex object manipulation and fine motor control',
    category: 'manipulation',
  },
  tool_use: {
    name: 'Tool Use',
    description: 'Ability to use and create tools',
    category: 'cognition',
  },
  precision_grip: {
    name: 'Precision Grip',
    description: 'Fine motor control for delicate tasks',
    category: 'manipulation',
  },
  mechanical_engineering: {
    name: 'Mechanical Engineering',
    description: 'Understanding and creating mechanical systems',
    category: 'cognition',
  },
  complex_construction: {
    name: 'Complex Construction',
    description: 'Building sophisticated structures and mechanisms',
    category: 'manipulation',
  },
  system_optimization: {
    name: 'System Optimization',
    description: 'Improving and optimizing complex systems',
    category: 'cognition',
  },
  aerial_navigation: {
    name: 'Aerial Navigation',
    description: '3D navigation and flight control',
    category: 'movement',
  },
  flight_control: {
    name: 'Flight Control',
    description: 'Precise control of aerial movement',
    category: 'movement',
  },
  gliding: {
    name: 'Gliding',
    description: 'Efficient aerial movement without active flight',
    category: 'movement',
  },
  multi_modal_locomotion: {
    name: 'Multi-Modal Locomotion',
    description: 'Adaptive movement across different environments',
    category: 'movement',
  },
  form_adaptation: {
    name: 'Form Adaptation',
    description: 'Modifying body structure for different tasks',
    category: 'special',
  },
  environmental_specialization: {
    name: 'Environmental Specialization',
    description: 'Optimization for specific environmental conditions',
    category: 'special',
  },
  meta_cognition: {
    name: 'Meta-Cognition',
    description: 'Self-awareness and higher-order thinking',
    category: 'cognition',
  },
  transcendent_awareness: {
    name: 'Transcendent Awareness',
    description: 'Understanding beyond normal perception',
    category: 'perception',
  },
  reality_manipulation: {
    name: 'Reality Manipulation',
    description: 'Ability to modify fundamental aspects of reality',
    category: 'special',
  },
};

export const getEvolutionStage = (stageId: string): EvolutionStage | undefined => {
  return evolutionStages.find(stage => stage.id === stageId);
};

export const getNextEvolutionStage = (currentStage: string): EvolutionStage | undefined => {
  const current = getEvolutionStage(currentStage);
  if (!current) return undefined;
  
  return evolutionStages.find(stage => stage.order === current.order + 1);
};

export const canEvolveTo = (currentStage: string, targetStage: string): boolean => {
  const current = getEvolutionStage(currentStage);
  const target = getEvolutionStage(targetStage);
  
  if (!current || !target) return false;
  
  return target.order > current.order && 
         target.requirements.every(req => 
           current.abilities.includes(req) || 
           current.bodies.includes(req)
         );
};

export const getEvolutionProgress = (unlockedAbilities: string[]): {
  currentStage: EvolutionStage;
  nextStage: EvolutionStage | undefined;
  progress: number;
} => {
  // Find the highest stage the agent can achieve
  let currentStage = evolutionStages[0]; // Start with primitive
  
  for (const stage of evolutionStages) {
    if (stage.requirements.every(req => 
      unlockedAbilities.includes(req) || 
      currentStage.abilities.includes(req) ||
      currentStage.bodies.includes(req)
    )) {
      currentStage = stage;
    } else {
      break;
    }
  }
  
  const nextStage = getNextEvolutionStage(currentStage.id);
  const progress = nextStage ? 
    (unlockedAbilities.filter(ability => 
      nextStage.requirements.includes(ability)
    ).length / nextStage.requirements.length) * 100 : 100;
  
  return {
    currentStage,
    nextStage,
    progress: Math.min(progress, 100),
  };
};
