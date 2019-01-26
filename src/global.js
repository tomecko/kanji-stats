import Chart from 'chart.js';

Chart.defaults.global.title.fontSize = 20;
Chart.defaults.global.title.padding = 20;

export const PRIMARY = '#e26f6f';
export const PRIMARY_LIGHT = '#eda8a8';
export const SECONDARY = '#ccc';

export const INDEPENDENTLY_LEARNED = 'Learned outside WaniKani';
export const LOCKED = 'Locked';
export const NOT_ON_WANIKANI = 'Not on WaniKani';
export const WANIKANI_STAGES = {
  Apprentice: '#dd0093',
  Guru: '#882d9e',
  Master: '#294ddb',
  Enlightened: '#0093dd',
  Burned: '#434343',
  [LOCKED]: '#ddd',
  [NOT_ON_WANIKANI]: '#aaa',
  [INDEPENDENTLY_LEARNED]: '#aed581',
};

export const WANIKANI_LEVELS = 60;
