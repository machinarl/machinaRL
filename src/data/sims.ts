import { Simulation } from '@/types/sim';
import { allSimulations } from './simulations-complete';

export const simulations: Simulation[] = allSimulations;

export const getSimulationById = (id: string): Simulation | undefined => {
  return simulations.find(sim => sim.id === id);
};

export const getSimulationsByDifficulty = (difficulty: string): Simulation[] => {
  return simulations.filter(sim => sim.difficulty === difficulty);
};

export const getSimulationsByStatus = (status: string): Simulation[] => {
  return simulations.filter(sim => sim.status === status);
};

export const getSimulationsByTag = (tag: string): Simulation[] => {
  return simulations.filter(sim => sim.tags.includes(tag));
};