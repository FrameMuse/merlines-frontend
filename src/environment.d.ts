declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_BASE_URL: string
      REACT_APP_GA_TAG: string
      REACT_APP_GA_CLIENT_ID: string
      // ...
      PWD: string
    }
  }
}

export { }
