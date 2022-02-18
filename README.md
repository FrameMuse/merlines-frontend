# Merlines descriptions

Design:
https://www.figma.com/file/wHMm0t2uCZ50CBH8fJvJq1/Merlines

## Principles

- No contractions, a name should be written fully (except: id, js, ts...)

## localStorge

In use:

- `userId` - encoded user's id
- `token` - encoded user's email
- `language` - current language
- `currency` - current currency

## Localization files

- When pluralizing words, there should be nested `plural` as array

```json
{
  "passengers": {
    "plural": []
  }
}
```
