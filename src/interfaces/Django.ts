export interface PaginationType<D> {
  readonly count: number
  readonly next: string | null
  readonly previous: string | null
  readonly results: D[]
}
