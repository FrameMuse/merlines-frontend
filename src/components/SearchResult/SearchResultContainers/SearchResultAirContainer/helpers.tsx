import { ReactNode } from "react"

export function getAgentLogo(code: string | number) {
  return `https://pics.avs.io/gates/200/50/${code}.png`
}
export function getAirlineLogo(code: string | number) {
  return `https://pics.avs.io/al_square/36/36/${code}.png`
}


/**
 *
 * Mapping flight determination either numeric or linguistic for given child
 */
export function flightPredicate<C extends ReactNode>(child: C, index: number, array: C[]) {
  if (!child) return null

  if (array.length >= 3) {
    return [<h3>{"Рейс"} {index + 1}</h3>, child]
  }

  return [<h3>{index === 0 ? "Туда" : "Обратно"}</h3>, child]
}
