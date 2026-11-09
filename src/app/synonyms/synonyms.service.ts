import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';

const API_URL: string = 'https://api.datamuse.com/words';

interface DatamuseWord {
  word: string;
}

@Injectable({ providedIn: 'root' })
export class SynonymsService {
  synonymsResource(phrase: () => string | undefined) {
    return httpResource<string[]>(
      () => {
        const ml = phrase();
        return ml ? { url: API_URL, params: { ml, max: 20 } } : undefined;
      },
      { parse: (raw) => (raw as DatamuseWord[]).map((w) => w.word) },
    );
  }
}
