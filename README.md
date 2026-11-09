# Phrase and Word Analyzer

A small Angular app for working with text:

- counts characters and words;
- finds synonyms for the selected word or phrase and replaces it with a click;
- copies the selected text, or all text if nothing is selected.

## Run

Requires Node.js 22.22+ or 24.15+.

```bash
npm i
npm start
```

Open http://localhost:4200.

No Docker setup is included on purpose: `npm` is all it needs

## Tests

```bash
npm test -- --watch=false
```

## Notes

- Datamuse works with English only, so use English text to get synonyms.
