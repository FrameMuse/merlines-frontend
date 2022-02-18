# Merlines descriptions

Design:
https://www.figma.com/file/wHMm0t2uCZ50CBH8fJvJq1/Merlines%2B%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5-%D1%84%D1%80%D0%B5%D0%B9%D0%BC%D1%8B

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
