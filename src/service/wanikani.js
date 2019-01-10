export default class Wanikani {
  static url = 'https://api.wanikani.com/v2/';

  constructor(APIKey) {
    this.APIKey = APIKey;
  }

  getUser() {
    return this.get('user');
  }

  getKanjiInfos() {
    return this.getPagedData('assignments?subject_types=kanji&unlocked=true')
      .then(all => all.map(({ data }) => ({
        srsStage: data.srs_stage,
        srsStageName: data.srs_stage_name,
        subjectId: data.subject_id,
      })));
  }

  getKanjiChars(path = 'subjects?types=kanji') {
    return this.getPagedData(path)
      .then(all => all
        .map(item => ({
          id: item.id,
          kanji: item.data.characters,
        }))
        .reduce((acc, { id, kanji }) => ({ ...acc, [id]: kanji }), {}))
      .then(ids => ids.length === 0 ? Promise.reject(Error('no kanji ids')) : Promise.resolve(ids));
  }

  get(path) {
    return fetch(`${Wanikani.url}${path.replace(Wanikani.url, '')}`, {
      headers: new Headers({ Authorization: `Bearer ${this.APIKey}` }),
    })
      .then(response => response.ok ? response : Promise.reject())
      .then(response => response.json());
  }

  getPagedData(path, acc = []) {
    return this.get(path)
      .then(res => res.pages.next_url
        ? this.getPagedData(res.pages.next_url, acc.concat(res.data))
        : Promise.resolve(acc.concat(res.data)));
  }
}
