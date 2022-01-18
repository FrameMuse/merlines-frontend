import { ValuesOf } from "interfaces/common"
import { MapActions } from "interfaces/reducer"


const initialState: {
  type: "airplane" | "train" | "bus"
} = {
  type: "airplane"
}

interface Actions {
  TRANSPORT_TYPE_UPDATE: {
    type: typeof initialState["type"]
  }
}

type Action = ValuesOf<MapActions<Actions>>

export default (state = initialState, action: Action): typeof initialState => {
  switch (action.type) {

    case "TRANSPORT_TYPE_UPDATE":
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export const updateTransportType = (type: Actions["TRANSPORT_TYPE_UPDATE"]["type"]) => ({
  type: "USER_LOGIN",
  payload: { type }
})
