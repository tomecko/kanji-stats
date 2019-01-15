import { mapValues } from 'lodash';

export default class Wanikani {
  static url = 'https://api.wanikani.com/v2/';

  constructor(APIKey) {
    this.APIKey = APIKey;
  }

  getUser() {
    return this.get('user');
  }

  getSrsStages() {
    return this.get('srs_stages')
      .then(({ data }) => data);
  }

  getKanjiInfos() {
    return Promise.all([this.getKanjiStudyInfos(), this.getAllKanjiStaticInfos()])
      .then(([studyInfos, staticInfos]) => {
        const studyInfosMap = studyInfos
          .reduce((acc, info) => ({ ...acc, [info.subjectId]: info }), {});
        return mapValues(staticInfos, (info => ({ ...info, ...studyInfosMap[info.id] })));
      });
  }

  getKanjiStudyInfos() {
    return this.getPagedData('assignments?subject_types=kanji&unlocked=true')
      .then(all => all.map(({ data }) => ({
        srsStage: data.srs_stage,
        srsStageName: data.srs_stage_name,
        subjectId: data.subject_id,
      })));
  }

  getAllKanjiStaticInfos(path = 'subjects?types=kanji') {
    return this.getPagedData(path)
      .then(all => all
        .map(item => ({
          id: item.id,
          kanji: item.data.characters,
          level: item.data.level,
        }))
        .reduce((acc, subject) => ({ ...acc, [subject.kanji]: subject }), {}))
      .then(ids => ids.length === 0 ? Promise.reject(Error('no kanji subjects')) : Promise.resolve(ids));
  }

  get(path) {
    return fetch(`${Wanikani.url}${path.replace(Wanikani.url, '')}`, {
      headers: new Headers({ Authorization: `Bearer ${this.APIKey}` }),
    })
      .then(response => response.ok ? response : Promise.reject(new Error(response.statusText || 'error')))
      .then(response => response.json());
  }

  getPagedData(path, acc = []) {
    return this.get(path)
      .then(res => res.pages.next_url
        ? this.getPagedData(res.pages.next_url, acc.concat(res.data))
        : Promise.resolve(acc.concat(res.data)));
  }
}
