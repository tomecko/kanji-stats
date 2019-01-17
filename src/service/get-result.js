import {
  intersection,
  mapValues,
  sortBy,
  uniq,
} from 'lodash';

import kanjiDatasets from '../data/kanji-datasets';

const getKanjiInfos = (inputChars, kanjiLimit, foundKanji) => (data, name) => data
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
    const foundAccPercentage = foundAcc / foundKanji[name].length;
    return acc.concat({
      ...info,
      foundAcc,
      foundAccPercentage,
    });
  }, []);

export default function (inputText, kanjiLimit) {
  const inputChars = uniq(inputText.split(''));

  const foundKanji = mapValues(
    mapValues(kanjiDatasets, dataset => dataset.map(([kanji]) => kanji).slice(1, -1)),
    datasetKanji => sortBy(
      intersection(inputChars, datasetKanji),
      kanji => datasetKanji.indexOf(kanji),
    ),
  );
  const kanjiInfos = mapValues(
    kanjiDatasets,
    getKanjiInfos(inputChars, kanjiLimit, foundKanji),
  );

  return { foundKanji, kanjiInfos };
}
