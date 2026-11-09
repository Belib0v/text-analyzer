export function getCharacterCount(text: string): number {
  return text.length;
}

export function getWordsCount(text: string): number {
  if (!text.trim()) {
    return 0;
  }
  const seg = new Intl.Segmenter('en', { granularity: 'word' });
  return [...seg.segment(text)].filter((s) => s.isWordLike).length;
}
