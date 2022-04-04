export type URLType = `${"http" | "https"}://${string}`

export type languageType = "ru" | "en" | "de"
export type currencyType = "rub" | "usd" | "eur"

export type DataURL = `data:${string};${string}`
export type DataURLBase64 = `data:${string};base64,${string}`


export type ValuesOf<T> = T[keyof T]

export type FormElements<U extends string> = HTMLFormControlsCollection & Record<U, HTMLInputElement>
