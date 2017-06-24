export const OPEN_DIALOG = "OPEN_DIALOG";
export const CLOSE_DIALOG = "CLOSE_DIALOG";
export const SELL_DATA = "SELL_DATA";
export const SELL_DATA_SUCCESS = "SELL_DATA_SUCCESS";
export const SELL_DATA_FAILURE = "SELL_DATA_FAILURE";

export const openDialog = function() {
  return {
    type: OPEN_DIALOG,
    isOpen: true,
  }
}

export const closeDialog = function() {
  return {
    type: CLOSE_DIALOG,
    isOpen: false,
  }
}

export const sellData = function(seed, data) {
  return {
    type: SELL_DATA,
    seed: seed,
    data: data,
  }
}

export const sellDataSuccess = function(response) {
  return {
    type: SELL_DATA_SUCCESS,
    response: response
  }
}


export const sellDataFailure = function(error) {
  return {
    type: SELL_DATA_FAILURE,
    error: error,
  }
}