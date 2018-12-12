import { intersection, uniq } from 'lodash';

import aozora from '../data/aozora.json';

export default function (inputText) {
  const data = aozora;
  const allKanjis = data
    .map(([kanji]) => kanji)
    .filter(value => value !== 'all');
  const inputChars = uniq(inputText.split(''));

  const foundKanjis = intersection(inputChars, allKanjis);
  const kanjiInfos = data
    .map(info => ({
      kanji: info[0],
      frequency: info[2],
      found: inputChars.indexOf(info[0]) > -1,
    }))
    .reduce((acc, info, i) => {
      const previous = acc[i - 1];
      const previousFoundAccumulative = previous ? previous.foundAccumulative : 0;
      return acc.concat({
        ...info,
        foundAccumulative: info.found
          ? previousFoundAccumulative + info.frequency
          : previousFoundAccumulative,
      });
    }, []);

  return { foundKanjis, kanjiInfos };
}
