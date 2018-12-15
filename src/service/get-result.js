import { intersection, uniq } from 'lodash';

import kanjiDatasets from '../data/kanji-datasets';

const getKanjiInfos = (data, inputChars, kanjiLimit, foundKanjisCount) => data
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

export default function (inputText, kanjiLimit, selectedKanjiDataset) {
  const data = kanjiDatasets[selectedKanjiDataset];
  const allKanjis = data
    .map(([kanji]) => kanji)
    .slice(1, -1);
  const inputChars = uniq(inputText.split(''));

  const foundKanjis = intersection(inputChars, allKanjis);
  const kanjiInfos = getKanjiInfos(data, inputChars, kanjiLimit, foundKanjis.length);

  return { foundKanjis, kanjiInfos };
}
