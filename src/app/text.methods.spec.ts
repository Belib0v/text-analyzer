import { getCharacterCount, getWordsCount } from './text.methods';

describe('text methods', () => {
  it('should count characters', () => {
    expect(getCharacterCount('')).toBe(0);
    expect(getCharacterCount('abc def')).toBe(7);
  });

  it('should count words', () => {
    expect(getWordsCount('')).toBe(0);
    expect(getWordsCount('  one   two\nthree  ')).toBe(3);
    expect(getWordsCount('Hello, world!')).toBe(2);
  });
});
