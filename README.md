# Phrase and Word Analyzer

A small Angular app for working with text:

- counts characters and words;
- finds synonyms for the selected word or phrase and replaces it with a click;
- copies the selected text, or all text if nothing is selected.

## Run

You only need Docker

```bash
docker compose up -d
```

Open http://localhost:4200. The first start takes a minute while dependencies are installed.

Stop:

```bash
docker compose down
```

## Tests

```bash
docker exec text-analyzer npx ng test --watch=false
```

## Notes

- Datamuse works with English only, so use English text to get synonyms.
