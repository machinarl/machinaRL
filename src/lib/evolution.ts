import { EvolutionStage } from '@/types/sim';
import { evolutionStages, getEvolutionProgress } from '@/data/evolution';

export function computeEvolution(
  prevStage: string,
  newlyUnlocked: string[]
): string {
  const progress = getEvolutionProgress(newlyUnlocked);
  return progress.currentStage.id;
}

export function getEvolutionStageInfo(stageId: string): EvolutionStage | undefined {
  return evolutionStages.find(stage => stage.id === stageId);
}

export function getEvolutionLadder(): EvolutionStage[] {
  return evolutionStages.sort((a, b) => a.order - b.order);
}

export function getEvolutionRequirements(stageId: string): string[] {
  const stage = getEvolutionStageInfo(stageId);
  return stage?.requirements || [];
}

export function getEvolutionAbilities(stageId: string): string[] {
  const stage = getEvolutionStageInfo(stageId);
  return stage?.abilities || [];
}

export function getEvolutionBodies(stageId: string): string[] {
  const stage = getEvolutionStageInfo(stageId);
  return stage?.bodies || [];
}

export function canEvolveToStage(
  currentStage: string,
  targetStage: string,
  unlockedAbilities: string[]
): boolean {
  const current = getEvolutionStageInfo(currentStage);
  const target = getEvolutionStageInfo(targetStage);
  
  if (!current || !target) return false;
  
  // Check if target stage is higher than current
  if (target.order <= current.order) return false;
  
  // Check if all requirements are met
  return target.requirements.every(req => 
    unlockedAbilities.includes(req) || 
    current.abilities.includes(req) ||
    current.bodies.includes(req)
  );
}

export function getEvolutionPath(currentStage: string): EvolutionStage[] {
  const current = getEvolutionStageInfo(currentStage);
  if (!current) return [];
  
  return evolutionStages
    .filter(stage => stage.order > current.order)
    .sort((a, b) => a.order - b.order);
}

export function calculateEvolutionScore(abilities: string[]): number {
  const progress = getEvolutionProgress(abilities);
  return progress.currentStage.order * 100 + progress.progress;
}

export function getEvolutionMilestones(): Array<{
  stage: EvolutionStage;
  description: string;
  requirements: string[];
}> {
  return evolutionStages.map(stage => ({
    stage,
    description: `Reach ${stage.name} stage`,
    requirements: stage.requirements,
  }));
}

export function getAbilityCategory(abilityId: string): string {
  const categories: Record<string, string> = {
    basic_movement: 'movement',
    simple_sensing: 'perception',
    multi_part_coordination: 'cognition',
    basic_manipulation: 'manipulation',
    advanced_manipulation: 'manipulation',
    tool_use: 'cognition',
    precision_grip: 'manipulation',
    mechanical_engineering: 'cognition',
    complex_construction: 'manipulation',
    system_optimization: 'cognition',
    aerial_navigation: 'movement',
    flight_control: 'movement',
    gliding: 'movement',
    multi_modal_locomotion: 'movement',
    form_adaptation: 'special',
    environmental_specialization: 'special',
    meta_cognition: 'cognition',
    transcendent_awareness: 'perception',
    reality_manipulation: 'special',
  };
  
  return categories[abilityId] || 'unknown';
}

export function getEvolutionStats(abilities: string[]): {
  totalAbilities: number;
  categories: Record<string, number>;
  currentStage: string;
  progress: number;
} {
  const progress = getEvolutionProgress(abilities);
  const categories: Record<string, number> = {};
  
  abilities.forEach(ability => {
    const category = getAbilityCategory(ability);
    categories[category] = (categories[category] || 0) + 1;
  });
  
  return {
    totalAbilities: abilities.length,
    categories,
    currentStage: progress.currentStage.id,
    progress: progress.progress,
  };
}
