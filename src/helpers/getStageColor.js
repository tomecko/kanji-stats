import { SECONDARY, WANIKANI_STAGES } from '../global';

// eslint-disable-next-line camelcase
export const getStageColor = ({ srs_stage_name }) => srs_stage_name
  ? WANIKANI_STAGES[srs_stage_name.split(' ')[0].toUpperCase()]
  : SECONDARY;
