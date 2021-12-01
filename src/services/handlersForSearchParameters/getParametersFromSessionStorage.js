


export const getValueFromSessionStorageByKey = (key) => {
  try {
    const result = sessionStorage.getItem(key)
    return result
  } catch(e) {
    console.error(e)
  }
}

export const setItemInStorageByKey = (key, value) => {
  sessionStorage.setItem(key, value)
}


export const isKeyInStorage = (key) => {
  return  !!sessionStorage.getItem(key)
}
