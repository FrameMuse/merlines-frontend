export interface Place {
  code: string
  type: PlaceType
  city: string
  country: string
}

export enum PlaceType { airport, trainStation, busStop }
