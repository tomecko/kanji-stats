import {
  intersection,
  mapValues,
  uniq,
  values,
} from 'lodash';

import kanjiDatasets from '../data/kanji-datasets';

const allKanjis = uniq(values(kanjiDatasets)
  .map(dataset => dataset.map(([kanji]) => kanji).slice(1, -1))
  .reduce((acc, kanjis) => acc.concat(kanjis)));

const getKanjiInfos = (inputChars, kanjiLimit, foundKanjisCount) => data => data
  .filter((_, i) => i > 0)
  .filter((_, i) => i < kanjiLimit)
  .map(info => ({
    kanji: info[0],
    frequency: info[2],
    found: inputChars.indexOf(info[0]) > -1,
  }))
  .reduce((acc, info, i) => {
    const previous = acc[i - 1];
    const previousFoundAcc = previous ? previous.foundAcc : 0;
    const foundAcc = previousFoundAcc + Number(info.found);
    const foundAccPercentage = foundAcc / foundKanjisCount;
    return acc.concat({
      ...info,
      foundAcc,
      foundAccPercentage,
    });
  }, []);

export default function (inputText, kanjiLimit) {
  const inputChars = uniq(inputText.split(''));

  const foundKanjis = intersection(inputChars, allKanjis);
  const kanjiInfos = mapValues(
    kanjiDatasets,
    getKanjiInfos(inputChars, kanjiLimit, foundKanjis.length),
  );

  return { foundKanjis, kanjiInfos };
}
