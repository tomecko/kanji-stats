import { SECONDARY, WANIKANI_STAGES_COLORS } from '../global';

const getStageCore = stage => stage
  .replace(' IV', '')
  .replace(' III', '')
  .replace(' II', '')
  .replace(' I', '')
  .trim();

export const getStageColor = stage => stage
  ? WANIKANI_STAGES_COLORS[getStageCore(stage)]
  : SECONDARY;
